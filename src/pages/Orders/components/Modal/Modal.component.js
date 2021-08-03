import React, {useEffect} from 'react';
import {makeStyles, MuiThemeProvider} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import {Button, createTheme, Input, TextField, Typography} from "@material-ui/core";
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import {
    CreateData,
    EditData,
    EditOrdersData,
    FeachGroups,
    FeachOrdersById,
    FeachProduct
} from "../../../../api/store.api";
import {toast} from "react-toastify";
import ProductTable from "./ProductTable.component";


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
        width: 800,
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
        padding: theme.spacing(4),
    },
    formControl: {
        minWidth: 500,
    },
    selectEmpty: {
        margin: theme.spacing(2),
    },
    row: {
        display: "flex",
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        width :350
    },
    title: {
        width: 200
    },
    body:{
        display:"flex",
        flexWrap:"wrap",
    },
    finalbtn:{
        display:"flex",
        alignSelf:"center",
        margin:"auto",
        marginTop:theme.spacing(3),
        width:200
    }

}));
const theme = createTheme({
    direction: "rtl"
});

export default function Detail(props) {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    const [state, setState] = React.useState();
    const [data, setData] = React.useState([])
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        props.falsemodal()
    };
    useEffect(async () => {
        if (props.open) {
            setOpen(true)
            const data = await FeachOrdersById(props.id)
            setData(data)
        }
    }, [props.open])
    const handlesend = async()=>{
        const time = await  new Date()
        await EditOrdersData({ id: data.id ,status:"true" , endDeliveriTime: time.toLocaleString('fa-IR')})
        toast.success(<h4>وضعیت سفارش به تحویل نهایی تغییر پیدا کرد.</h4>)
        handleClose()
    }
    const ordertime = new Date(data.createdAt)
    const deliverytime = new Date(data.deliveryTime)
    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description">
                <MuiThemeProvider theme={theme}>
                    <div style={modalStyle} className={`${classes.paper} ${classes.modalroot}`}>
                        <Typography variant="h5">نهایی کردن خرید</Typography>
                        <Button type="button" onClick={handleClose}>
                            X
                        </Button>
                        <div className={classes.body}>
                            <div className={classes.row}>
                                <Typography className={classes.title}>نام مشتری : </Typography>
                                <Typography>{data.name} {data.family}</Typography>
                            </div>
                            <div className={classes.row}>
                                <Typography className={classes.title}>آدرس : </Typography>
                                <Typography>{data.address}</Typography>
                            </div>
                            <div className={classes.row}>
                                <Typography className={classes.title}>تلفن : </Typography>
                                <Typography>{data.phone}</Typography>
                            </div>
                            <div className={classes.row}>
                                <Typography className={classes.title}>زمان تحویل : </Typography>
                                <Typography>{deliverytime.toLocaleString('fa-IR')}</Typography>
                            </div>
                            <div className={classes.row}>
                                <Typography className={classes.title}>زمان سفارش : </Typography>
                                <Typography>{ordertime.toLocaleString('fa-IR')}</Typography>
                            </div>
                            <ProductTable product={data.product}/>
                            {data.status == "false" && <Button  variant="contained" color="primary"
                                                               className={classes.finalbtn} onClick={handlesend}>
                                تحویل شد.
                            </Button>}
                            {
                                data.status == "true" && <div className={classes.row}>
                                    <Typography className={classes.title}>زمان تحویل نهایی : </Typography>
                                    <Typography>{data.endDeliveriTime}</Typography>
                                </div>
                            }
                        </div>
                    </div>
                </MuiThemeProvider>
            </Modal>
        </div>
    );
}
