/**
 * @author Tomer Riko Shalev
 */

import React from 'react'

import Home from './comps/Home.jsx'
import Debug from './comps/Debug.jsx'
import Config from './comps/Config.jsx'
import Upload from './comps/Upload.jsx'
import Navigator from './comps/Navigator.jsx'

import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import indigo from '@material-ui/core/colors/indigo';
import pink from '@material-ui/core/colors/pink';
import red from '@material-ui/core/colors/red';
import orange from '@material-ui/core/colors/amber';
import cyan from '@material-ui/core/colors/cyan';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
    palette: {
        type:'dark',
        primary: cyan,
        secondary: pink,
        error: red,
        contrastThreshold: 3,
        tonalOffset: 0.2,

    },
    status: {
        danger: 'orange',
    },
    typography: {
        // In Japanese the characters are usually larger.
        fontSize: 12,
    },

})

const styles = {
    root: {
        width: '100%',
        height: '100vh'
    }
}

/**
 * main app component
 *
 */
export default class App extends React.Component {
    _controller = undefined

    constructor(props) {
        super(props)

        // controller
        this._controller = props.controller
        // navigator data
        this.data = [
            {title: 'Home', icon: 'home', comp: <Home onExecutePlugin={this.onExecutePlugin}/>},
            {title: 'Upload', icon: 'cloud_upload', comp: <Upload/>},
            {title: 'Config', icon: 'settings', comp: <Config/>},
            {title: 'Debug', icon: 'bug_report', comp: <Debug rawLogz={this.controller.logz}/>}
        ]

    }

    onNavigateChange = (index, title) => {
        console.log(`onNavigateChange:: ${index}, ${title}`)
    }

    /**
     * get controller
     *
     * @return {Controller}
     */
    get controller() {
        return this._controller
    }

    /**
     * execute the plugin
     *
     * @param  {type} options description
     */
    onExecutePlugin = (options) => {
        console.log('App:: onExecutePlugin')
        // here disable UI
        this._controller.invokePlugin(options)
        // here enable ui
    }

    render() {

        return (
            <div style={styles.root}>
                <MuiThemeProvider theme={theme}>
                    <Navigator data={this.data} onNavigateChange={this.onNavigateChange}/>
                </MuiThemeProvider>
            </div>
        )

    }

}
