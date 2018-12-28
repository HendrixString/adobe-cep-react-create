/**
 * @author Tomer Riko Shalev
 */

import React from 'react'

import Decal from './Decal.jsx'
import PluginItem from './PluginItem.jsx'
import BrowseItem from './BrowseItem.jsx'

function colorToCss(color) {
    return {
        backgroundColor: color
    }
}

/**
 * Home tab content
 *
 */
export default class Home extends React.Component {

    constructor() {
        super()

        this.export_onClick = this.export_onClick.bind(this)
        this.textureItemRef = React.createRef()
        this.masksItemRef = React.createRef()
        this.infoItemRef = React.createRef()
        this.flattenItemRef = React.createRef()
        this.browseItemRef = React.createRef()
    }

    /**
     * export button was clicked
     *
     */
    export_onClick(e) {
        var folderPath = this.browseItemRef.current.path
        var isTexturesChecked = this.textureItemRef.current.isChecked
        var isMasksChecked = this.masksItemRef.current.isChecked
        var isInfoChecked = this.infoItemRef.current.isChecked
        var isFlattenChecked = this.flattenItemRef.current.isChecked

        var { onExecutePlugin } = this.props

        onExecutePlugin({
            folderPath, isTexturesChecked, isMasksChecked, isInfoChecked, isFlattenChecked
        })
    }

    render() {
        return (
            <div className="container">
                <Decal title='Shutterfly 2018' color='rgb(101, 68, 188)' desc='Photoshop to Display list'
                       imgSrc='https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-outline.svg'/>

                <div className="my-3 p-3 bg-white rounded shadow">
                    <h6 className="border-bottom border-gray pb-2 mb-0">configurations</h6>

                    <PluginItem ref={this.textureItemRef} index='0' title='Textures'
                                desc='export textures' color='rgb(69, 122, 251)'
                                checked='true'/>
                    <PluginItem ref={this.masksItemRef} index='1' title='Masks'
                                desc='export user layer masks' color='rgb(201, 64, 136)'
                                checked='true'/>
                    <PluginItem ref={this.infoItemRef} index='2' title='Info'
                                desc='export info json' color='rgb(101, 68, 188)'
                                checked='true'/>
                    <PluginItem ref={this.flattenItemRef} index='3' title='Flatten'
                                desc='generate flat display list' color='rgb(101, 68, 188)'
                                checked='false'/>
                    <BrowseItem ref={this.browseItemRef}/>

                    <small className="d-block text-right mt-3">
                        <a onClick={this.export_onClick} href="#">Export</a>
                    </small>
                </div>

            </div>
        )

    }

}
