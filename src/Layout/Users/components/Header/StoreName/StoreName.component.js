import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Logo from "../../../../../asset/images/logo.svg"
import {Typography} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },

    },
    square: {
        width:"80px",

    },
    title: {
        display:"flex",
        fontFamily: "vazir",
        alignItems:"center",
        fontSize:30,
    }

}));

function StoreName() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Typography className={classes.title}> فروشگاه ایران زمین</Typography>
            <Avatar variant="rounded" className={classes.square} src={Logo}>
            </Avatar>
        </div>
    );
}

export {StoreName}
