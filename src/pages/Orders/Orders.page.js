import React, {useEffect} from 'react';
import {makeStyles, MuiThemeProvider} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {createMuiTheme, Typography} from "@material-ui/core";
import StickyHeadTable from "./components/Table/Table.component";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

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
    title: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(2),
        },
        width: "80%",
        justifyContent: "space-between",

    },
    radiogroup:{
        display:"flex",
        flexDirection:"row"
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

function Orders() {
    const classes = useStyles();
    const [kind, setkind] = React.useState('notdelivered');
    const handleChange = (event) => {
        setkind(event.target.value);
    };
    return (
        <MuiThemeProvider theme={theme}>
            <div className={classes.root}>
                <Paper className={classes.paper} elevation={5}>
                    <div className={classes.title}>

                        <FormControl component="fieldset">
                            <RadioGroup aria-label="" name="Orders" value={kind}   className={classes.radiogroup} onChange={handleChange}>
                                <FormControlLabel value="notdelivered" control={<Radio/>} label="سفارش های در انتظار ارسال"/>
                                <FormControlLabel value="delivered" control={<Radio/>} label="سفارش های تحویل شده"/>
                            </RadioGroup>
                        </FormControl>
                        <Typography variant="h5">مدیریت سفارش ها</Typography>
                    </div>
                    <StickyHeadTable kind={kind}/>
                </Paper>
            </div>
        </MuiThemeProvider>

    );

}

export {Orders}




