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
    radiogroup:{
        display:"flex",
        flexDirection:"row"
    }
}));
function Orders() {
    const classes = useStyles();
    const [kind, setkind] = React.useState('notdelivered');
    const handleChange = (event) => {
        setkind(event.target.value);
    };
    return (
            <div className={classes.root}>
                <Paper className={classes.paper} elevation={5}>
                    <div className={classes.title}>
                        <Typography variant="h5">مدیریت سفارش ها</Typography>
                        <FormControl component="fieldset">
                            <RadioGroup aria-label="" name="Orders" value={kind}   className={classes.radiogroup} onChange={handleChange}>
                                <FormControlLabel value="delivered" control={<Radio/>} label="سفارش های تحویل شده"/>
                                <FormControlLabel value="notdelivered" control={<Radio/>} label="سفارش های در انتظار ارسال"/>
                            </RadioGroup>
                        </FormControl>
                    </div>
                    <StickyHeadTable kind={kind}/>
                </Paper>
            </div>
    );

}

export {Orders}




