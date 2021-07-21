import React, {useEffect} from 'react';
import {makeStyles, MuiThemeProvider} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import {Button, createMuiTheme, Input, TextField, Typography} from "@material-ui/core";
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import {CreateData, EditData, FeachGroups, FeachProduct} from "../../../../api/store.api";
import {toast} from "react-toastify";
import {useHistory} from "react-router-dom"



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
        position: 'absolute',
        width: 500,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid gray',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    modalroot: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignContent: "space-around",
        padding: theme.spacing(4)
    },
    formControl: {
        minWidth: 500,
    },
    selectEmpty: {
        margin: theme.spacing(2),
    },
    describtionTextArea: {
        margin: theme.spacing(0, 0, 3),
        minHeight: "150px"
    },
    fieldmargin: {
        margin: theme.spacing(3, 0, 1),
        minWidth: 500,

    },
    submit: {
        width: 200,
        display:"flex",
        alignSelf:"center"
    },


}));
const theme = createMuiTheme({
    direction: "rtl"
});

export default function FinalSeeling(props) {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    const [data, setdata] = React.useState({
            "name": "",
            "family": "",
            "address": "",
            "phoneNumber": "",
            "deliveryDate": "",
        }
    )
    const history = useHistory()
    const [state, setState] = React.useState();
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
    const handleSubmit = async() => {
        if( !data.name )
            toast.error(<h3 style={{fontFamily: "IRANSans", fontSize: "large"}}>لطفا نام خود را وارد کنید.</h3>)
        else if( !data.family  )
            toast.error(<h3 style={{fontFamily: "IRANSans", fontSize: "large"}}>لطفا نام خانوادگی خود را وارد  کنید.</h3>)
        else if(!data.address )
            toast.error(<h3 style={{fontFamily: "IRANSans", fontSize: "large"}}>لطفا آدرس خود را وارد کنید.</h3>)
        else if( !(data.phoneNumber))
            toast.error(<h3 style={{fontFamily: "IRANSans", fontSize: "large"}}>لطفا شماره تلفن همراه خود را وارد کنید.</h3>)
        else if( !(data.deliveryDate))
            toast.error(<h3 style={{fontFamily: "IRANSans", fontSize: "large"}}>لطفا تاریخ تحویل را مشخص کنید.</h3>)
        else{
            localStorage.setItem("Order" , data)
            // const childUrl = window.open("../../public/Payment.html", '_blank')
            // console.log(childUrl)
            // const htmlContent  = childUrl.document.open('text/html', 'replace')
            // console.log(htmlContent)
            // childUrl.document.write(htmlContent)
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
                            <TextField required id="phoneNumber" label="تلفن همراه:(جهت هماهنگی ارسال سفارش)" className={classes.fieldmargin} type={"number"}
                                       onChange={(event) => handleChangeData("phoneNumber", event.target.value)}/>
                            <TextField required id="deliveryDate" label="تاریخ تحویل :" className={classes.fieldmargin}
                                       onChange={(event) => handleChangeData("deliveryDate", event.target.value)}/>
                            <Button variant="contained"  onClick={handleSubmit} color="primary"
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
