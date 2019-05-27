import React, { Component } from 'react'

import 'src/styles/container/reg-log-left/RegLogLeft.scss'
import 'bootstrap/dist/css/bootstrap.css';
import RegisterForm from './form/RegisterForm';
import LoginForm from './form/LoginForm';

interface State{

}

interface Props{
    view: string
    history: History
}

export default class RegLogLeft extends Component<Props, State> {
    render() {
        const {view} = this.props
        const {history} = this.props
        var form = (view==="reg")?<RegisterForm history={history}/>:(view==="log")?<LoginForm history={history}/>:null
        return (
            <div id="reg-log-left" className="col-md-9">
                <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                        <h3 className="reg-log-heading">{(view==="reg")?"فرم ثبت نام":(view==="log")?"ورود":null}</h3>
                        {form}
                    </div>
                </div>
            </div>
        )
    }
}
