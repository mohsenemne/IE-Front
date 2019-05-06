import React, { Component } from 'react'
import 'src/styles/navigator/Navigator.scss'
import { Link } from 'react-router-dom';

export default class Navigator extends Component {
  render() {
    return (
    <nav id="top-bar">
        <Link to="/" id="logo"> <img src={require('src/images/logo/logo v1.png')}/> </Link>
        <div id="links">
            <Link to="/users/1" id="profile"><p> حساب کاربری </p></Link>
            <a id="exit"><p> خروج </p></a>
        </div>
    </nav>
    )
  }
}
