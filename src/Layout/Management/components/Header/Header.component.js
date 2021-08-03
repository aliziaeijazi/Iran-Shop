import {NavBar} from "./Navbar/Navbar.component";
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {Link} from "react-router-dom";
import {StoreName} from "./StoreName/StoreName.component";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    appbar: {
        backgroundColor: "white",
        color: "black",
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    flex: {
        display: "flex",
        justifyContent: "space-between",
        flexWrap:"wrap"
    }
}));

function Header() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar className={classes.appbar} position="static">
                <Toolbar className={classes.flex}>
                    <StoreName/>
                    <NavBar/>
                    <Link to="/" >
                        <ExitToAppIcon/>
                    </Link>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export {Header}
