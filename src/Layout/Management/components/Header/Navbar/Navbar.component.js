import {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import LocalGroceryStoreIcon from '@material-ui/icons/LocalGroceryStore';
import StoreIcon from '@material-ui/icons/Store';
import LocalConvenienceStoreIcon from '@material-ui/icons/LocalConvenienceStore';
import {useHistory} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        width: 500,
        fontWeight: "bolder",
        [theme.breakpoints.down('sm')]: {
            width: 400
        }

    },
}));

function NavBar() {
    const classes = useStyles();
    const history = useHistory()
    const [value, setValue] = useState('/management/productlist');
    const handleChange = (event, newValue) => {
        history.push(newValue)
        setValue(newValue)
    }
    return (
        <BottomNavigation
            value={value}
            className={classes.root}
            onChange={handleChange}
        >
            <BottomNavigationAction label="کالاها" value={'/management/productlist'} icon={<StoreIcon/>}/>
            <BottomNavigationAction label="موجودی و قیمت " value={"/management/supply"} icon={<LocalConvenienceStoreIcon/>}/>
            <BottomNavigationAction label="سفارش ها" value={"/management/orders"} icon={<LocalGroceryStoreIcon/>}/>
        </BottomNavigation>

    );
}

export {NavBar}

