import React, { Component } from 'react'
import 'src/styles/Root.scss'
import 'src/fonts/iransans-fonts/fonts.css'

import Navigator from 'src/components/navigator/Navigator';
import Container from 'src/components/container/Container';
import { ProjectInfo } from 'src/interface/inteface';

interface State {
  project: ProjectInfo
}

export default class Project extends Component<any, State>{
  constructor(props : any){
    super(props);
  }

  componentWillMount() {
    const {projectId} = this.props.match.params
    
    fetch(new Request('http://localhost:8080/projects/'+projectId, {method: 'GET'}))
      .then(response => {
        if (response.ok) {
          return response.json();
        }
          return console.error();
      }).then((response:ProjectInfo) => {
        this.setState({project: response});
    });
  }
  render() {
    if(this.state)
      document.title = this.state.project.title
    else
      return (<div></div>)
    const {project} = this.state
    
    return (
      <div id='root'>
        <Navigator/>
        <Container view='project' project={project} />
      </div>
    )
  }
}
