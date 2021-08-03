import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {Typography} from "@material-ui/core";
import OrderTable from "./components/Table/Table.component";
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
        width: "90%",
        justifyContent: "space-between",

    },
    radiogroup:{
        display:"flex",
        flexDirection:"row"
    },
    bold:{
        fontWeight:"bolder",
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
                        <Typography className={classes.bold} variant="h6">مدیریت سفارش ها</Typography>
                        <FormControl component="fieldset">
                            <RadioGroup aria-label="" name="Orders" value={kind}   className={classes.radiogroup} onChange={handleChange}>
                                <FormControlLabel value="delivered" control={<Radio/>} label="سفارش های تحویل شده"/>
                                <FormControlLabel value="notdelivered" control={<Radio/>} label="سفارش های در انتظار ارسال"/>
                            </RadioGroup>
                        </FormControl>
                    </div>
                    <OrderTable kind={kind}/>
                </Paper>
            </div>
    );

}

export {Orders}




