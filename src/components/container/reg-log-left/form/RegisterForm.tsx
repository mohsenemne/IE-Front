import React, { Component } from 'react'

import 'src/styles/container/reg-log-left/form/RegisterForm.scss'
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface UserInfo{
    firstName: string
    lastName: string
    jobTitle: string
    bio: string
    username: string
    password: string
    profilePictureURL: string
}

interface State{
    passEq: boolean
}

interface Props{
    history: History
}

export default class RegisterForm extends Component<Props, State> {
    constructor(props: Props){
        super(props)

        this.setState({passEq: true})
    }

    checkPasswordsEquality(){
        var passInput = (document.getElementById('password-input')! as HTMLInputElement)
        var repassInput = (document.getElementById('repeat-password-input')! as HTMLInputElement)
        var pass = passInput.value
        var repass = repassInput.value

        if(pass == repass){
            passInput.style.borderColor = ''
            repassInput.style.borderColor = ''
            this.setState({passEq: true})
        }
        else{
            passInput.style.borderColor = 'red'
            repassInput.style.borderColor = 'red'
            this.setState({passEq: false})
        }
        
    }

    register(user: UserInfo){
        let forceUpdate = this.forceUpdate.bind(this)
        console.log('sdfd')
        axios.post('http://spring-app:8080/register', user)
          .then(function (response) {
            const {status} = response
            if(status == 200){
                const {data} = response
                if(data == true){
                    alert('ثبت‌نام شما با موفقیت انجام شد.')
                    document.getElementById('redirect-to-login')!.click()
                }
                else{
                    alert('نام کاربری قبلا استفاده شده‌است.')
                }
            }
            else{
                alert('خطا در ثبت‌نام!')
            }
          })
          .catch(function (error) {
            alert('ختا در شبکه!')
            console.log(error);
          });
        return false
    }

    submitForm(e : React.FormEvent<HTMLFormElement>){
        if(!this.state.passEq){
            e.preventDefault()
            return
        }

        var firstName = (document.getElementById('firstName-input')! as HTMLInputElement).value
        var lastName = (document.getElementById('lastName-input')! as HTMLInputElement).value
        var job = (document.getElementById('job-input')! as HTMLInputElement).value
        var bio = (document.getElementById('bio-input')! as HTMLInputElement).value
        var username = (document.getElementById('username-input')! as HTMLInputElement).value
        var pass = (document.getElementById('password-input')! as HTMLInputElement).value
        var repass = (document.getElementById('repeat-password-input')! as HTMLInputElement).value
        var imgLink = (document.getElementById('imgLink-input')! as HTMLInputElement).value
        
        let user : UserInfo = {firstName: firstName,lastName: lastName, jobTitle: job, bio: bio, username: username, password: pass, profilePictureURL: imgLink}

        this.register(user)
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
                    <div id="firstName" className="form-group">
                        <input id="firstName-input" type="text" className="form-control" placeholder="نام *" tabIndex={1} required/>
                    </div>
                    <div id="lastName" className="form-group">
                        <input id="lastName-input" type="text" className="form-control" placeholder="نام خانوادگی *" tabIndex={2} required/>
                    </div>
                    <div id="job" className="form-group">
                        <input id="job-input" type="text" className="form-control" placeholder="عنوان شغلی" tabIndex={3}/>
                    </div>
                    <div id="bio" className="form-group">
                        <input id="bio-input" type="text"  className="form-control" placeholder="بیو" tabIndex={4}/>
                    </div>
                </div>
                <div className="col-md-6 form-left">
                    <div id="username" className="form-group">
                        <input id="username-input" type="text" className="form-control"  placeholder="نام کاربری *" tabIndex={5} required/>
                    </div>
                    <div id="pass" className="form-group">
                        <input id="password-input" type="password" minLength={8} className="form-control" placeholder="رمز عبور * " onChange={this.checkPasswordsEquality.bind(this)} tabIndex={6} required/>
                    </div>
                    <div id="repass" className="form-group">
                        <input id="repeat-password-input" type="password" minLength={8} className="form-control" placeholder="تکرار رمز عبور *" onChange={this.checkPasswordsEquality.bind(this)} tabIndex={7} required/>
                    </div>
                    <div id="imgLink" className="form-group">
                        <input id="imgLink-input" type="text"  className="form-control" placeholder="لینک عکس پروفایل" tabIndex={8}/>
                    </div>
                    <input type="submit" className="reg-log-btn" value="ثبت نام" tabIndex={9}/>
                </div>
                <Link id='redirect-to-login' to='/login'></Link>
                <Link id='redirect-to-home' to='/'></Link>
            </form>
        )
    }
}
