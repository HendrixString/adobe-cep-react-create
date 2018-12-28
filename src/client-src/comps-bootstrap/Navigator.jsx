/**
 * @author Tomer Riko Shalev
 */

import React from 'react'

function colorToCss(color) {
    return {
        backgroundColor: color
    }
}

/**
 * react component for creating a bootstrap 4 tab navigator.
 * configurable with data.
 */
export default class Navigator extends React.Component {

    constructor() {
        super()
    }

    /**
     * tabFactory - create a tab item
     *
     * @param  {type} data description
     * @return {type}      description
     */
    tabFactory(data, index) {
        var title = data.title.toLowerCase()
        var isActive = data.isActive ? true : false
        var className = `nav-item nav-link ${isActive ? 'active' : ''}`

        return <a key={index} className={className} id={`nav-${title}-tab`}
                data-toggle="tab" href={`#nav-${title}`} role="tab"
                aria-controls={`nav-${title}`} aria-selected="true">{data.title}</a>
    }

    /**
     * tabFactory - create a tab content container
     *
     * @param  {type} data description
     * @return {type}      description
     */
    tabContentFactory(data, index) {
        var title = data.title.toLowerCase()
        var isActive = data.isActive ? true : false
        var className = `tab-pane fade ${isActive ? 'show active' : ''}`

        return (
            <div key={index} className={className} id={`nav-${title}`}
                    role="tabpanel" aria-labelledby={`nav-${title}-tab`}>
                {data.comp}
            </div>
        )
    }

    render() {
        const { data } = this.props
        console.log(data)

        return (
            <div>
                <nav>
                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                        {data.map((item,i) => this.tabFactory(item, i))}
                    </div>
                </nav>
                <div className="tab-content" id="nav-tabContent" style={colorToCss('rgb(248, 249, 249)')}>
                    {data.map((item,i) => this.tabContentFactory(item, i))}
                </div>
            </div>
        )

    }

}
