import React, { Component } from 'react';
import {
  Box,
  Container,
  withStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Results from './Results';
import Toolbar from './Toolbar';
import data from './data';
import axios from 'axios';
const useStyles = (theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
});

class CustomerListView extends Component {
  
  state = {
    users : [],
    tags:[],
    isLoading:false,
  }
  getAllUsers = () =>{
    this.setState({isLoading:true});
    axios.get('/v1/user',{
      withCredentials : true
    }).then(response=>{
      this.setState({users:response.data.data.docs,isLoading:false});
    }).catch(err=>{
      this.setState({users:data,isLoading : false});
    })
  }
  getAllTags = () =>{
    this.setState({isLoading:true});
    axios.get('/v1/user/tag',{
      withCredentials : true
    }).then(response=>{
      this.setState({tags:response.data.data.docs,isLoading:false});
    }).catch(err=>{
      this.setState({tags:data,isLoading : false});
    })
  }
  
  
  componentDidMount = ()=>{
     this.getAllUsers();
     this.getAllTags();
  } 
  render(){
  const {classes} = this.props;

  return (
    <div>
    {!this.state.isLoading?(
    <Page
      className={classes.root}
      title="Discover"
    >
      <Container maxWidth={false}>
        <Toolbar />
        <Box mt={3}>
          <Results customers={this.state.users} tags = {this.state.tags} />
        </Box>
      </Container>
    </Page>) : null}
    </div>
  );
  
};
};
export default withStyles(useStyles)(CustomerListView);

