import EventEmitter from 'events'
import scriptLoader from './ScriptLoader'

/**
 * the main plugin session. This can enter the node modules as
 * well as the host
 *
 */
class Session {

    constructor() {
        //super()

        this.init()
    }

    /**
     * init - session
     *
     */
    init() {
        this.log('session is initing...')

        // var fs = require('fs-extra')
        //console.log(fs)

        // load jsx file dynamically
        this.log('loading the main jsx file')
        scriptLoader.loadJSX('main.jsx')
        this.test()
        this.log('session is inited')
    }

    /**
     * scriptLoader - get the script loader
     *
     */
    scriptLoader() {
        return scriptLoader
    }

    /**
     * test - let's test things
     *
     */
    test() {
        var obj = {
            name: 'tomer'
        }

        scriptLoader.evalScript('test_host', obj).then((res) => {
            this.log('result is ' + res)
        })
    }

    /**
     * invoke the plugin
     *
     * @param  {{textures:boolean, masks:boolean, info: boolean, flatten:boolean}} options for plugin
     *
     * @return {object} describes how well the execution of plugin was
     */
    invokePlugin(options) {
        this.log('nothing here yet')
    }

    /**
     * log some info with session prefix
     *
     * @param  {string} val what to log
     */
    log(val) {
        console.log(`${this.name} ${val}`)
    }

    get name() {
        return 'Session:: '
    }

}

var session = new Session()

export default session
