import {NavBar} from "./Navbar/Navbar.component";
import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {Link} from "react-router-dom";
import {StoreName} from "./StoreName/StoreName.component";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    appbar: {
        backgroundColor: "white",
        color: "black",

    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        fontWeight:700
    },
    flex: {
        display: "flex",
        justifyContent: "space-between",
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
                    <Link to="/" variant="h5" className={classes.title}>
                        بازگشت به سایت
                    </Link>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export {Header}
