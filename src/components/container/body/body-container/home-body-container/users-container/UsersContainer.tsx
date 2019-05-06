import React, { Component } from 'react'
import 'src/styles/container/body/body-container/home-body-container/users-container/UsersContainer.scss'
import User from './user/User'

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
        
        fetch(new Request('http://localhost:8080/search/users?key='+searchKey, {method: 'GET'}))
            .then(response => {
                if (response.ok) return response.json();
                    return console.error();
            })
            .then((response:[]) => {
                this.setState({users: response});
            });
    }

    render() {
        const users = this.state? this.state.users : this.props.users;
        const usersJSX = users.map((u:object) => {
            let user = JSON.parse(JSON.stringify(u));
            return <User key={user.username} user={{name: user.name, jobTitle: user.jobTitle, id: user.username}}/>
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
