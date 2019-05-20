import React, { Component } from 'react'
import 'src/styles/Root.scss'
import 'src/fonts/iransans-fonts/fonts.css'

import Navigator from 'src/components/navigator/Navigator';
import Container from 'src/components/container/Container';
import { ProjectInfo } from 'src/interface/inteface';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface State {
  project: ProjectInfo
}

export default class Project extends Component<any, State>{
  constructor(props : any){
    super(props);
  }

  componentDidMount() {
    var jwt = localStorage.getItem('joboonja-jwt')
    if(jwt == null){
      document.getElementById('redirect-to-login')!.click()
    }
    else{
      // if invalid redirect
      
    }
    const {projectId} = this.props.match.params
    var setState = this.setState.bind(this)
    axios.get('http://localhost:8080/projects/'+projectId, {headers:{Authorization:jwt!}})
    .then(function (response){
      setState({project: response.data});
    })
    .catch(function (error){
      console.log(error)
    });
  }

  render() {
    if(this.state)
      document.title = this.state.project.title
    else
      return (<div><Link id='redirect-to-login' to='/login' /></div>)
    const {project} = this.state
    
    return (
      <div id='root'>
        <Navigator/>
        <Container view='project' project={project} />
        <Link id='redirect-to-login' to='/login' />
      </div>
    )
  }
}
