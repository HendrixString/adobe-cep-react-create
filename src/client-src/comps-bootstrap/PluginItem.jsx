/**
 * @author Tomer Riko Shalev
 */

import React from 'react'

var roundedStyle = {
  width: '32px',
  height: '32px',
  backgroundColor: 'rgb(69 122 251)'
}

function getStyle(color) {
    return {
      width: '32px',
      height: '32px',
      backgroundColor: color
    }
}

/**
 * general plugin item that lives inside thw Home content
 *
 */
export default class PluginItem extends React.Component {

    constructor() {
        super()

        this.cbRef = React.createRef()
    }

    /**
     * get isChecked
     *
     * @return {type}  description
     */
    get isChecked() {
        return this.cbRef.current.checked
    }

    set check(val) {
        this.cbRef.current.checked = val
    }

    render() {
        const { index, title, desc, color, checked } = this.props;
        var attr = {}
        var defaultChecked = checked==='true' ? true : false
        var checkId = `check${index}`
        var style = getStyle(color ? color : 'rgb(69, 122, 251)')

        return (
            <div className="media text-muted pt-3">
              <div className="mr-2 rounded" style={style}></div>
              <div className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                <div className="d-flex justify-content-between align-items-center">
                  <strong className="text-gray-dark">{title}</strong>

                  <div className="  custom-control custom-checkbox ">
                    <input type="checkbox" ref={this.cbRef} className="custom-control-input "
                            defaultChecked={defaultChecked} id={checkId}/>
                    <label className="custom-control-label" htmlFor={checkId} />
                  </div>

                </div>
                <span className="d-block">{desc}</span>
              </div>
            </div>
        )

    }

}
