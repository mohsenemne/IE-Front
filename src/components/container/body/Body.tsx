import React, { Component } from 'react'
import 'src/styles/container/body/Body.scss'
import HomeBodyContainer from './body-container/home-body-container/HomeBodyContainer'
import ProjectBodyContainer from './body-container/project-body-container/ProjectBodyContainer'
import ProfileBodyContainer from './body-container/profile-body-container/ProfileBodyContainer'

import {ProjectInfo} from 'src/interface/inteface'

interface UserInfo {
    username : string
    firstName : string
    lastName : string
    jobTitle : string
    skills : []
    bio : string  
}

interface Props{
    view: string;
    projects?: ProjectInfo[];
    users?: [];
    project?: ProjectInfo;
    user?: UserInfo;
}
interface State{

}

export default class Body extends Component<Props, State> {
    constructor(props : Props){
        super(props);
    }
    render() {
        let bodyContainer:JSX.Element = <div></div>;
        const {view} = this.props;
        const {projects} = this.props;
        const {users} = this.props;
        const {project} = this.props;
        const {user} = this.props;

        switch(view) {
            case 'home':
                if(projects && users)
                    bodyContainer = <HomeBodyContainer projects={projects} users={users}/>;
                break;
            case 'login':
                // code block
                break;
            case 'profile':
                if(user)
                    bodyContainer = <ProfileBodyContainer user={user}/>;
                break;
            case 'project':
                if(project)
                    bodyContainer = <ProjectBodyContainer project={project}/>;
                break;
            case 'register':
                // code block
                break;              
            default:
              // code block
          }
        return (
        <div id='body'>
            {bodyContainer}
        </div>
        )
    }
}
