import React from 'react'
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Icon from '@material-ui/core/Icon'
import withStyles from '@material-ui/core/styles/withStyles';

import Hideable from './Hideable.jsx'

function colorToCss(color) {
    return {
        backgroundColor: color
    }
}

const styles = theme => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper
    }
})

/**
 * react component for creating a material-ui tab navigator.
 * configurable with data.
 */
class Navigator extends React.Component {

    constructor(props) {
        super(props)
    }

    state = {
        activeTabIndex: 0,
    }

    handleChange = (event, value) => {
        this.setState({ activeTabIndex: value })
    }

    /**
     * tabFactory - create a tab item
     *
     * @param  {type} data description
     * @return {type}      description
     */
    tabFactory(data, index) {
        var title = data.title.toUpperCase()
        var icon = data.icon

        return <Tab key={index} icon={<Icon>{icon}</Icon>} label={title}/>
    }

    /**
     * tabFactory - create a tab content container
     *{data.comp}
     * @param  {type} data description
     * @return {type}      description
     */
    tabContentFactory(data, index, active) {
        var title = data.title.toLowerCase()
        var comp = data.comp

        return (
            <Hideable key={index} visible={active}>{comp}</Hideable>
        )
    }

    render() {
        const { data , classes} = this.props
        const { activeTabIndex } = this.state;

        return (
            <div className={classes.root}>
                <Paper >
                    <Tabs fullWidth
                        value={activeTabIndex}
                        onChange={this.handleChange}
                        indicatorColor="secondary"
                        textColor="primary">

                        {data.map((item,i) => this.tabFactory(item, i))}
                    </Tabs>
                </Paper>
                {data.map((item,i) => this.tabContentFactory(item, i, activeTabIndex===i))}
            </div>
        )

    }

}

export default withStyles(styles)(Navigator);
