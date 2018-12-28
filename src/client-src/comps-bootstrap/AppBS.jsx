/**
 * @author Tomer Riko Shalev
 */

import React from 'react'

import Home from './comps-bootstrap/Home.jsx'
import Debug from './comps-bootstrap/Debug.jsx'
import Config from './comps-bootstrap/Config.jsx'
import Upload from './comps-bootstrap/Upload.jsx'
import Navigator from './comps-bootstrap/Navigator.jsx'

import session from './core/Session.js'

/**
 * main app component
 *
 */
export default class App extends React.Component {

    constructor() {
        super()

        this.onExecutePlugin = this.onExecutePlugin.bind(this)

        // navigator data
        this.data = [
            {title: 'Home', isActive: true, comp: <Home onExecutePlugin={this.onExecutePlugin}/>},
            {title: 'Upload', comp: <Upload/>},
            {title: 'Config', comp: <Config/>},
            {title: 'Debug', comp: <Debug/>}
        ]

    }

    /**
     * execute the plugin
     *
     * @param  {type} options description
     */
    onExecutePlugin(options) {
        console.log('App:: onExecutePlugin')
        console.log(options)
        // here disable UI
        session.invokePlugin(options)
        // here enable ui
    }

    render() {

        return (
            <div>
                <Navigator data={this.data} />
            </div>
        )

    }

}
