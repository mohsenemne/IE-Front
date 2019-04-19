import React, { Component } from 'react'
import 'src/styles/navigator/Navigator.scss'

export default class Navigator extends Component {
  render() {
    return (
    <nav id="top-bar">
        <div> <img src="../assets/logo/logo v1.png" /> </div>
        <div id="links">
            <a href="../profile/index.html"><p> حساب کاربری </p></a>
            <a><p> خروج </p></a>
        </div>
    </nav>
    )
  }
}
