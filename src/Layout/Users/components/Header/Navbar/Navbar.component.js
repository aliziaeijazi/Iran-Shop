import {makeStyles, MuiThemeProvider} from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import {createMuiTheme} from "@material-ui/core";
import LocalGroceryStoreIcon from '@material-ui/icons/LocalGroceryStore';

const useStyles = makeStyles({
    root: {
        width: 200,
    },
    text: {
        color: "blue",
    }
});
const theme = createMuiTheme(
    {
        typography: {
            fontSize: 25,
            fontFamily: [
                "IranSans",
                "IranYekan"
            ].join(','),

        },

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
                <BottomNavigationAction label="مدیریت" href={"/login"} className={classes.text}/>
                <BottomNavigationAction icon={<LocalGroceryStoreIcon/>} href={"/basket"} className={classes.text}/>
            </BottomNavigation>
        </MuiThemeProvider>

    );
}

export {NavBar}

