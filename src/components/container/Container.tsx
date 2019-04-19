import React, { Component } from 'react'
import 'src/styles/container/Container.scss'
import Body from 'src/components/container/body/Body'
import TopBlue from 'src/components/container/top-blue/TopBlue'

interface Props{
    view: string;
    projects?: [];
    users?: [];

}
interface State{

}

export default class Container extends Component<Props, State> {
    constructor(props : Props){
        super(props);
    }
    render() {
        const {view} = this.props;
        const {projects} = this.props;
        const {users} = this.props;
    
        return (
        <div id='container'>
            <div id='fixer'></div>
            <TopBlue view='home'/>
            <Body view={view} projects={projects} users={users}/>
        </div>
        )
    }
}
