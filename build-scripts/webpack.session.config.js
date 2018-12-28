const path = require('path');
// const CopyWebpackPlugin = require('copy-webpack-plugin')
const nodeExternals = require('webpack-node-externals');
const pluginConfig = require('../pluginrc.js')
const distFolder = path.join(pluginConfig.destinationFolder, pluginConfig.extensionBundleId)
const srcFolder = pluginConfig.sourceFolder
const SESSION_DIST_PATH = path.join(distFolder, 'session-dist')
const SESSION_SRC_PATH = path.join(srcFolder, 'session-src')
const ENTRY_POINT_SESSION_PATH = path.join(SESSION_SRC_PATH, 'index.js')

module.exports = (env) => ({
    entry: ENTRY_POINT_SESSION_PATH,
    target: 'node',
    externals: [nodeExternals({modulesDir: path.join(SESSION_SRC_PATH, 'node_modules')})],
    module: {
        rules: [
        {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: "babel-loader",
            options: {
                presets: ['env', 'react', 'stage-2']
            }

        }]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    output: {
        path: SESSION_DIST_PATH,
        publicPath: '',
        filename: 'bundle.js'
    },
    devtool: 'source-map',
    plugins: [
        // new CopyWebpackPlugin([
        //   { from: path.join(SESSION_SRC_PATH, 'node_modules'), to: '../node_modules' }
        // ])
    ]

})
