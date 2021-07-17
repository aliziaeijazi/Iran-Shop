import {NavBar} from "./Navbar/Navbar.component";
import React from 'react';
import {makeStyles, MuiThemeProvider} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import {Link} from "react-router-dom";
import {createMuiTheme} from "@material-ui/core";
import {StoreName} from "./StoreName/StoreName.component";


const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        position:"fixed",
        zIndex:1,
    },
    appbar: {
        backgroundColor: "white",
        color: "black",

    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        fontFamily: "IranSans",
    },
    flex:{
        display:"flex",
        justifyContent:"space-between",
    }
}));

function Header() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar className={classes.appbar} position="static">
                <Toolbar className={classes.flex}>
                    <StoreName/>
                    <NavBar/>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export {Header}
