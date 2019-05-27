import React, { Component } from 'react'
import 'src/styles/container/body/body-container/home-body-container/projects-container/ProjectsContainer.scss'
import Project from './project/Project'
import { ProjectInfo } from 'src/interface/inteface';

interface Props{
    projects: ProjectInfo[]
}

interface State{
    
}

export default class ProjectsContainer extends Component<Props, State> {
    render() {
        const {projects} = this.props;
        const projectsJSX = projects.map((p:object) => {
            let project = JSON.parse(JSON.stringify(p));
            return <Project key={project.id} project={project}/>
          });
        return (
            <div id='projects-container'>
                {projectsJSX}
            </div>
        )
    }
}
