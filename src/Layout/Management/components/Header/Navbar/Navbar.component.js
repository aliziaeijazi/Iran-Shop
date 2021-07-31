import {useState, createRef, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

const useStyles = makeStyles({
    root: {
        width: 500,
        fontWeight:"bolder",
    },
    btnbackground: {
        backgroundColor: "lightskyblue",
    }
});

function NavBar() {
    const classes = useStyles();
    const [value, setValue] = useState(0);
    useEffect(() => {
        if (document.location.pathname == "/management/productlist") setValue(0)
        else if (document.location.pathname == "/management/supply") setValue(1)
        else if (document.location.pathname == "/management/orders") setValue(2)
        handlechang()
    })
    const btnRef=[createRef() ,createRef() , createRef()]
    const handlechang =() =>{
        btnRef.map((target)=>target.current.classList.remove(classes.btnbackground))
        btnRef[value].current.classList.add(classes.btnbackground)
    }
    return (
        <BottomNavigation
            value={value}
            showLabels
            className={classes.root}
        >
            <BottomNavigationAction ref={btnRef[0]} label="کالاها" href={"/management/productlist"}/>
            <BottomNavigationAction ref={btnRef[1]} label="موجودی و قیمت ها" href={"/management/supply"}/>
            <BottomNavigationAction ref={btnRef[2]} label="سفارش ها" href={"/management/orders"}/>
        </BottomNavigation>

    );
}

export {NavBar}

