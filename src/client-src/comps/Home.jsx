import React from 'react'
import Paper from "@material-ui/core/Paper"
import List from "@material-ui/core/List"
import Button from "@material-ui/core/Button"
import withStyles from '@material-ui/core/styles/withStyles'

import PluginItem from './PluginItem.jsx'
import BrowseItem from './BrowseItem.jsx'

const styles = theme => ({
    root: {
        paddingTop:theme.spacing.unit * 1
    },
    paper: {
        display:'flex',
        flexDirection: 'column'
    },
    export: {
        margin: theme.spacing.unit * 3,
        alignSelf: 'flex-end'
    }
})

/**
 * Home tab content
 *
 */
class Home extends React.Component {

    constructor() {
        super()

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
    export_onClick = (e) => {
        var folderPath = this.browseItemRef.current.path
        var isTexturesChecked = this.textureItemRef.current.isChecked
        var isMasksChecked = this.masksItemRef.current.isChecked
        var isInfoChecked = this.infoItemRef.current.isChecked
        var isFlattenChecked = this.flattenItemRef.current.isChecked

        var { onExecutePlugin } = this.props

        onExecutePlugin({
            folderPath,
            isTexturesChecked,
            isMasksChecked,
            isInfoChecked,
            isFlattenChecked
        })
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Paper elevation={5} className={classes.paper}>
                    <List>
                        <PluginItem ref={this.textureItemRef} index='0' title='Textures'
                                    desc='export textures' icon='texture'/>
                        <PluginItem ref={this.masksItemRef} index='1' title='Masks'
                                    desc='export masks' icon='layers'/>
                        <PluginItem ref={this.infoItemRef} index='2' title='Info'
                                    desc='export info json' icon='info'/>
                        <PluginItem ref={this.flattenItemRef} index='3' title='Flatten'
                                    desc='flatten display list' icon='list'/>
                        <BrowseItem innerRef={this.browseItemRef}/>
                    </List>
                    <Button onClick={this.export_onClick}
                            className={classes.export} size="small">
                        Export
                    </Button>
                </Paper>

            </div>
        )

    }

}

export default withStyles(styles)(Home);
