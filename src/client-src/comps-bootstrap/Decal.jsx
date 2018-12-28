/**
 * @author Tomer Riko Shalev
 */

import React from 'react'

function colorToCss(color) {
    return {
        backgroundColor: color
    }
}

export default class Decal extends React.Component {

    render() {
        var {title, desc, imgSrc, color} = this.props

        return (
            <div className="d-flex align-items-center p-3 my-3 text-white-50 rounded shadow"
                  style={colorToCss(color)}>
              <img className="mr-3" src={imgSrc}
                      alt="" width="48" height="48"/>
              <div className="lh-100">
                <h6 className="mb-0 text-white lh-100">{title}</h6>
                <small>{desc}</small>
              </div>
            </div>
        )

    }

}
