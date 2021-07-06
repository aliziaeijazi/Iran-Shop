import React, {useEffect} from 'react';
import {makeStyles, MuiThemeProvider} from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import {createMuiTheme} from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        width: 600,
    },
    btnbackfground:{
        backgroundColor:"lightskyblue"
    }
});
const theme = createMuiTheme(
    {
        typography: {
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
    const [value, setValue] = React.useState();
    useEffect(()=>{
        console.log(document.location.pathname)
        if (document.location.pathname =="/management/productlist")setValue(2)
        else if (document.location.pathname =="/management/supply")setValue(1)
        else if(document.location.pathname =="/management/orders") setValue(0)
    })
    return (
        <MuiThemeProvider theme={theme}>
            <BottomNavigation
                value={value}
                showLabels
                className={classes.root}

            >
                <BottomNavigationAction label="سفارش ها"  href={"/management/orders"}  className={ value == 0 && classes.btnbackfground }/>
                <BottomNavigationAction label="موجودی و قیمت ها" href={"/management/supply"} className={value == 1 && classes.btnbackfground} />
                <BottomNavigationAction label="کالاها"  href={"/management/productlist"} className={ value ==2 && classes.btnbackfground} />
            </BottomNavigation>
        </MuiThemeProvider>

    );
}

export {NavBar}

