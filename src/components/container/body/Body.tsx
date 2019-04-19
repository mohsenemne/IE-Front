import React, { Component } from 'react'
import 'src/styles/container/body/Body.scss'
import HomeBodyContainer from './body-container/home-body-container/HomeBodyContainer'

interface Props{
    view: string;
    projects?: [];
    users?: [];

}
interface State{

}
export default class Body extends Component<Props, State> {
    constructor(props : Props){
        super(props);
    }
    render() {
        let bodyContainer:JSX.Element = <div>salm</div>;
        const {view} = this.props;
        const {projects} = this.props;
        const {users} = this.props;

        switch(view) {
            case 'home':
                if(projects && users)
                    bodyContainer = <HomeBodyContainer projects={projects} users={users}/>;
                break;
            case 'login':
                // code block
                break;
            case 'profile':
                // code block
                break;
            case 'project':
                // code block
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
