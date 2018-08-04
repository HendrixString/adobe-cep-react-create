
/**
 * a minimalist non fancy build script
 */

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')
const utils = require('./utils.js')
const webpack = require('webpack')
const pluginConfig = require('../pluginrc.js')
var env = utils.resolveEnv()
const isDev = env==='development'
const distFolder = pluginConfig.destinationFolder
const srcFolder = pluginConfig.sourceFolder
const rootFolder = pluginConfig.root
const webpack_client_config_path = path.join(__dirname, 'webpack.client.config.js')
const webpack_session_config_path = path.join(__dirname, 'webpack.session.config.js')
utils.log_progress(`BUILD for ${env}`, 'blue')

try {
    // delete the dist
    utils.log_progress('cleaning dist...')
    utils.deleteFolderRecursive(distFolder)
    // create dist
    fs.mkdirSync(distFolder)
    // bundle the client
    utils.log_progress('bundeling client...')
    // var config = require('../webpack.client.config.js')
    // webpack(config, (err, stats) => {
    //   if (err) {
    //     console.error(err);
    //     return;
    //   }
    //
    //   console.log(stats.toString({
    //     chunks: false,  // Makes the build much quieter
    //     colors: true    // Shows colors in the console
    //   }));
    // });

    execSync(`webpack --config ${webpack_client_config_path}  --display minimal --display-chunks --env.target=node --mode ${env}`, {stdio:[0,1,2]})
    // bundle the session
    utils.log_progress('bundeling session...')
    execSync(`webpack --config ${webpack_session_config_path} --display normal --display-chunks --env.target=node --mode ${env}`, {stdio:[0,1,2]})
    // copy the host code
    utils.log_progress('copying host code...')
    utils.copyRecursiveSync(fromSrc('host'), fromDist('host'))
    // copy the session's node modules folder
    utils.log_progress('copying session node-modules...')
    utils.copyRecursiveSync(fromSrc('session-src/node_modules'), fromDist('node_modules'))
    // copying libs folder
    utils.log_progress('copying libs folder...')
    utils.copyRecursiveSync(fromSrc('libs'), fromDist('libs'))
    // copy the index.html
    // fs.createReadStream('./src/index.html').pipe(fs.createWriteStream('./dist/index.html'));
    utils.log_progress('copying index.html...')
    utils.copyRecursiveSync(fromSrc('index.html'), fromDist('index.html'))
    // copy CSXS folder
    utils.log_progress('rendering manifest.xml ...')
    var manifest_template = require(path.join(fromRoot('assets'), 'CSXS', 'manifest.template.xml.js'))
    var rendered_xml = manifest_template(pluginConfig)
    var xml_out_file = path.join(fromRoot('assets'), 'CSXS', 'manifest.xml')
    fs.writeFileSync(xml_out_file, rendered_xml, 'utf-8')
    utils.log_progress('copying Adobe assets...')
    utils.copyRecursiveSync(fromRoot('assets'), distFolder)

    if(!isDev) {
        // delete the .debug file
    }

    utils.log_progress('DONE', 'blue')
} catch(err) {
    utils.log_progress(err, 'red')
}

function fromDist(val) {
    return path.join(distFolder, val)
}

function fromSrc(val) {
    return path.join(srcFolder, val)
}

function fromRoot(val) {
    return path.join(rootFolder, val)
}
