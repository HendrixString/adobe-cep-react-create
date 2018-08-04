/**
 * deploy in dev mode or production
 */
const { execSync } = require('child_process')
const fs = require('fs')
const os = require('os')
const path = require('path')
const pluginConfig = require('../pluginrc.js')
const distFolder = pluginConfig.destinationFolder
const srcFolder = pluginConfig.sourceFolder
const utils = require('./utils.js')
var env = utils.resolveEnv()
const isDev = env==='development'
const nameTarget = pluginConfig.packageId
const resolvedTargetFolder = path.join(os.homedir(),
                                `Library/Application Support/Adobe/CEP/extensions/${nameTarget}`)

utils.log_progress(`DEPLOY for ${env}`, 'blue')

cleanTarget(resolvedTargetFolder)
if(isDev)
    deployDevMode()
else
    deployProdMode()

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

/**
 * deployDevMode - just create a symlink
 *
 */
function deployDevMode() {
    try {
        utils.log_progress('patching')
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
        fs.symlinkSync(distFolder, resolvedTargetFolder, 'dir')
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
