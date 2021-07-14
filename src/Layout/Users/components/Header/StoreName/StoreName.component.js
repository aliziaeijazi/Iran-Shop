import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import {deepOrange} from '@material-ui/core/colors';
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
        width:120,
        height:50

    },
    title: {
        display:"flex",
        fontFamily: "IranSans",
        fontSize:20,
        alignItems:"center"
    }

}));

function StoreName() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Avatar variant="rounded" className={classes.square} src={Logo}>
            </Avatar>
            <Typography className={classes.title}>فروشگاه ایران زمین</Typography>
        </div>
    );
}

export {StoreName}
