const path = require('path')
const root = __dirname
const srcFolder = path.join(root, "src")
const destFolder = path.join(root, "dist")
const certPath = path.join(destFolder, "cert.p12")
module.exports = {
    extensionBundleId: 'com.hendrix.ps2dl',
    extensionBundleName: 'ps2dl',
    panelName: 'hendrix demo',
    width: '400',
    height: '600',
    root: root,
    sourceFolder: srcFolder,
    destinationFolder: destFolder,
    certificate : {
        country: 'US',
        province: 'CA',
        org: 'org',
        name: 'name',
        password: 'password',
        locality: 'locality',
        orgUnit: 'orgUnit',
        email: 'your@email.com',
        output: certPath
    }
}
