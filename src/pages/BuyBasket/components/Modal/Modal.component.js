import React, {useEffect} from 'react';
import {makeStyles, MuiThemeProvider} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import {Button, createTheme, TextField, Typography} from "@material-ui/core";
import {toast} from "react-toastify";
import {DatePicker} from "jalali-react-datepicker";
import {connect} from "react-redux";

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        height:600,
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid gray',
        boxShadow: theme.shadows[5],
    },
    modalroot: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "center",
        padding: theme.spacing(4)
    },
    formControl: {
        minWidth: 400,
    },
    fieldmargin: {
        margin: theme.spacing(3, 0, 1),
        minWidth: 400,
    },
    datePicker:{
        margin: theme.spacing(0, 0, 3),
        minWidth: 400,
    },
    submit: {
        width: 200,
        display: "flex",
        alignSelf: "center"
    },


}));
const theme = createTheme({
    direction: "rtl"
});

function FinalSeelingMoadl(props) {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    const [data, setdata] = React.useState({
            "name": "",
            "family": "",
            "address": "",
            "phoneNumber": "",
            "deliveryDate": "",
            "orderTime": "",
        }
    )
    const handleChangeData = async (key, value) => {
        await setdata({
                ...data, [key]: value
            }
        )
    }

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setdata({})
        props.falsemodal()
    };

    useEffect(async () => {
        if (props.open) {
            setOpen(true)
        }
    }, [props.open])
    const handleSubmit = async () => {
        if (!data.name)
            toast.error(<h3 style={{fontFamily: "IRANSans", fontSize: "large"}}>لطفا نام خود را وارد کنید.</h3>)
        else if (!data.family)
            toast.error(<h3 style={{fontFamily: "IRANSans", fontSize: "large"}}>لطفا نام خانوادگی خود را وارد
                کنید.</h3>)
        else if (!data.address)
            toast.error(<h3 style={{fontFamily: "IRANSans", fontSize: "large"}}>لطفا آدرس خود را وارد کنید.</h3>)
        else if (!(data.phoneNumber))
            toast.error(<h3 style={{fontFamily: "IRANSans", fontSize: "large"}}>لطفا شماره تلفن همراه خود را وارد
                کنید.</h3>)
        else if (!(data.deliveryDate))
            toast.error(<h3 style={{fontFamily: "IRANSans", fontSize: "large"}}>لطفا تاریخ تحویل را مشخص کنید.</h3>)
        else {
            await localStorage.setItem("Order", JSON.stringify(data))
            await localStorage.setItem("BasketList" , JSON.stringify(props.basketList))
            window.open("http://localhost:3005/payment", "_self")
        }
    }
    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <MuiThemeProvider theme={theme}>
                    <div style={modalStyle} className={`${classes.paper} ${classes.modalroot}`}>
                        <Typography variant="h5">نهایی کردن خرید</Typography>
                        <Button type="button" onClick={handleClose}>
                            X
                        </Button>
                        <FormControl component="fieldset">
                            <TextField required id="name" label="نام" className={classes.fieldmargin}
                                       onChange={(event) => handleChangeData("name", event.target.value)}/>
                            <TextField required id="family" label=" نام خانوادگی :" className={classes.fieldmargin}
                                       onChange={(event) => handleChangeData("family", event.target.value)}/>
                            <TextField required id="address" label="آدرس" className={classes.fieldmargin}
                                       onChange={(event) => handleChangeData("address", event.target.value)}/>
                            <TextField required id="phoneNumber" label="تلفن همراه:(جهت هماهنگی ارسال سفارش)"
                                       className={classes.fieldmargin} type={"number"}
                                       onChange={(event) => handleChangeData("phoneNumber", event.target.value)}/>
                            <FormLabel  label="تاریخ تحویل :" className={classes.fieldmargin}>تاریخ تحویل : </FormLabel>
                            <DatePicker className={classes.datePicker} onClickSubmitButton={(event) => handleChangeData("deliveryDate", event.value._d)}/>
                            <Button variant="contained" onClick={handleSubmit} color="primary"
                                    className={classes.submit}>
                                پرداخت
                            </Button>
                        </FormControl>
                    </div>
                </MuiThemeProvider>
            </Modal>
        </div>
    );
}

const mapStateToProps = (state) =>{
    return {
        basketList: state.Basket.basketList
    }
}

const FinalSeeling = connect(mapStateToProps)(FinalSeelingMoadl)
export default FinalSeeling