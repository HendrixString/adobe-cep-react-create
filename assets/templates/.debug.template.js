module.exports = (props) =>
`<?xml version="1.0" encoding="UTF-8"?>
<ExtensionList>
  <Extension Id="${props.extensionBundleId}">
  <HostList>
    <Host Name="AEFT" Port="3007" />
    <Host Name="AEFX" Port="3008" />
  </HostList>
  </Extension>
</ExtensionList>`
