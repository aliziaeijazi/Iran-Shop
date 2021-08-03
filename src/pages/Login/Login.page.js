import React, {createRef} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles, MuiThemeProvider} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {CardMedia} from "@material-ui/core";
import { createTheme } from '@material-ui/core/styles'
import Avatar from "@material-ui/core/Avatar";
import Logo from "../../asset/images/logo.png"
import {useHistory} from "react-router-dom";
const theme = createTheme({

    direction: "rtl",
});

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius:10,
        boxShadow:"2px 2px 5px 2px #aaa",
        padding:50


    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),

    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    root: {display: "flex", height: "100vh", alignItems: "center",
    },
    logo:{
        width:"100%",
        height:80
    }
}));

function Login() {
    const classes = useStyles();
    const usernameref = createRef()
    const passwordref = createRef()
    const history = useHistory()
    const handleClick = () => {
        history.push('/')
    }
    return (
        <MuiThemeProvider theme={theme}>
            <Container component="main" maxWidth="sm" className={classes.root}>
                <CssBaseline/>
                <div className={classes.paper}>
                    <Avatar onClick={handleClick} variant="rounded" className={classes.logo} src={Logo}>
                    </Avatar>
                    <form className={classes.form} noValidate>
                        <TextField
                            ref={usernameref}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="نام کاربری"
                            name="username"
                            autoComplete="username"
                            autoFocus
                        />
                        <TextField
                            ref={passwordref}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="رمز عبور"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={() => {
                                history.push("/management/productlist");
                                // console.log("username :" ,  usernameref.current.children[1].children[0].value , "password :" , passwordref.current.children[1].children[0].value );
                            }}
                        >
                            ورود
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link href="/" variant="body2">
                                    بازگشت به سایت
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        </MuiThemeProvider>
    );
}

export {Login}