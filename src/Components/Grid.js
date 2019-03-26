import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Target from './Target'
import Event from './Event';
import Arrow from './Arrow'

const styles = {
    root: {
        height: '300px',
        width: '500px',
        border: '2px solid black',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 5,
    },
    row: {
        height: '100%'
    },
}



class Grid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            arrows: [
                //{arrowId: start: {}, end: { x: 0,} }
            ],
            countArrowId: 0,
        }
    }

    calculateDiagLength = (x1, x2, y1, y2) => {
        let x = x2-x1
        let y = y2-y1

        let diagLength = Math.sqrt((x*x)+(y*y))

        return diagLength
    }

    calculateAngle = (x1, x2, y1, y2) => {
        let a = x2 - x1; let b = y1 - y2;
        let angle = 0
        if(a >= 0 && b >= 0) { //Kvadrant 1
            angle = Math.atan(b/a) * 180 / Math.PI; //OK
        } else if(a >= 0 && b <= 0) {//Kvadrant 2
            angle = Math.abs(Math.atan(a/b) * 180 / Math.PI) + 270;
        } else if(a <= 0 && b <= 0) {//Kvadrant 3
            angle = Math.atan(b/a) * 180 / Math.PI + 180; //OK
        } else if(a <= 0 && b >= 0) {//Kvadrant 4
            angle = Math.abs(Math.atan(a/b) * 180 / Math.PI) + 90;            
        }
        return angle
    }
    
    startDrawing = e => {
        if (this.props.isReadyToDraw) {
            let x = e.clientX; let y = e.clientY
            let grid = document.getElementById('grid')
            let left = grid.offsetLeft; let top = grid.offsetTop
            let offsetLeft = x - left; let offsettop = y - top

            this.setState( prevState => ({ arrows: [...prevState.arrows, {arrowId: this.state.countArrowId, start: { x, y }, offset: {top: offsettop, left: offsetLeft}},] }))
            this.setState(prevState => ({countArrowId: prevState.countArrowId+1}))
            this.props.toggleDrawing()
        }
    }
    handleDraw = e => {
        const { arrows, countArrowId } = this.state
        if (this.props.isDrawing) {
            let diagLength = this.calculateDiagLength(arrows[countArrowId-1].start.x, e.clientX, arrows[countArrowId-1].start.y, e.clientY)
            let arrowsCopy = arrows.slice()
            let newArrow = arrowsCopy.splice(arrowsCopy.length - 1, 1)
            newArrow[0].diagLength = diagLength
            let angle = this.calculateAngle(arrows[countArrowId-1].start.x, e.clientX, arrows[countArrowId-1].start.y, e.clientY)
            newArrow[0].angle = angle
            this.setState({arrows: [ ...arrowsCopy, newArrow[0]]  })
        }
    }
    endDrawing = e => {
        if (this.props.isReadyToDraw) {
            this.props.toggleDrawing()
        }
    }

    render() {
    const { classes, servers, handleDrop } = this.props;
    return (
        <div 
            className={classes.root}
            onMouseMove={this.handleDraw} onMouseDown={this.startDrawing} onMouseUp={this.endDrawing} 
            onTouchMove={this.handleDraw} onTouchStart={this.startDrawing} onTouchEnd={this.endDrawing}>
            {servers.map((server, idx) => {
                return <Target
                        key={idx} 
                        id={server.id} 
                        className={classes.row}
                        handleDrop={handleDrop}
                        server={server}>
                        </Target>
            })}
            {this.state.arrows.map( arrow => (
                <Arrow arrow={arrow} />
            ))}
        </div>
        )
    }
}

export default withStyles(styles)(Grid);