import {createRef, useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {FeachProduct} from "../../api/store.api";
import {Button, CardMedia, InputLabel, TextField, Typography} from "@material-ui/core";
import {BASE_URL} from "../../configs/variable.config";
import Grid from '@material-ui/core/Grid';
import {AddShoppingCart} from "@material-ui/icons";
import {connect} from "react-redux";
import {addToBasket, editCountInBasket} from "../../redux/action/Basket.action";
import {toast} from "react-toastify";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: "center",
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    paper: {
        maxWidth: 1400,
        [theme.breakpoints.down('sm')]: {
            maxWidth: 600,
        },
        margin: 20,
        padding: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    media: {
        width: 300,
        height: 300,
    },
    link: {
        fontSize: 18,
        color: "#0fabc6",
        cursor: "pointer",
    },
    price: {
        margin: "20px 0",
        display: "flex",
        fontSize: 20,
    },
    name: {
        display: "flex",
        fontSize: 20,
        alignItems: "center",
    },
    describtion: {
        padding: " 0 20px",
        display: "flex",
        flex: 1,
        fontSize: 18,
    },
    links: {
        margin: "20px 0",
        display: "flex",
        width: "100%",
        justifyContent: "flex-start",

    },
    mediacard: {
        display: "flex",
        justifyContent: "center",
    },
    panel: {
        padding: "0 20px"
    },
    btn: {
        color: 'white',
        backgroundColor: "#ef394e",
        margin: "20px 0",
        textAlign: "center",
        width: 200,
        "&:hover": {
            backgroundColor: "#FF5E77",
        }
    },
    notexist: {
        display: "flex",
        fontSize: 15,
        color: "red"
    }
}));

function ProductDetail(props) {
    const classes = useStyles()
    const history = useHistory()
    const [data, setData] = useState({})
    const [counter, setcounter] = useState(1)
    useEffect(async () => {
        const pathname = decodeURI(document.location.pathname)
        const id = pathname.split("/product/")
        const data = await FeachProduct(id[1])
        setData(data)
    }, [])
    const disable = !+data.count ? true : false
    const handleAddToBasket = async () => {
        const basket = props.basketList
        const index = basket.findIndex((target) => (target.id == data.id))
        if (index == -1) {
            await props.addToBasket({
                name: data.name,
                id: data.id,
                groupname: data.groupname,
                subgroupname: data.subgroupname,
                price: data.price,
                counter: counter
            })
            toast.success(<h4>کالای مورد نظر به سبد خرید شما اضافه شد.</h4>)

        } else if (data.count < counter)
            toast.error(<h4>کالای مورد نظر شما به تعداد درخواستی در انبار موجود نیست.</h4>)
        else if (basket[index].counter != counter) {
            await props.editCountInBasket(index, counter)
            toast.success(<h4>تعداد کالای مورد نظر در سبد خرید بروز شد.</h4>)
        } else
            toast.error(<h4>کالای مورد نظر قبلا به سبد خرید اضافه شده است.</h4>)
    }

    return (
        <div className={classes.root}>
            <Paper elevation={20} className={classes.paper}>
                <Grid container className={classes.root}>
                    <Grid item sm={12} md={5} lg={5} className={classes.mediacard}>
                        <CardMedia className={classes.media}
                                   image={`${BASE_URL}${data.image}`}
                                   title={data.name}/>
                    </Grid>
                    <Grid item sm={12} md={6} lg={6} className={classes.panel}>
                        <div className={classes.links}>
                            <Typography className={classes.link}
                                        onClick={() => history.push(`/products/${data.groupname}`)}>{data.groupname}</Typography>
                            <Typography className={classes.link}
                                        onClick={() => history.push(`/products/${data.groupname}&${data.subgroupname}`)}>{`  /  ${data.subgroupname} `}</Typography>
                        </div>
                        <Typography
                            className={classes.name}> {data.name}
                        </Typography>
                        <Typography
                            className={classes.price}> {`${(+data.price).toLocaleString("fa-IR")} تومان`}
                        </Typography>
                        <TextField onChange={(event) => {
                            setcounter(event.target.value)
                        }} inputProps={{
                            style: {textAlign: "center", width: 200, fontWeight: "bolder"},
                            min: 1,
                            max: data.count,
                        }}
                                   type='number' aria-valuemin={1} defaultValue={1}>Count</TextField>
                        <br/>
                        <Button disabled={disable} className={classes.btn} variant="outlined"
                                endIcon={<AddShoppingCart/>} onClick={handleAddToBasket}>
                            افزودن به سبد خرید
                        </Button>
                        {disable && <Typography
                            className={classes.notexist}>اتمام موجودی
                        </Typography>}
                    </Grid>
                    <Grid item xs={12}>
                        <Typography className={classes.describtion}
                                    dangerouslySetInnerHTML={{__html: data.describtion}}></Typography>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        basketList: state.Basket.basketList
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addToBasket: (value) => dispatch(addToBasket(value)),
        editCountInBasket: (index, counter) => dispatch(editCountInBasket(index, counter))
    }
}

const Product = connect(mapStateToProps, mapDispatchToProps)(ProductDetail)
export {Product}
