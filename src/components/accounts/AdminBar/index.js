import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {logout} from '../../../redux/ducks/auth';
import { connect } from 'react-redux';

const useStyles = makeStyles(theme => ({
    grow: {
      flexGrow: 1,
      
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
      flex: 1
    },
    button:{
    }

  }));

/**
 * This component displays a bar at the top of the adminpage. It contains a logout button.
 */
function AdminBar ({logout}) {
    const classes = useStyles();
    return (<AppBar position="static">
    <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
        <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
        Welcome admin!
        </Typography>
        <Button position="absolute" right="100%" classNmae={classes.button} color="inherit" onClick={ logout }>Logout</Button>
    </Toolbar>
    </AppBar>);

}
export default connect(null,{logout})(AdminBar);