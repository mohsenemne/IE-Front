import React, { Component } from 'react'
import 'src/styles/container/body/body-container/home-body-container/users-container/UsersContainer.scss'
import User from './user/User'

interface Props{
    users:[]
}

interface State{
    
}

export default class UsersContainer extends Component<Props, State> {
    constructor(props : Props){
        super(props);
    }    
    render() {
        const {users} = this.props;
        const usersJSX = users.map((u:object) => {
            console.log(u);
            let user = JSON.parse(JSON.stringify(u));
            return <User key={user.username} user={{name: user.name, jobTitle: user.jobTitle}}/>
          });
        return (
            <div id='users-container'>
                <div id="search-user">
                    <input type="text" placeholder="جستحوی نام کاربر"/>
                </div>
                {usersJSX}
            </div>
        )
    }
}
