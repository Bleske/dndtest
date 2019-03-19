import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from './Components/Grid'
import Event from './Components/Event'
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

const styles = {
	root: {
		height: '100vh',
		width: '100vw',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-around',
	},
	container: {
		display: 'flex',
		justifyContent: 'space-between',
		width: '600px',
		position: 'relative',
	}
}
class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			servers: [{ id: 1, events: [] }, { id: 2, events: [] }, { id: 3, events: [] }],
			countId: 0
		}
	}

	handleDrop = (posX, grabServerId, dropServerId, isSuper, eventId) => {
		if (isSuper) {
			let lastServers = this.state.servers.slice();
			lastServers[dropServerId - 1].events.push({ id: this.state.countId, superObject: false, left: posX });
			this.setState( prevState => ({
				servers: lastServers,
				countId: prevState.countId + 1, 
			}))
		} else {
				// Delete item from grabServ and add to dropserver
				let lastServers = this.state.servers.slice()
				let index = lastServers[grabServerId - 1].events.findIndex( event => event.id === eventId)
				lastServers[grabServerId - 1].events.splice(index, 1)
				lastServers[dropServerId - 1].events.push({id: eventId, left: posX, superObject: isSuper})
				this.setState({
					servers: lastServers
				})
			}

		
	}

	addEvent = (serverID) => {

	}

	changeEventPos = (x, y) => {

	}

	render() {
		const { classes } = this.props;
		return (
			<div className={classes.root}>
				<div id='grid' className={classes.container}>
					<Grid servers={this.state.servers} handleDrop={this.handleDrop} />
					<Event isSuper={true} eventId={7070}/>
				</div>
			</div>
		);
	}
}

export default withStyles(styles)(DragDropContext(HTML5Backend)(App));
