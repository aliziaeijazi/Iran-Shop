import Badge from '@material-ui/core/Badge';
import {withStyles} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {useEffect} from "react";
import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconMenu from '@material-ui/icons/Menu';
import SettingsIcon from '@material-ui/icons/Settings';
import {useHistory} from "react-router-dom";
import {connect} from "react-redux";
import {setItems} from "../../../../../redux/action/Basket.action";

const StyledBadge = withStyles((theme) => ({
    badge: {
        // right: -3,
        // top: 13,
        border: `1px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
        borderRadius: 5,
        fontSize: 15,
    },
}))(Badge);


const StyledMenu = withStyles({
    paper: {
        border: '2px solid #d3d4d5',
    },
})((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

function Nav(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const history = useHistory()
    useEffect(async()=>{
        const Basket = await JSON.parse(localStorage.getItem("BasketList"))
        if(Basket){
            props.setItems(Basket)
        }
    },[])
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        console.log(event.currentTarget)
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <div>
            <IconButton
                size={"small"}
                aria-controls="customized-menu"
                aria-haspopup="true"
                variant="contained"
                color="primary"
                onClick={handleClick}
            >
                <IconMenu fontSize={"large"}/>
            </IconButton>
            <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={() => {
                    handleClose()
                    history.push('/basket')
                }}>
                    <ListItemIcon>
                        <StyledBadge badgeContent={props.basketItems.length} color="primary">
                            <ShoppingCartIcon/>
                        </StyledBadge>
                    </ListItemIcon>
                    <ListItemText primary="?????? ????????"/>
                </MenuItem>
                <MenuItem onClick={() => {
                    handleClose()
                    history.push('/login')
                }}>
                    <ListItemIcon>
                        <SettingsIcon fontSize="meduim"/>
                    </ListItemIcon>
                    <ListItemText primary="????????????"/>
                </MenuItem>
            </StyledMenu>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {basketItems: state.Basket.basketList}
}

const  mapDispatchToProps =  (dispatch) =>{
    return {
        setItems: (Data) => dispatch(setItems(Data))
    }
}
const NavBar = connect(mapStateToProps , mapDispatchToProps)(Nav)
export {NavBar}