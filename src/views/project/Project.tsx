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
  componentDidMount() {
    var jwt = localStorage.getItem('joboonja-jwt')
    if(jwt == null){
      document.getElementById('redirect-to-login')!.click()
    }
    
    const {projectId} = this.props.match.params
    var setState = this.setState.bind(this)
    axios.get('http://spring-app:8080/projects/'+projectId, {headers:{Authorization:jwt!}})
    .then(function (response){
      setState({project: response.data});
    })
    .catch(function (error){
      if(error.response.status === 401 || error.response.status === 403){
        localStorage.removeItem('joboonja-jwt')
        alert("خطا در احراز هویت!")
        document.getElementById("redirect-to-login")!.click()
      }
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
