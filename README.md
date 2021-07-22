# Project

A sample nodejs service subscribing to Azure Scheduled Events.

Docs Articles:

- [Azure Metadata Service: Scheduled Events for Linux VMs](https://docs.microsoft.com/en-us/azure/virtual-machines/linux/scheduled-events)
- [Azure Metadata Service: Scheduled Events for Windows VMs](https://docs.microsoft.com/en-us/azure/virtual-machines/windows/scheduled-events)

## Getting Started

Install [nodejs](https://nodejs.org/en/) and then run the below commands from the `node/` directory in this sample.

### Install

$ npm install

### Build

$ npm run build

### Run

$ npm run start

Example log output:

```json
[INF] (UTC 2021-07-22 04:34:12) Service started.
[INF] (UTC 2021-07-22 04:35:12) Found new document:
{
    "DocumentIncarnation": 1,
    "Events": []
}
[INF] (UTC 2021-07-22 04:36:08) Found new document:
{
    "DocumentIncarnation": 2,
    "Events": [
        {
            "EventId": "4CAEA225-A741-474D-A72E-428C86FCD853",
            "EventStatus": "Scheduled",
            "EventType": "Reboot",
            "ResourceType": "VirtualMachine",
            "Resources": [
                "flatcar-vm1"
            ],
            "NotBefore": "Thu, 22 Jul 2021 04:50:17 GMT",
            "Description": "",
            "EventSource": "User",
            "DurationInSeconds": -1
        }
    ]
}
[INF] (UTC 2021-07-22 04:36:08) Accepting event 4CAEA225-A741-474D-A72E-428C86FCD853.
[INF] (UTC 2021-07-22 04:36:08) Handled event 4CAEA225-A741-474D-A72E-428C86FCD853.
[INF] (UTC 2021-07-22 04:36:08) Acknowledged event 4CAEA225-A741-474D-A72E-428C86FCD853:
[INF] (UTC 2021-07-22 04:37:09) Found new document:
{
    "DocumentIncarnation": 4,
    "Events": []
}
[INF] (UTC 2021-07-22 04:37:09) Clearing handled events cache:
[
    "4CAEA225-A741-474D-A72E-428C86FCD853"
]
```

## Contributing

This project welcomes contributions and suggestions. Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.opensource.microsoft.com.

When you submit a pull request, a CLA bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., status check, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

## Trademarks

This project may contain trademarks or logos for projects, products, or services. Authorized use of Microsoft
trademarks or logos is subject to and must follow
[Microsoft's Trademark & Brand Guidelines](https://www.microsoft.com/en-us/legal/intellectualproperty/trademarks/usage/general).
Use of Microsoft trademarks or logos in modified versions of this project must not cause confusion or imply Microsoft sponsorship.
Any use of third-party trademarks or logos are subject to those third-party's policies.
