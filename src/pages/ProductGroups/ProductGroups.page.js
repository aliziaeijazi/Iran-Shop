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

const drawerWidth = 200;
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },

    drawer: {
        width: drawerWidth,
    },
    drawerPaper: {
        width: drawerWidth,
        marginTop: 75,
    },
    drawerContainer: {
        overflow: 'auto',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(5),
        backgroundColor:"#ddd",
        justifyContent:"center"
    },
    subgroup: {
        "&:hover":{
            backgroundColor:"#ccc",
            borderLeft:"2px solid red"
        },
        marginRight:15,
        borderRight:"2px solid red",
        paddingRight:5,
        flexGrow:1,
        color:"black",
        textAlign: "right",
        textDecoration:"none",
        fontSize:16
    },
    group:{
        flexGrow:1,
        color:"red",
        textAlign: "right",
        textDecoration:"none",
        fontSize:18,
        fontWeight:"bolder"
    }

}));

function ProductGroup() {
    const classes = useStyles();
    const [groups, setgroups] = React.useState([])
    const [data , setData] = React.useState([])
    useEffect(async () => {
        const groups = await FeachGroups()
        setgroups(groups)
        const url = decodeURI(document.location.href)
        const fillter = (url.includes("subgroup") ? `subgroupname=${url.split("subgroup=")[1]}`:`groupname=${url.split("group=")[1]}`)
        console.log(fillter)
        const data = await FeachProductsWithFilter(fillter)
        setData(data)
    }, [])
    return (
        <div className={classes.root}>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor="right"

            >
                <div className={classes.drawerContainer}>
                    {groups.map((target, index) => <List>

                        <ListItem  key={index}>
                            <a className={classes.group} href={`/products?group=${target.groupname}`}>{target.groupname}</a>
                        </ListItem>
                        {target.subgroup.map((subgroup) =>
                            <ListItem key={subgroup.id}>
                                <a className={classes.subgroup} href={`/products?subgroup=${subgroup.name}`}>{subgroup.name}</a>
                            </ListItem>)}
                        <Divider style={{backgroundColor:"red", fontSize:2}}/>
                    </List>)}
                < /div>
            </Drawer>
            <main className={classes.content}>
                <Grid container spacing={3} >
                    {data.map((target)=><Grid  xs={4} item><Product data={target}/></Grid>)}
                </Grid>
            </main>
        </div>
    );
}

export
{
    ProductGroup
}