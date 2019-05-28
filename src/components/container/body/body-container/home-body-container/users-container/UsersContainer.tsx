import React, { Component } from 'react'
import 'src/styles/container/body/body-container/home-body-container/users-container/UsersContainer.scss'
import User from './user/User'
import axios from 'axios';

interface Props{
    users:[]
}

interface State{
    users:[]
}

export default class UsersContainer extends Component<Props, State> {
    constructor(props : Props){
        super(props);
        this.setState({users: this.props.users})
    }
    
    updateUsers(e: React.ChangeEvent<HTMLInputElement>){
        let searchKey = e.target.value
        
        var jwt = localStorage.getItem('joboonja-jwt')

        var setState = this.setState.bind(this)
        axios.get('http://spring-app:8080/search/users?key='+searchKey, {headers:{Authorization:jwt!}})
        .then(function (response){
            setState({users: response.data});
        })
        .catch(function (error){
            console.log(error)
        })
    }

    render() {
        const users = this.state? this.state.users : this.props.users;
        const usersJSX = users.map((u:object) => {
            let user = JSON.parse(JSON.stringify(u));
            return <User key={user.username} user={{name: user.name, jobTitle: user.jobTitle, username: user.username, profilePictureURL: user.profilePictureURL}}/>
          });
        return (
            <div id='users-container'>
                <div id="search-user">
                    <input type="text" placeholder="جستحوی نام کاربر" onChange={e => this.updateUsers(e)}/>
                </div>
                {usersJSX}
            </div>
        )
    }
}
