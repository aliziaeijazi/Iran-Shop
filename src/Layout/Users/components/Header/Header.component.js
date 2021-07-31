import {NavBar} from "./Navbar/Navbar.component";
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {StoreName} from "./StoreName/StoreName.component";
import {Search} from "./Search/Search.component";


const useStyles = makeStyles((theme) => ({
    root: {
        padding:0,
        width: "100%",
        position:"fixed",
        zIndex:1,
        color:"red",

    },
    appbar: {
        backgroundColor: "white",
        color: "black",
        height:65,
        display:"flex",
        justifyContent:"center",

    },
    flex:{
        display:"flex",
        justifyContent:"space-between",
    }
}));

function Header() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar className={classes.appbar} position="static">
                <Toolbar className={classes.flex}>
                    <StoreName/>
                    <Search/>
                    <NavBar/>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export {Header}
