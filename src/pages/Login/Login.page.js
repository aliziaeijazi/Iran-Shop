import React, {createRef} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles, MuiThemeProvider} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {createMuiTheme} from "@material-ui/core";

const theme = createMuiTheme({
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
});

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),

    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));
function Login() {
    const classes = useStyles();
    const usernameref = createRef()
    const passwordref = createRef()

    return (
        <MuiThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        ورود به پنل مدیریت فروشگاه ایران زمین
                    </Typography>
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
                            onClick={()=>{
                            document.location.href="/managment";
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