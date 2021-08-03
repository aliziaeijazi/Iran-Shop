import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Logo from "../../../../../asset/images/logo.png"
import {useHistory} from "react-router-dom";


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',

    },
    logo: {
        [theme.breakpoints.up('md')]: {
            display: "block",
            width: 230,
            cursor: "pointer"
        },
        display: "none",
    },
    // title: {
    //     display:"flex",
    //     fontFamily: "IranSans",
    //     fontSize:20,
    //     alignItems:"center"
    // }

}));

function StoreName() {
    const classes = useStyles();
    const history = useHistory()
    const handleClick = () => {
        history.push('/')
    }
    return (
        <div className={classes.root}>
            <Avatar onClick={handleClick} variant="rounded" className={classes.logo} src={Logo}>
            </Avatar>
        </div>
    );
}

export {StoreName}
