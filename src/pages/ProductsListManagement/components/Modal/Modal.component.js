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
        height: 600,
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
    },
    submit: {
        width: "100px"
    },


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
    textarea: {
        fontFamily: [
            'vazir',
            'BlinkMacSystemFont',
            '"Helvetica Neue"',
            'Arial',
        ].join(','),
    },

    direction: "rtl"
});

export default function InsertProduct(props) {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    const [data, setdata] = React.useState({
            "name": "",
            "subgroupname": "",
            "price": "0",
            "groupname": "",
            "count": "0",
            "image": "",
            "newimage": "",
            "describtion": "",
            "id": 0
        }
    )
    const [groups, setgroups] = React.useState([])
    const [state, setState] = React.useState();
    const handleChangeData = async (key, value) => {
        await setdata({
                ...data, [key]: value
            }
        )
    }

    const handleChange = async (event) => {
        const group = event.target.value.split("/")
        setState(event.target.value)
        await setdata({
                ...data, "groupname": group[0], "subgroupname": group[1]
            }
        )
    };
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setdata({})
        setState()
        props.falsemodal()
    };
    useEffect(async () => {
        const groups = await FeachGroups()
        setgroups(groups)
    }, [])
    useEffect(async () => {
        if (props.id) {
            const data = await FeachProduct(props.id)
            setdata(data)
            setState(`${data.groupname}/${data.subgroupname}`)
        }
        if (props.open) {
            setOpen(true)
        }
    }, [props.open])
    const handleSubmit = async() => {
        if( !data.name )
            toast.error(<h3 style={{fontFamily: "Vazir", fontSize: "large"}}>لطفا نام کالا را وارد کنید.</h3>)
        else if( !data.groupname  )
            toast.error(<h3 style={{fontFamily: "Vazir", fontSize: "large"}}>لطفا گروه کالا را انتخاب کنید.</h3>)
        else if(!data.describtion )
            toast.error(<h3 style={{fontFamily: "Vazir", fontSize: "large"}}>لطفا توضیحاتی را درمورد کالا  وارد کنید.</h3>)
        else if( !(data.image || data.newimage))
            toast.error(<h3 style={{fontFamily: "Vazir", fontSize: "large"}}>لطفا عکسی را برای  کالا انتخاب  کنید.</h3>)
        else{
            if (props.id) {
                await EditData(data)
            } else{
                await CreateData(data)
            }
            handleClose()
        }

    }
    const handleInputFile = (value) => {
        handleChangeData("newimage", value)
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
                        <Button type="button" onClick={handleClose}>
                            X
                        </Button>
                        <Typography variant="h5">افزودن/ویرایش کالا</Typography>
                        <FormControl component="fieldset">
                            <FormLabel dir={"rtl"}>تصویر کالا</FormLabel>
                            <TextField accept="image/*" color="primary" id={"image"}
                                       onChange={(event) => handleInputFile(event.target)} type="file"/>
                            <TextField required id="name" label="نام کالا" className={classes.fieldmargin}
                                       onChange={(event) => handleChangeData("name", event.target.value)}
                                       defaultValue={data.name}/>
                            <FormControl required className={`${classes.formControl} ${classes.fieldmargin}`}>
                                <InputLabel>: دسته بندی</InputLabel>
                                <Select
                                    native
                                    value={state}
                                    onChange={handleChange}
                                >
                                    <option aria-label="None" value=""/>
                                    {groups.map((target) => target.subgroup.map((subgroup) => <option key={subgroup.id}
                                                                                                      value={`${target.groupname}/${subgroup.name}`}>{`${target.groupname}/${subgroup.name}`}</option>))}
                                </Select>
                            </FormControl>
                            <FormLabel className={classes.fieldmargin} dir={"rtl"}>توضیحات :</FormLabel>
                            <TextareaAutosize style={{fontFamily: "Vazir", height : 200}} defaultValue={data.describtion} required
                                              className={classes.describtionTextArea}
                                              onChange={(event) => handleChangeData("describtion", event.target.value)}/>
                            <Button variant="contained" onClick={handleSubmit} color="primary"
                                    className={classes.submit}>
                                ذخیره
                            </Button>
                        </FormControl>
                    </div>
                </MuiThemeProvider>
            </Modal>
        </div>
    );
}
