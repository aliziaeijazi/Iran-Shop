import React from 'react';
import {makeStyles, MuiThemeProvider} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {Button, createMuiTheme, Typography} from "@material-ui/core";
import StickyHeadTable from "./components/Table/Table.component";

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
        width: "85%",
        justifyContent: "space-between",

    },
    bold:{
        fontWeight:"bold"
    }
}));


function StoreManagement() {
    const classes = useStyles();

    return (
            <div className={classes.root}>
                <Paper className={classes.paper} elevation={5}>
                    <div className={classes.title}>
                        <Typography className={classes.bold} variant="h5">مدیریت موجودی و قیمت ها</Typography>
                        <Button className={classes.bold} variant="contained" color="primary">
                            ذخیره
                        </Button>
                    </div>
                    <StickyHeadTable></StickyHeadTable>
                </Paper>
            </div>
    );

}

export {StoreManagement}
