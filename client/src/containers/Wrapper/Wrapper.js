import React, { Component } from 'react';
import Layout from './../../layouts/Layout';
import GoogleLogin from 'react-google-login';
import axios from 'axios';
import { withCookies } from 'react-cookie';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Background from './../../images/LoginPage.png';
const useStyles = theme => ({
  root: {
    height: '100vh'
  },
  image: {
    backgroundImage: `url(${Background})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
});

class Wrapper extends Component {
  state = {
    isLoggedIn: false,
    justLogged: false,
    user: null
  };

  checkIsLoggedIn = () => {
    const cookies = this.props.cookies.cookies;
    this.setState({
      user: cookies.userData,
      isLoggedIn: cookies.isLoggedIn
    });
  };
  componentDidMount = () => {
    this.checkIsLoggedIn();
  };
  successResponseGoogle = response => {
    console.log(response);
    const emailUsed = response.profileObj.email;
    const index = emailUsed.indexOf('@');
    const domain = emailUsed.substr(index);
    // this.setState({
    //   user: response.profileObj.name,
    //   email: response.profileObj.email
    // });

    if (domain !== '@iitbbs.ac.in') {
      alert('Use your iit bbs email id');
      return false;
    } else {
      // console.log(response.tokenId);
      // this.setState({ isLoggedIn: true });
      // this.props.callFunc();
      axios
        .post(
          '/api/v1/auth/login',
          { tokenId: response.tokenId },
          {
            withCredentials: true
          }
        )
        .then(response => {
          console.log('login');
          console.log(response.data);
          this.setState({ user: response.data.user });
          this.setState({ isLoggedIn: true });
          const userData = {
            name: response.data.user.name,
            email: response.data.user.email,
            role: response.data.user.role,
            image: response.data.user.image
          };
          console.log(typeof new Date(response.data.expireAt));
          const cookies = this.props.cookies;
          cookies.set('userData', userData, {
            path: '/',
            expires: new Date(response.data.expireAt)
          });
          cookies.set('isLoggedIn', true, {
            path: '/',
            expires: new Date(response.data.expireAt)
          });
          // console.log(this.state.user);
        })
        .catch(err => console.log(err));
    }
  };
  failureResponseGoogle = response => {
    console.log(response);
    alert('Use your IIT BBS email for login');
  };

  render() {
    const { classes } = this.props;
    console.log(this.state.isLoggedIn);
    return (
      <div>
        {this.state.isLoggedIn ? (
          <Layout user={this.state.user} cookies={this.props.cookies} />
        ) : (
          <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid
              item
              xs={12}
              sm={8}
              md={5}
              component={Paper}
              elevation={6}
              square
            >
              <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
                <form className={classes.form} noValidate>
                  <GoogleLogin
                    className="google-login"
                    clientId="1092979243632-ufl3842hjal4adoaio73ta2noj2avnbo.apps.googleusercontent.com"
                    buttonText="Login with Google"
                    isSignedIn={true}
                    onSuccess={this.successResponseGoogle}
                    onFailure={this.failureResponseGoogle}
                    cookiePolicy={'single_host_origin'}
                    icon={false}
                    theme="dark"
                  />
                </form>
              </div>
            </Grid>
          </Grid>
        )}
      </div>
    );
  }
}

export default withStyles(useStyles)(withCookies(Wrapper));
