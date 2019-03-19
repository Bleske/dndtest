import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Target from './Target'
import Event from './Event';


const styles = {
    root: {
        height: '300px',
        width: '500px',
        border: '1px solid black',
        display: 'flex',
        flexDirection: 'column',
    },
    row: {
        height: '100%'
    },
}



function Grid(props) {
    const { classes, servers, handleDrop } = props;
    // console.log(servers)
    
    return (
        <div className={classes.root}>
            {servers.map((server, idx) => {
                return <Target
                        key={idx} 
                        id={server.id} 
                        className={classes.row}
                        handleDrop={handleDrop}
                        server={server}>
                        </Target>
            })}
        </div>
    )
}

export default withStyles(styles)(Grid);