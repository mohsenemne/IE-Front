import React, { Component } from 'react'
import 'src/styles/navigator/Navigator.scss'
import { Link } from 'react-router-dom';
import { existsTypeAnnotation } from '@babel/types';

export default class Navigator extends Component {
  deleteJWT(){
    localStorage.removeItem('joboonja-jwt')
    document.getElementById('redirect-to-login')!.click()
  }
  render() {

    return (
    <nav id="top-bar">
        <Link to="/" id="logo"> <img src={require('src/images/logo/logo v1.png')}/> </Link>
        <div id="links">
            <Link to="/users/1" id="profile"><p> حساب کاربری </p></Link>
            <a id="exit" onClick={this.deleteJWT}><p> خروج </p></a>
            <Link id='redirect-to-login' to='/login'/>
        </div>
    </nav>
    )
  }
}
