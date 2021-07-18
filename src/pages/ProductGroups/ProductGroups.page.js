import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {FeachGroups, FeachProductsWithFilter} from "../../api/store.api";
import Product from "../../components/Product/Product.component";
import {Grid} from "@material-ui/core";
import {PageviewOutlined} from "@material-ui/icons";
import {Pagination} from "@material-ui/lab";

const drawerWidth = 200;
const useStyles = makeStyles((theme) => ({

    drawer: {
        width: drawerWidth,
        position: "relative",
        marginLeft: theme.spacing(3),
        borderLeft:"1px solid gray"
    },
    drawerPaper: {
        width: drawerWidth,
        position: "absolute",
        zIndex: 0,
    },
    drawerContainer: {
        overflow: 'auto',
    },
    content: {
        display: "flex",
        flexWrap: "wrap",
        padding: theme.spacing(5),
        minHeight: 400,
    },
    subgroup: {
        "&:hover": {
            backgroundColor: "#ccc",
        },
        marginRight: 15,
        paddingRight: 5,
        flexGrow: 1,
        color: "black",
        textAlign: "right",
        textDecoration: "none",
        fontSize: 16
    },
    group: {
        flexGrow: 1,
        color: "red",
        textAlign: "right",
        textDecoration: "none",
        fontSize: 18,
        fontWeight: "bolder"
    },
    pageination: {
        flexGrow: 1,
        display: "flex",
        justifyContent: "center",
        margin: theme.spacing(1),
        alignItems: "flex-end"
    },
    product: {
        width:1005,
        height:750,
        backgroundColor:"white",
        border:"1px solid #ddd",
        borderRadius:5
    },
    flex:{
        display:"flex",
        justifyContent:"center"
    },

}));

function ProductGroup() {
    const classes = useStyles();
    const [groups, setgroups] = React.useState([])
    const [data, setData] = React.useState([])
    const [page, setPage] = React.useState(1)
    const [count, setCount] = React.useState(1)
    useEffect(async () => {
        const groups = await FeachGroups()
        setgroups(groups)
        const url = decodeURI(document.location.href)
        const fillter = (url.includes("subgroup") ? `subgroupname=${url.split("subgroup=")[1]}` : `groupname=${url.split("group=")[1]}`)
        const data = await FeachProductsWithFilter(fillter)
        setData(data)
        setCount(Math.ceil(data.length / countPerPage))
    }, [])
    const countPerPage = 8
    const handleChange = (event, value) => {
        setPage(value);
        console.log(value)
    };
    return (
        <main className={classes.content}>
            <Grid className={classes.flex} container spacing={3}>
                <Grid item xs={2}>
                    <div
                        className={classes.drawer}
                        variant="permanent"
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        anchor="right"
                    >
                        <div className={classes.drawerContainer}>
                            {groups.map((target, index) => <List>
                                <ListItem key={index}>
                                    <a className={classes.group}
                                       href={`/products?group=${target.groupname}`}>{target.groupname}</a>
                                </ListItem>
                                {target.subgroup.map((subgroup) =>
                                    <ListItem key={subgroup.id}>
                                        <a className={classes.subgroup}
                                           href={`/products?subgroup=${subgroup.name}`}>{subgroup.name}</a>
                                    </ListItem>)}
                                <Divider style={{backgroundColor: "red", fontSize: 2}}/>
                            </List>)}
                        < /div>
                    </div>
                </Grid>
                <Grid container spacing={0}  className={classes.product}>
                    {data.map((target, index) => {
                        if (((page - 1) * countPerPage ) <= index && index < page * countPerPage) return <Grid
                            item><Product data={target}/></Grid>
                    })}
                    <Grid container className={classes.pageination} xs={12}>
                        <Pagination count={count} page={page} shape="rounded" color={"primary"} className={classes.pageinationBotton} hidePrevButton hideNextButton
                                    onChange={handleChange}/>
                    </Grid>
                </Grid>
            </Grid>
        </main>
    );
}

export
{
    ProductGroup
}