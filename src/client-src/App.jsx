import React from 'react'

import Home from './comps/Home.jsx'
import Debug from './comps/Debug.jsx'
import Config from './comps/Config.jsx'
import Upload from './comps/Upload.jsx'
import Navigator from './comps/Navigator.jsx'

// import session from './core/Session.js'

/**
 * main app component
 *
 */
export default class App extends React.Component {

    constructor() {
        super()

        // navigator data
        this.data = [
            {title: 'Home', icon: 'home', comp: <Home onExecutePlugin={this.onExecutePlugin}/>},
            {title: 'Upload', icon: 'cloud_upload', comp: <Upload/>},
            {title: 'Config', icon: 'settings', comp: <Config/>},
            {title: 'Debug', icon: 'bug_report', comp: <Debug/>}
        ]

    }

    /**
     * execute the plugin
     *
     * @param  {type} options description
     */
    onExecutePlugin = (options) => {
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
