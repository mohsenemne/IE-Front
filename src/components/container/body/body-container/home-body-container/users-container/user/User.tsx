import React, { Component } from 'react'
import 'src/styles/container/body/body-container/home-body-container/users-container/user/User.scss'

interface UserInfo{
    jobTitle: string
    name: string
    id: string
}

interface Props{
    user: UserInfo;
}

interface State{

}

export default class User extends Component<Props, State> {
    constructor(props : Props){
        super(props)
    }    
    render() {
        const {user} = this.props;
        return (
        <a href={'http://127.0.0.1:3000/users/'+user.id} >
            <div className="user">
                <div className="image">
                    <img src="../assets/pics/project.png"/>
                </div>
                <div className="details">
                    <p className="name"> {user.name} </p>
                    <p className="status"> {user.jobTitle} </p>
                </div>
            </div>
        </a>
        )
    }
}
