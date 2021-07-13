import React from 'react';
import {makeStyles, MuiThemeProvider} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {Button, createMuiTheme, Typography} from "@material-ui/core";
import {useIsomorphicLayoutEffect} from "react-redux/lib/utils/useIsomorphicLayoutEffect";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import StickyHeadTable from "./components/Table/Table.component";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
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
    title:{
        display: 'flex',
        '& > *': {
            margin: theme.spacing(2),
        },
        width:"80%",
        justifyContent:"space-between",

    }
}));
const theme = createMuiTheme({
    typography: {
        fontFamily: [
            'vazir',
            'BlinkMacSystemFont',
            '"Helvetica Neue"',
            'Arial',
        ].join(','),
    },
});

function ProductListManagement() {
    const classes = useStyles();
    const [modal , setmodal] = React.useState(false)
    const handleInsert = () =>
    {
        setmodal(true)
    }

    return (
        <MuiThemeProvider theme={theme}>
            <div className={classes.root}>
                <Paper className={classes.paper} elevation={5}>
                    <div className={classes.title}>
                        <Button variant="contained" color="primary" onClick={handleInsert}>
                            افزودن کالا
                        </Button>
                        <Typography variant="h5">مدیریت کالاها</Typography>
                    </div>
                    <StickyHeadTable open={modal} falsemodal={()=>{
                        setmodal(false)
                    }} ></StickyHeadTable>
                </Paper>
            </div>
        </MuiThemeProvider>

    );

}

export {ProductListManagement}
