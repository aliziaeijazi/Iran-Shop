import {makeStyles, MuiThemeProvider} from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import {createMuiTheme} from "@material-ui/core";
import LocalGroceryStoreIcon from '@material-ui/icons/LocalGroceryStore';

const useStyles = makeStyles({
    root: {
        width: "300px",
    },
    text: {
        color: "blue",
    }
});
const theme = createMuiTheme(
    {
        typography: {
            fontSize: "20",
            fontFamily: [
                'vazir',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                'Roboto',
                '"Helvetica Neue"',
                'Arial',
                'sans-serif',
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
            ].join(','),
        },
        direction: "rtl",

    }
)

function NavBar() {
    const classes = useStyles();
    return (
        <MuiThemeProvider theme={theme}>
            <BottomNavigation
                showLabels
                className={classes.root}

            >
                    <BottomNavigationAction icon={<LocalGroceryStoreIcon/>}label="سبد خرید" href={"/basket"} className={classes.text}/>
                <BottomNavigationAction label="مدیریت" href={"/login"} className={classes.text}/>
            </BottomNavigation>
        </MuiThemeProvider>

    );
}

export {NavBar}

