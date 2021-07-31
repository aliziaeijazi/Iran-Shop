import React, {createRef, useEffect} from 'react';
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
import {useHistory} from "react-router-dom";

const drawerWidth = 180;
const useStyles = makeStyles((theme) => ({

    drawer: {
        width: drawerWidth,
        position: "relative",
        marginLeft: theme.spacing(3),
        borderLeft: "1px solid #e0e0e0",
        [theme.breakpoints.down("sm")]: {
            display: "none",
            position: "absolute",
            backgroundColor: "white",
            zIndex: 1
        },
    },
    drawerPaper: {
        width: drawerWidth,
        position: "absolute",
        zIndex: 0,
    },
    drawerContainer: {
        height: "80vh",
        overflowY: 'auto',
        overflowX: "hidden",
        direction: "ltr",

    },
    content: {
        display: "flex",
        flexWrap: "wrap",
        padding: theme.spacing(5, 0),
    },
    subgroup: {
        "&:hover": {
            backgroundColor: "#efefef",
        },
        marginRight: 20,
        paddingRight: 5,
        flexGrow: 1,
        textAlign: "right",
        fontSize: 14,
        cursor: "pointer"
    },
    group: {
        flexGrow: 1,
        textAlign: "right",
        fontSize: 18,
        cursor: "pointer"
    },
    pageination: {
        flexGrow: 1,
        display: "flex",
        justifyContent: "center",
        margin: theme.spacing(1),
        alignItems: "flex-end"
    },
    product: {
        height: "min-content",
        minHeight: 755,
        width: 1264,
        backgroundColor: "white",
        border: "1px solid #ddd",
        borderRadius: 5,
        [theme.breakpoints.down("lg")]: {width: 1012,},
        [theme.breakpoints.down("md")]: {width: 759,},
        [theme.breakpoints.down("sm")]: {width: 507},
        [theme.breakpoints.down("xs")]: {width: 255}
    },
    flex: {
        display: "flex",
        justifyContent: "center"
    },
    notExit: {
        fontSize: 20,
        color: "red",
        fontWeight: "bold",
        margin: "auto"
    },
    menutoggle: {
        width: 100,
        textAlign: "center",
        fontSize: 20,
        margin: 20,
        display: "none",
        backgroundColor: "#aaa",
        padding: 3,
        color: "white",
        borderRadius: "0px 0px 0px 10px",
        [theme.breakpoints.down("sm")]: {display: "block"},
        cursor: "pointer",
    }

}));

function ProductGroup(props) {
    const classes = useStyles();
    const [groups, setgroups] = React.useState([])
    const [data, setData] = React.useState([])
    const [page, setPage] = React.useState(1)
    const [count, setCount] = React.useState(1)
    const drawerRef = createRef()
    const toggleMenu = () => {
        const style = drawerRef.current.style
        style.display = style.display == "block" ? "none" : "block"
    }
    const countPerPage = 10
    const history = useHistory()
    useEffect(async () => {
        const groups = await FeachGroups()
        setgroups(groups)
        const pathname = decodeURI(props.pathname)
        const fillter = pathname.split('/products/')[1].split("&")
        const params = fillter.length == 2 ? `groupname=${fillter[0]}&subgroupname=${fillter[1]}` : `groupname=${fillter[0]}`
        const response = (await FeachProductsWithFilter(`${params}&_limit=${countPerPage}&_page=${page}`))
        setCount(Math.ceil(response.headers['x-total-count'] / countPerPage))
        setData(response.data)
    }, [props, page])
    useEffect(() => {
        setPage(1)
    }, [props])
    const handleChange = (event, value) => {
        setPage(value);
    };
    return (
        <main className={classes.content}>
            <div onClick={toggleMenu} className={classes.menutoggle}>منو</div>
            <Grid className={classes.flex} container spacing={0}>
                <Grid item>
                    <div
                        ref={drawerRef}
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
                                    <Typography className={classes.group}
                                                onClick={() => {
                                                    history.push(`/products/${target.groupname}`)
                                                }}>{target.groupname}</Typography>
                                </ListItem>
                                {target.subgroup.map((subgroup) =>
                                    <ListItem key={subgroup.id}>
                                        <Typography className={classes.subgroup}
                                                    onClick={() => {
                                                        history.push(`/products/${target.groupname}&${subgroup.name}`)
                                                    }}>{subgroup.name}</Typography>
                                    </ListItem>)}
                                <Divider style={{backgroundColor: "#ddd", fontSize: 2, width: 190}}/>
                            </List>)}
                        < /div>
                    </div>
                </Grid>

                <Grid container className={classes.product}>
                    {!data.length && <Typography className={classes.notExit}> کالایی جهت نمایش وجود ندارد.</Typography>}
                    {data.map((target, index) =>
                        <Grid item><Product data={target}/></Grid>
                    )}
                    <Grid container className={classes.pageination} xs={12}>
                        <Pagination count={count} page={page} shape="rounded" color={"primary"}
                                    className={classes.pageinationBotton} hidePrevButton hideNextButton
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