import React, { Component } from 'react'
import 'src/styles/container/Container.scss'
import Body from 'src/components/container/body/Body'
import TopBlue from 'src/components/container/top-blue/TopBlue'
import Footer from 'src/components/container/footer/Footer'

import {ProjectInfo} from 'src/interface/inteface'
// export ProjectInfo

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
    projects?: ProjectInfo[]
}

export default class Container extends Component<Props, State> {
    constructor(props : Props){
        super(props);
        this.setState({projects: this.props.projects})
        console.log(this.state)
    }

    updateProjects(projects: ProjectInfo[]){
        this.setState({projects: projects})
    }

    render() {
        let body:JSX.Element = <div>salm</div>;
        const {view} = this.props;
        const {projects} = this.props;
        const {users} = this.props;
        const {project} = this.props;
        const {user} = this.props;
        
        switch(view) {
            case 'home':
                if(projects && users){  
                    if(this.state)
                        body = <Body view={view} projects={this.state.projects} users={users}/>;
                    else
                        body = body = <Body view={view} projects={projects} users={users}/>;
                }
                break;
            case 'login':
                // code block
                break;
            case 'profile':
                if(user)
                    body = <Body view={view} user={user}/>;
                break;
            case 'project':
                if(project)
                    body = <Body view={view} project={project}/>;
            break;
                break;
            case 'register':
                // code block
                break;              
            default:
              // code block
        }
    
        return (
        <div id='container'>
            <div id='fixer'></div>
            <TopBlue view={view} updateProjects ={this.updateProjects.bind(this)}/>
            {body}
            <Footer/>
        </div>
        )
    }
}
