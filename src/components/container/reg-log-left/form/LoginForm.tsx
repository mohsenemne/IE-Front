import React, { Component } from 'react'

import 'src/styles/container/reg-log-left/form/LoginForm.scss'
import { Link } from 'react-router-dom';
import axios from 'axios';

interface UserInfo{
    username: string
    password: string
}

interface State{

}

interface Props{
    history: History
}

export default class LoginForm extends Component<Props, State> {
    login(user: UserInfo){
        axios.post('http://localhost:8080/login', user)
          .then(function (response) {
            const {status} = response
            if(status === 200){
                const {data} = response
                localStorage.setItem('joboonja-jwt', data)
                document.getElementById('redirect-to-home')!.click()
            }
          })
          .catch(function (error) {
            if(error.response.status === 403){
                alert('نام کاربری یا رمز عبور اشتباه است.')
            }
            else{
                alert('خطا در شبکه!')
            }
          });
    }

    submitForm(e : React.FormEvent<HTMLFormElement>){
        var username = (document.getElementById('username-input')! as HTMLInputElement).value
        var pass = (document.getElementById('password-input')! as HTMLInputElement).value
        
        let user : UserInfo = {username: username, password: pass}

        this.login(user)

        e.preventDefault()
    }

    componentDidMount(){
        var jwt = localStorage.getItem('joboonja-jwt')
        if(jwt == null){
            return
        }
        else{
            // if valid
            document.getElementById('redirect-to-home')!.click()
        }
    }

    render() {
        return (
            <form id="reg-log-form" className="row" onSubmit={e => this.submitForm(e)}>
                <div className="col-md-6 form-right">
                    <div id="username" className="form-group">
                        <input id="username-input" type="text" className="form-control" placeholder="نام کاربری * " required/>
                    </div>
                    <div id="password" className="form-group">
                        <input id="password-input" type="password" className="form-control" placeholder="رمزعبور *" required/>
                    </div>
                    <input type="submit" className="reg-log-btn" value="ورود"/>
                    <p>تمامی حقوق این سایت متعلق به جاب‌اونجا می‌باشد</p>
                </div>
                <div className="col-md-6 form-left">
                    <img src={require('src/images/logo/login.jpg')}></img>
                </div>
                <Link id='redirect-to-home' to='/'></Link>
            </form>
        )
    }
}
