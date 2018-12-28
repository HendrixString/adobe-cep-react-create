/**
 * @author Tomer Riko Shalev
 */

import React from 'react'

const INPUT_DEFAULT = "Choose folder"

const lblStyle = {
    overflow:'hidden',
    display:'inline-block',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
}
/**
 * general browse item
 *
 */
export default class BrowseItem extends React.Component {

    constructor() {
        super()

        this.onClick = this.onClick.bind(this)
        this.lblRef = React.createRef()
    }

    hello() {
        return 'hello from tomer'
    }


    /**
     * onClick - clicking the input
     *
     */
    onClick(e) {
        console.log('BrowseItem::onClick')
        var path = 'path demo'

        // test if we are inside the adobe-cep runtime
        if(window.cep) {
            var result = window.cep.fs.showOpenDialog(false, true, 'Select a Folder', null, null)

            path = result.data
        }

     	this.lblRef.current.innerHTML = path
    }

    /**
     * return path or undefined if it was not set
     *
     * @return {string|undefined} the path
     */
    get path() {
        var raw = this.lblRef.current.innerHTML
        var isValid = raw.trim() !== INPUT_DEFAULT

        return isValid ? raw : undefined
    }

    render() {
        const {} = this.props;

        return (
            <div className="input-group mt-2 pt-3 pb-3 mb-0 lh-125 border-bottom border-gray">
              <div className="custom-file" >
                <input type="button" className="custom-file-input" id="inputGroupFile01"
                       webkitdirectory="true" directory="true" mozdirectory="true"
                       msdirectory="true" odirectory="true" onClick={this.onClick}/>
                <label className="custom-file-label" style={lblStyle}
                        ref={this.lblRef}>{INPUT_DEFAULT}</label>
              </div>
            </div>
        )

    }

}
