import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { DropTarget } from 'react-dnd';
import { ItemTypes } from '../ItemTypes';
import Event from './Event';

const styles = {
	row: {
		height: '100%',
		display: 'flex',
		alignItems: 'center',
	},
}


const squareTarget = {
	drop(props, monitor) {
		let offset = monitor.getSourceClientOffset().x
		let grid = document.getElementById('grid')
		let gridOffset = grid.offsetLeft
		let newPosX = offset - gridOffset //Adds the width of the event divided by 2
		let item = monitor.getItem()

		props.handleDrop(newPosX, item.serverId, props.id, item.isSuper, item.eventId )
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
			<div className={classes.row}>
				{server.events.map((event, idx) =>
					<Event className={classes.event} key={idx} serverId={server.id} event={event} eventId={event.id} isSuper={event.superObject} />
				)}
			</div>
		)

	}
}

export default withStyles(styles)(DropTarget(ItemTypes.EVENT, squareTarget, collect)(Target));