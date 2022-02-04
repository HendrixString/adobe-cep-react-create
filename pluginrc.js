const path = require('path')
const root = __dirname
const srcFolder = path.join(root, "src")
const destFolder = path.join(root, "dist")
const certPath = path.join(destFolder, "cert.p12")
module.exports = {
    extensionBundleId: 'com.conductor.cioae',
    extensionBundleName: 'cioae',
    extensionBundleVersion: '1.0.1',
    cepVersion: '11.0',
    panelName: 'Conductor Submitter',
    width: '400',
    height: '600',
    root: root,
    sourceFolder: srcFolder,
    destinationFolder: destFolder,
    certificate : {
        customCert: {
            path: '',
            password: 'password'
        },
        selfSign: {
            country: 'US',
            province: 'NC',
            org: 'Conductor Technologies',
            name: 'Julian Mann',
            password: 'password',
            locality: 'locality',
            orgUnit: 'orgUnit',
            email: 'julian@conductortech.com',
            output: certPath
        }

    }

}
