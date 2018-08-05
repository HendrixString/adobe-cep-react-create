/**
 * deploy in dev mode or production
 */
const { execSync } = require('child_process')
const fs = require('fs')
const os = require('os')
const path = require('path')
const utils = require('./utils.js')
const pluginConfig = require('../pluginrc.js')
const distFolder = pluginConfig.destinationFolder
const srcFolder = pluginConfig.sourceFolder
var env = utils.resolveEnv()
const isDev = env==='development'
const isWindows = isWindows()
const extensionBundleId = pluginConfig.extensionBundleId
const resolvedTargetFolder = resolveDeploymentFolder()

deploy()

/**
 * deploy
 *
 */
function deploy() {
    utils.log_progress(`DEPLOY for ${env}`, 'blue')

    cleanTarget(resolvedTargetFolder)

    if(isDev)
        deployDevMode()
    else
        deployProdMode()

    printDeploymentFolder()
}

function printDeploymentFolder() {
    utils.log_progress(`deployed to folder ${resolvedTargetFolder}`, 'green')
}

/**
 *  resolve the final deployment folder
 *
 */
function resolveDeploymentFolder() {
    return path.join(resolveExtensionFolder(), extensionBundleId)
}

/**
 *  per os Adobe extension folder
 *
 */
function resolveExtensionFolder() {
    if (isWindows) {
        return 'C:\\Program Files (x86)\\Common Files\\Adobe\\CEP\\extensions';
    } else {
        return path.join(os.homedir(), 'Library/Application Support/Adobe/CEP/extensions')
    }

}

/**
 * cleanTarget - clean the target folder. if it is a
 * symlink then unlink, and if it is a folder then delete.
 *
 */
function cleanTarget(target) {
    utils.log_progress('cleaning target')

    try {
        if(fs.existsSync(target) && fs.lstatSync(target).isSymbolicLink())
            fs.unlinkSync(target)
        utils.deleteFolderRecursive(target)
    } catch (err) {
        utils.log_progress(err, 'red')
    }
}

function isWindows() {
    return process.platform.startsWith('win')
}


/**
 * deployDevMode - just create a symlink
 *
 */
function deployDevMode() {
    try {
        utils.log_progress('patching')
        execSync('defaults write com.adobe.CSXS.15 PlayerDebugMode 1', {stdio:[0,1,2]})
        execSync('defaults write com.adobe.CSXS.14 PlayerDebugMode 1', {stdio:[0,1,2]})
        execSync('defaults write com.adobe.CSXS.13 PlayerDebugMode 1', {stdio:[0,1,2]})
        execSync('defaults write com.adobe.CSXS.12 PlayerDebugMode 1', {stdio:[0,1,2]})
        execSync('defaults write com.adobe.CSXS.11 PlayerDebugMode 1', {stdio:[0,1,2]})
        execSync('defaults write com.adobe.CSXS.10 PlayerDebugMode 1', {stdio:[0,1,2]})
        execSync('defaults write com.adobe.CSXS.9 PlayerDebugMode 1', {stdio:[0,1,2]})
        execSync('defaults write com.adobe.CSXS.8 PlayerDebugMode 1', {stdio:[0,1,2]})
        execSync('defaults write com.adobe.CSXS.7 PlayerDebugMode 1', {stdio:[0,1,2]})
        execSync('defaults write com.adobe.CSXS.6 PlayerDebugMode 1', {stdio:[0,1,2]})
        execSync('defaults write com.adobe.CSXS.5 PlayerDebugMode 1', {stdio:[0,1,2]})
        execSync('defaults write com.adobe.CSXS.4 PlayerDebugMode 1', {stdio:[0,1,2]})

    } catch(err) {
        utils.log_progress(err, 'red')
    }

    utils.log_progress('creating symlink into extensions folder')
    try {
        var type = isWindows ? 'junction' : 'dir'

        fs.symlinkSync(distFolder, resolvedTargetFolder, type)
    } catch(err) {
        utils.log_progress(err, 'red')
    }

    utils.log_progress('DONE')
}

/**
 * deployProdMode - copy the whole dist folder
 *
 */
function deployProdMode() {

    utils.log_progress('copying into extensions folder')
    try {
        utils.copyRecursiveSync(distFolder, resolvedTargetFolder)

    } catch(err) {
        utils.log_progress(err, 'red')
    }

    utils.log_progress('DONE', 'blue')
}
