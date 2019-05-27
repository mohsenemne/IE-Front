import React, { Component } from 'react'
import 'src/styles/container/body/body-container/home-body-container/users-container/user/User.scss'
import { Link } from 'react-router-dom';

interface UserInfo{
    jobTitle: string
    name: string
    username: string
    profilePictureURL: string
}

interface Props{
    user: UserInfo;
}

interface State{

}

export default class User extends Component<Props, State> {
    render() {
        const {user} = this.props;
        return (
        <Link to={"/users/"+user.username} >
            <div className="user">
                <div className="image">
                    <img src={user.profilePictureURL}/>
                </div>
                <div className="details">
                    <p className="name"> {user.name} </p>
                    <p className="status"> {user.jobTitle} </p>
                </div>
            </div>
        </Link>
        )
    }
}
