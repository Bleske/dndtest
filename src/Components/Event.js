import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { DragSource } from 'react-dnd';
import { ItemTypes } from '../ItemTypes';


let styles = {
    root: {
        height: '30px',
        width: '50px',
        border: '1px solid black',
        backgroundColor: 'black',
        borderRadius: 5,
        zIndex: 10,
    },
}


const eventBoxSource = {
    beginDrag(props, monitor) {
        const { isSuper, serverId, eventId} = props

        return { isSuper, serverId, eventId}

    },
    endDrag(props, monitor) {
    }
};

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
        offset: monitor.getClientOffset(),
    }
}

class Event extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            superObject: true,
            top: 0,
            left: 500,
        }
    }

    render() {
        const { classes, connectDragSource, event } = this.props;
        const left = event ? event.left : 'auto'
        const display = event ? 'absolute' : 'relative'
        
        return connectDragSource(
                <div className={classes.root} style={{left: left, position: display}} >
    
                </div>
        )
    }
}

export default withStyles(styles)(DragSource(ItemTypes.EVENT, eventBoxSource, collect)(Event))

// export default withStyles(styles)(DragSource(ItemTypes.EVENT, eventBoxSource, collect)(Event));