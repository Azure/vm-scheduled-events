import { fetch } from './deps'
import { Logger } from './logger'

interface Event {
    EventId: string
    EventStatus: string
    EventType: string
    ResourceType: string
    Resources: string[]
    NotBefore?: string
}

interface Document {
    DocumentIncarnation: number,
    Events: Event[]
}

function sleep(ms: number): Promise<void> {
    return new Promise(res => setTimeout(res, ms))
}

async function acknowledgeEvent(event: Event): Promise<void> {
    try {
        let response = await fetch(
            `http://169.254.169.254/metadata/scheduledevents?api-version=2020-07-01`,
            {
                method: "post",
                headers: {
                    Metadata: true,
                    "Content-Type": "application/json",
                    "If-None-Match": eTag
                },
                body: JSON.stringify({
                    StartRequests: [{
                        "EventId": event.EventId
                    }]
                })
            },
        )
        switch (response.status) {
            case 200: {
                log.info(`Acknowledged event ${event.EventId}:`,)
                break
            }
            default: {
                log.warning(`Call to acknowledge event ${event.EventId} returned an unexpected response:`, {status: response.status})
            } 
        }
    } catch(error) {
        log.error(`Unable to acknowledge event ${event.EventId}:`, {message: error.message})
    }
}

function handleEvent(event: Event): boolean {
    try {
        // do anything needed to handle event here



        log.info(`Handled event ${event.EventId}.`)
        return true
    } catch(error) {
        log.error(`Unable to handle event ${event.EventId}:`, {message: error.message})
        return false
    }
}

async function service() {
    try {
        let response = await fetch(
            `http://169.254.169.254/metadata/scheduledevents?api-version=2020-07-01`,
            {
                method: "get",
                headers: {
                    Metadata: true,
                    "Content-Type": "application/json",
                    "If-None-Match": eTag
                }
            },
        )
        switch(response.status) {
            case 200: {
                let document: Document = await response.json()
                log.info(`Found new document:`, document)
                
                // clear our handled events cache whenever possible
                if (document.Events.length == 0 && handledEvents.length > 0) {
                    log.info(`Clearing handled events cache:`, handledEvents)
                    handledEvents = []
                }
                
                // loop through events
                for (let event of document.Events) {
                    // only do work on new events
                    if (!handledEvents.includes(event.EventId)) { 
                        log.info(`Accepting event ${event.EventId}.`)
                        // try and handle the event
                        if(handleEvent(event)) {              // if successfully handled then
                            handledEvents.push(event.EventId) //  add to completed events and
                            acknowledgeEvent(event)           //  acknowledge the event (best effort)
                        }
                    }
                }
                
                // update our stored hash
                eTag = response.headers.get("etag")
                break
            }
            case 304: {
                // not modified
                break
            }
            default: {
                console.log(response)
                log.warning(`Call to Scheduled Events API returned unexpected response:`, {status: response.status})
            } 
        }
    } catch (error) {
        log.error(`The service encountered and error:`, {message: error.message})
    } 
    await sleep(1000)
}

async function main() {
    log.info(`Service started.`)
    while (true) {
        await service()
    }
}

const log = new Logger('AzureScheduledEvents.log')
let eTag: number = 0
let handledEvents: string[] = []
main()
