import React, { Component } from 'react'
import 'src/styles/Root.scss'
import 'src/fonts/iransans-fonts/fonts.css'

import Navigator from 'src/components/navigator/Navigator';
import Container from 'src/components/container/Container';

interface State {
  budget: number
  deadline: number
  description: string
  id: string
  imageURL: string
  skills: []
  title: string
  winner: {name: string}
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
      }).then((response:object) => {
        this.setState(response);
    });
  }
  render() {
    return (
      <div id='root'>
        <Navigator/>
        <Container view='project' project={this.state} />
      </div>
    )
  }
}
