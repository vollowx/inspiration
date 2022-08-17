let myComputer = [
  {
    name: 'Microsoft Windows 11',
    on: 'hardware',
    inside: [
      {
        name: 'Microsoft Windows 11',
        on: 'Windows Sandbox'
      },
      {
        name: 'Ubuntu 22.04',
        on: 'Windows Subsystem for Linux'
      }
    ]
  },
  {
    name: 'Fedora Workstation 36',
    on: 'hardware',
    inside: [
      {
        name: 'Microsoft Windows 10',
        on: 'Boxes',
        inside: [
          {
            name: 'Microsoft Windows 10',
            on: 'Windows Sandbox'
          },
          {
            name: 'Ubuntu 22.04.1',
            on: 'Windows Subsystem for Linux'
          }
        ]
      },
      {
        name: 'Fedora Server 36',
        on: 'Boxes'
      }
    ]
  }
]

export default myComputer;

