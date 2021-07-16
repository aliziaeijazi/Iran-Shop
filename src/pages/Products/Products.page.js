import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Product from "../../components/Product/Product.component";
import {FeachGroups, FeachProduct, FeachProducts, FeachProductsWithFilter} from "../../api/store.api";
import {Typography} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        margin: theme.spacing(2),
        justifyContent: "center"
    },
    paper: {
        padding: theme.spacing(3),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        display: "flex",
        flexWrap: "wrap",
        borderRadius: "5px",
        boxShadow: "0 0 10px 2px #999",
        justifyContent: "center",
        margin: theme.spacing(1)
    },
    title: {
        textDecoration:"none",
        width: "100%",
        fontWeight: "bolder",
        color: "red",
        fontSize: 35,
        textAlign: "right",
    }
}));

function Products() {
    const classes = useStyles();
    const [data, setdata] = useState([])
    useEffect(async () => {
        const Data = []
        const Groups = await FeachGroups()
        for (const group of Groups) {
            const products = await FeachProductsWithFilter(`groupname=${group.groupname}`)
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
                        <Grid container xs={12} spacing={2} className={classes.paper}>
                            <Grid container xs={12}>
                                <a className={classes.title} href={`/products?group=${target.groupname}`}>{target.groupname}</a>
                            </Grid>
                            {target.products.map((product, index) => {
                                if (index < 6) return (
                                    <Grid item>
                                        <Product data={product}/>
                                    </Grid>)
                            })}
                        </Grid>
                    )
                })}
            </Grid>
        </div>
    );
}

export {Products}