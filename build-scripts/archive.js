/**
 * archive, generates self signed certificate and signing a zxp package
 */
const fs = require('fs')
const path = require('path')
const zxpSignCmd = require('zxp-sign-cmd')
const utils = require('./utils.js')
const pluginConfig = require('../pluginrc.js')
const distFolder = pluginConfig.destinationFolder
const pluginFolder = path.join(distFolder, pluginConfig.extensionBundleId)
const extensionBundleId = pluginConfig.extensionBundleId
const certificate_options = pluginConfig.certificate
const zxpFile = path.join(distFolder, pluginConfig.extensionBundleId + '.zxp')

archive()

function archive() {
    utils.log_progress('ARCHIVE', 'blue')

    generateSelfSignCert()
    .then(res => {
        utils.log_progress('generated a self signed certificate')
        return signPackage
    })
    .then(signPackage)
    .then(res => {
        utils.log_progress(`package is signed: ${zxpFile}`)
        utils.log_progress('DONE', 'blue')
    })
    .catch(err => {utils.log_error(err)})
}

/**
 * generate self sign the certificate
 *
 * @return {Promise}  a promise
 */
function generateSelfSignCert() {
    const options = certificate_options

    return new Promise((resolve, reject) => {
        zxpSignCmd.selfSignedCert(options, function (error, result) {
            if(error) reject(error)
            else resolve(result)

        })

    })

}

/**
 * sign the package
 *
 * @return {Promise}  a promise
 */
function signPackage() {
    const options = {
        input: pluginFolder,
        output: zxpFile,
        cert: certificate_options.output,
        password: certificate_options.password
    }

    return new Promise((resolve, reject) => {
        zxpSignCmd.sign(options, function (error, result) {
            if(error) reject(error)
            else resolve(result)

        })

    })

}
