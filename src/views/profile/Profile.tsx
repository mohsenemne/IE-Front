import React, { Component } from 'react'
import 'src/styles/Root.scss'
import 'src/fonts/iransans-fonts/fonts.css'

import Navigator from 'src/components/navigator/Navigator';
import Container from 'src/components/container/Container';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface State {
  username : string
  firstName : string
  lastName : string
  password: string
  jobTitle : string
  profilePictureURL: string
  skills : []
  bio : string  
}

export default class User extends Component<any, State>{
  constructor(props : any){
    super(props);
  }

  componentDidMount() {
    var jwt = localStorage.getItem('joboonja-jwt')
    if(jwt == null){
      document.getElementById('redirect-to-login')!.click()
    }

    const {username} = this.props.match.params
    var setState = this.setState.bind(this)
    axios.get('http://localhost:8080/users/'+username, {headers:{Authorization:jwt!}})
    .then(function (response){
      setState(response.data);
    })
    .catch(function (error){
      if(error.response.status == 401 || error.response.status == 403){
        localStorage.removeItem('joboonja-jwt')
        alert("خطا در احراز هویت!")
        document.getElementById("redirect-to-login")!.click()
      }
    });
  }
  render() {
    const {state} = this
    if(this.state)
      document.title = state.firstName + ' ' + state.lastName
    else
      return <div><Link id='redirect-to-login' to='/login'/></div>

    return (
      <div id='root'>
        <Navigator/>
        <Container view='profile' user={state} />
        <Link id='redirect-to-login' to='/login'/>
      </div>
    )
  }
}
