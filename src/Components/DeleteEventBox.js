import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { DropTarget } from 'react-dnd';
import { ItemTypes } from '../ItemTypes';
import Event from './Event';

const styles = {
    root: {
        height: 50,
        width: 100,
        border: '1px dashed black'
    }
}


const squareTarget = {
	drop(props, monitor) {
        let item = monitor.getItem()
		props.handleDropDelete(item.serverId, item.eventId)
	}
};

function collect(connect, monitor) {
	return {
		connectDropTarget: connect.dropTarget(),
		fromLeftSide: monitor.getClientOffset()
	};
}


class Target extends React.Component {
	render() {
		const { connectDropTarget, classes, server } = this.props
		return connectDropTarget(
            <div className={classes.root}>

            </div>
		)

	}
}

export default withStyles(styles)(DropTarget(ItemTypes.EVENT, squareTarget, collect)(Target));