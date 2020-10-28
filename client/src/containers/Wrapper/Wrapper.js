import React, { Component } from 'react';
import Layout from './../../layouts/Layout';
import GoogleLogin from 'react-google-login';
import axios from 'axios';

class Wrapper extends Component {
  state = {
    isLoggedIn: false,
    user: null
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
          '/v1/auth/login',
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
    return (
      <div>
        {this.state.isLoggedIn ? (
          <Layout user={this.state.user} />
        ) : (
          <GoogleLogin
            className="google-login"
            clientId={process.env.REACT_APP_CLIENT_ID}
            buttonText="Login with Google"
            isSignedIn={true}
            onSuccess={this.successResponseGoogle}
            onFailure={this.failureResponseGoogle}
            cookiePolicy={'single_host_origin'}
            icon={false}
            theme="dark"
          />
        )}
      </div>
    );
  }
}

export default Wrapper;
