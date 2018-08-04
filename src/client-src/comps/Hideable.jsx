import React from 'react';

/**
 * simple wrapper component that supports visibility
 */
export default class Hideable extends React.Component {
    constructor(props) {
        super(props)
    }

    invisibleStyle = {
        display: 'none'
    }

    visibleStyle = {
        display: 'block'
    }

    visStyle(on) {
        return on ? this.visibleStyle : this.invisibleStyle
    }

    render() {
        const { visible, invisible } = this.props
        const resolved = visible ? true : false

        return (
            <div style={this.visStyle(resolved)}>
                {this.props.children}
            </div>
        )

    }

}
