import React, { Component } from 'react'
import 'src/styles/container/body/body-container/home-body-container/HomeBodyContainer.scss'
import ProjectsContainer from './projects-container/ProjectsContainer'
import UsersContainer from './users-container/UsersContainer'

import {ProjectInfo} from 'src/interface/inteface'

interface Props{
    projects: ProjectInfo[];
    users: [];

}
interface State{
    
}



export default class HomeBodyContainer extends Component<Props, State> {
    constructor(props : Props){
        super(props);
    }
    render() {
        const {projects} = this.props
        const {users} = this.props
        return (
            <div id='body-container'>
            <ProjectsContainer projects={projects}/>
            <UsersContainer users={users}/>
            </div>
        )
  }
}
