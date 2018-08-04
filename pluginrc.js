const path = require('path')

module.exports = {
    extensionBundleId: 'com.hendrix.ps2dl',
    extensionBundleName: 'ps2dl',
    panelName: 'hendrix demo',
    root: __dirname,
    sourceFolder: path.join(__dirname, "src"),
    destinationFolder: path.join(__dirname, "dist")
}
