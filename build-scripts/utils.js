/**
 *
 * the build script for the whole thing
 */

const { execSync } = require('child_process')
var fs = require('fs')
var path = require('path')
const chalk = require('chalk');

function deleteFolderRecursive(src) {
  if (fs.existsSync(src)) {
    fs.readdirSync(src).forEach(function(file, index){
      var curPath = path.join(src, file)
      if (fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath)
      } else { // delete file
        fs.unlinkSync(curPath)
      }
    })
    fs.rmdirSync(src)
  }
}

/**
 * Look ma, it's cp -R.
 * @param {string} src The path to the thing to copy.
 * @param {string} dest The path to the new copy.
 */
function copyRecursiveSync(src, dest) {
    var exists = fs.existsSync(src)
    var exists_dest = fs.existsSync(dest)
    var stats = exists && fs.statSync(src)
    var isDirectory = exists && stats.isDirectory()
    if (exists && isDirectory) {
        if(!exists_dest)
            fs.mkdirSync(dest)
        fs.readdirSync(src).forEach(function(childItemName) {
        copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName))})
    } else {
        fs.linkSync(src, dest)
    }
}

function log(val) {
    console.log(val)
}

function log_progress(val, color) {
    var c = color ? color : 'yellow'

    console.log(chalk[c](val))
}

/**
 * resolve env from process argumants
 *
 */
function resolveEnv() {
    var env = 'development'

    var args = process.argv

    // we have an argument
    if(args.length >= 3) {
        env = args[2]
    }

    return env
}

module.exports = {
    deleteFolderRecursive,
    copyRecursiveSync,
    log,
    log_progress,
    resolveEnv
}
