import React, { Component } from 'react'

import 'src/styles/container/reg-log-right/RegLogRight.scss'
import 'bootstrap/dist/css/bootstrap.css';

import { Link } from 'react-router-dom';

interface State{

}

interface Props{
    view: string
}

export default class RegLogRight extends Component<Props, State> {
    constructor(props: Props){
        super(props)
    }
    render() {
        const {view} = this.props
        var btnMsg = (view == "log")?"ثبت‌نام کنید!":(view == "reg")?"ورود!":null;
        var pMsg = (view == "reg")?"در صورتی که قبلا ثبت نام کرده اید، وارد شوید":null;
        var link = (view == "reg")?"/login":(view == "log")?"/register":null;
        return (
            <div id="reg-log-right" className="col-md-3">
                <img src={require('src/images/logo/logo v1.png')}/>
                <h3>خوش آمدید!</h3>
                <p>{pMsg}</p>
                <Link to={link!} className="reg-log-btn">{btnMsg}</Link>
                <br/>
            </div>
        )
    }
}
