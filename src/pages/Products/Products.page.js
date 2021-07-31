import {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Product from "../../components/Product/Product.component";
import {FeachGroups, FeachProductsWithFilter} from "../../api/store.api";
import {Typography} from "@material-ui/core";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        width:1554,
        [theme.breakpoints.down("lg")]: {width: 1302,},
        [theme.breakpoints.down("md")]: {width: 797,},
        [theme.breakpoints.down("sm")]: {width: 545},
        [theme.breakpoints.down("xs")]: {width: 292},
        margin: "auto",
        marginTop: theme.spacing(2),
    },
    paper: {
        padding: theme.spacing(3, 4),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        borderRadius: "1px",
        boxShadow: "0 0 20px 1px #999",
        margin: "auto",
        marginBottom: theme.spacing(3),
    },
    title: {
        color: "black",
        fontSize: 30,
        textAlign: "right",
        marginBottom: theme.spacing(2),
        cursor:"pointer",
    }
}));

function Products() {
    const classes = useStyles();
    const history = useHistory()
    const [data, setdata] = useState([])
    const countOfProduct = 6
    const pageOfProduct = 1
    useEffect(async () => {
        const Data = []
        const Groups = await FeachGroups()
        for (const group of Groups) {
            const products = (await FeachProductsWithFilter(`groupname=${group.groupname}&_page=${pageOfProduct}&_limit=${countOfProduct}`)).data
            if (products.length) {
                Data.push({groupname: group.groupname, products: products})
            }
        }
        setdata(Data)
    }, [])
    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                {data.map((target) => {
                    return (
                        <Grid container xs={12} spacing={0} className={classes.paper}>
                            <Grid container xs={12}>
                                <Typography className={classes.title}
                                            onClick={()=> history.push(`/products?group=${target.groupname}`)}>{target.groupname}
                                </Typography>
                            </Grid>
                            {target.products.map((product) =>
                                <Grid item>
                                    <Product data={product}/>
                                </Grid>)}
                        </Grid>
                    )
                })}
            </Grid>
        </div>
    );
}

export {Products}