import {makeStyles, MuiThemeProvider} from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import {createMuiTheme} from "@material-ui/core";
import LocalGroceryStoreIcon from '@material-ui/icons/LocalGroceryStore';
import Badge from '@material-ui/core/Badge';
import {withStyles} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {useEffect, useState} from "react";

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

const StyledBadge = withStyles((theme) => ({
    badge: {
        // right: -3,
        // top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}))(Badge);


function NavBar() {
    const classes = useStyles();
    const [count, setcount] = useState(0)
    useEffect(async () => {
        const Basket = await JSON.parse(localStorage.getItem("BasketList"))
        if (Basket)
            setcount(Basket.length)
    }, [])
    return (
        <MuiThemeProvider theme={theme}>
            <BottomNavigation
                showLabels
                className={classes.root}
            >
                <BottomNavigationAction label="مدیریت" href={"/login"} className={classes.text}/>
                <BottomNavigationAction label={<IconButton aria-label="cart">
                    <StyledBadge badgeContent={count} color="secondary">
                        <ShoppingCartIcon/>
                    </StyledBadge>
                </IconButton>} href={"/basket"} className={classes.text}/>

            </BottomNavigation>
        </MuiThemeProvider>

    );
}

export {NavBar}

