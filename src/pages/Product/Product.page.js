import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {FeachProduct} from "../../api/store.api";
import {CardMedia, Typography} from "@material-ui/core";
import {BASE_URL} from "../../configs/variable.config";
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: "center",
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    paper: {
        padding:20,
        display: "flex",
        flexDirection: "column",
        flex: 1,
        height: 400,
        alignItems: "center",
    },
    media: {
        minWidth: 400,
        minHeight: 400,
        maxWidth: 500,
        maxHeight: 500,
    },
    title: {
        fontWeight: "bolder",
        fontSize: 20,
        color: "mediumvioletred",
        textDecoration: "none",
    },
    price: {
        margin:50,
        display: "flex",
        fontWeight: "bolder",
        fontSize: 30,
        alignItems: "center",
    },
    name: {
        display: "flex",
        fontSize: 25,
        alignItems: "center",
        textAlign:"center"
    },
    describtion: {
        padding:40,
        display: "flex",
        flex: 1,
        fontSize: 18,
        alignItems: "center",
        textAlign:"center"
    },
    link:{
        margin:20,
        display:"flex",
        width:"100%",
        justifyContent:"flex-start",

    }
}));

export function Product() {
    const [data, setData] = useState({})
    useEffect(async () => {
        const href = decodeURI(document.location.href)
        const id = href.split("id=")
        const data = await FeachProduct(id[1])
        setData(data)
    }, [])
    const classes = useStyles();

    return (
        <div >
            <Grid container className={classes.root}>
                <Grid item xs={10} sm={8} md={6} lg={4}>
                    <Paper className={classes.paper} elevation={5}>
                        <CardMedia className={classes.media}
                                   image={`${BASE_URL}${data.image}`}
                                   title={data.name}/>
                    </Paper>
                </Grid>
                <Grid item xs={10} sm={8} md={6} lg={4}>
                    <Paper className={classes.paper} elevation={5}>
                        <Typography
                            className={classes.name}> {data.name}
                        </Typography>
                        <div className={classes.link}>
                            <a className={classes.title} href={`/products?group=${data.groupname}`}>{data.groupname}</a>
                            <a className={classes.title}
                               href={`/products?subgroup=${data.subgroupname}`}>{`  >  ${data.subgroupname} `}</a>
                        </div>
                        <Typography
                            className={classes.price}> {`${new Number(data.price).toLocaleString("fa-IR")} تومان`}
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={10} sm={8} md={6} lg={8}>
                    <Paper  elevation={0}>
                        <Typography className={classes.describtion}>{data.describtion}</Typography>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}

