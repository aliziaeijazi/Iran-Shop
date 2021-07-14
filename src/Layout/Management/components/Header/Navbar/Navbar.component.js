import React, {useEffect} from 'react';
import {makeStyles, MuiThemeProvider} from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

const useStyles = makeStyles({
    root: {
        width: 500,
        fontWeight:"bolder"
    },
    btnbackfground: {
        backgroundColor: "lightskyblue",
    }
});

function NavBar() {
    const classes = useStyles();
    const [value, setValue] = React.useState();
    useEffect(() => {
        console.log(document.location.pathname)
        if (document.location.pathname == "/management/productlist") setValue(0)
        else if (document.location.pathname == "/management/supply") setValue(1)
        else if (document.location.pathname == "/management/orders") setValue(2)
    })
    return (
        <BottomNavigation
            value={value}
            showLabels
            className={classes.root}
        >
            <BottomNavigationAction label="کالاها" href={"/management/productlist"}
                                    className={value == 0 && classes.btnbackfground}/>
            <BottomNavigationAction label="موجودی و قیمت ها" href={"/management/supply"}
                                    className={value == 1 && classes.btnbackfground}/>
            <BottomNavigationAction label="سفارش ها" href={"/management/orders"}
                                    className={value == 2 && classes.btnbackfground}/>
        </BottomNavigation>

    );
}

export {NavBar}

