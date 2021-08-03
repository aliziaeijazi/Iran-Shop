import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {Typography} from "@material-ui/core";
import BasketTable from "./components/Table/Table.component";
import {connect} from "react-redux";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(2),
        },
        flex: 1,
    },
    paper: {
        padding: theme.spacing(2),
        display: "flex",
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "column"
    },
    title: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(2),
        },
        width: "90%",
        justifyContent: "space-between",
    },
    bold: {
        fontWeight: "bolder"
    },
    empty: {
        color: "red",
        fontWeight: "bolder"
    }
}));

function BasketList(props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Paper className={classes.paper} elevation={5}>
                <div className={classes.title}>
                    <Typography className={classes.bold} variant="h6"> سبد خرید</Typography>
                </div>
                {!!props.basketList.length && <BasketTable/>}
                {!props.basketList.length &&
                <Typography className={classes.empty} variant="h6"> سبد خرید شما خالی است.لطفا ابتدا کالاهای مورد نظر
                    خود را انتخاب کنید.</Typography>}
            </Paper>
        </div>

    );
}

function mapStateToProps(state) {
    return {
        basketList: state.Basket.basketList
    }
}

const Basket = connect(mapStateToProps)(BasketList)
export {Basket}
