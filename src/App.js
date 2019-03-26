import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Grid from './Components/Grid'
import Event from './Components/Event'
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import TouchBackend from 'react-dnd-touch-backend'
import Button from '@material-ui/core/Button'
import DeleteEventBox from './Components/DeleteEventBox'


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
	},
	infoContainer: {
		display: 'flex',
	},
	paper: {
		padding: 40,
	},
	serverNameContainer: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-around',
		marginRight: 20,
	},
	header: {
		marginBottom: 10,
		textAlign: 'center',
	},
	addContainer: {
		display: 'flex',
		flexDirection: 'column',
	},
	button: {
		marginTop: '5px',
	},
	activeButton: {
		backgroundColor: 'red',
		marginTop: '5px',
	}
}
class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			servers: [{ id: 1, events: [] }, { id: 2, events: [] }, { id: 3, events: [] }],
			countId: 0,
			isDrawing: false,
			isReadyToDraw: false,
			isFinishedDrawing: false,

		}
	}

	handleDrop = (posX, grabServerId, dropServerId, isSuper, eventId) => {
		if(this.state.isReadyToDraw){
			return
		}
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

	handleDropDelete = (serverId, eventId) => {
		if(serverId !== undefined) {
			let serversCopy = this.state.servers.slice()
			let eventsCopy = serversCopy[serverId - 1].events.slice()
			let index = eventsCopy.findIndex(event => event.id === eventId)
			console.log(serversCopy)
			eventsCopy.splice(index, 1)
			let newServer = serversCopy[serverId - 1]
			newServer.events = eventsCopy
			serversCopy.splice(serverId -1, 1, newServer)
			console.log(serversCopy)
		}
	}

	toggleDrawButton = () => {
		console.log('clicked ready to draw')
		this.setState( prevState => ({ isReadyToDraw: !prevState.isReadyToDraw}))
	}

	toggleDrawing = () => {
		this.setState( prevState => ({ isDrawing: !prevState.isDrawing}))
	}

	render() {
		const { classes } = this.props;
		const { isReadyToDraw } = this.state
		console.log(isReadyToDraw)
		return (
			<div className={classes.root}>
				<Paper className={classes.paper}>
					<div className={classes.header}>
					<Typography variant={'title'}>
						Demo - Drag-and-Drop - Serverdiagram
					</Typography>
					</div>
					<div className={classes.infoContainer}>
						<div className={classes.serverNameContainer}>
							<div><h2>P</h2></div>
							<div><h2>Q</h2></div>
							<div><h2>R</h2></div>
						</div>
						<div id='grid' className={classes.container}>
							<Grid 
								servers={this.state.servers} 
								isDrawing={this.state.isDrawing} 
								isReadyToDraw={this.state.isReadyToDraw}
								toggleDrawing={this.toggleDrawing}
								handleDrop={this.handleDrop} 
								/>
							<div className={classes.addContainer}>
								<Event isSuper={true} eventId={7070}/>
								<Button className={ isReadyToDraw ? classes.activeButton : classes.button } onClick={this.toggleDrawButton}>Pil</Button>
								<DeleteEventBox handleDropDelete={this.handleDropDelete}/>
							</div>
						</div>
					</div>
				</Paper>
			</div>
		);
	}
}

export default withStyles(styles)(DragDropContext(false ? TouchBackend : HTML5Backend)(App));//TODO rendre dynamisk backend, burde være mulig å endre manuelt for bruker også, dersom ønskelig
