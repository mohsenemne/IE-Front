import React, { Component } from 'react'
import 'src/fonts/iransans-fonts/fonts.css'
import 'src/styles/Root.scss'

import Navigator from 'src/components/navigator/Navigator';
import Container from 'src/components/container/Container';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface Props {}
interface State {
  projects: [],
  users: []
}

class Home extends Component<Props, State> {
  constructor(props : Props){
    super(props);
    this.state = {projects: [], users: []}
  }

  componentDidMount() {
    var jwt = localStorage.getItem('joboonja-jwt')
    if(jwt == null){
      document.getElementById('redirect-to-login')!.click()
      return
    }

    var setState = this.setState.bind(this)

    axios.get('http://localhost:8080/projects', {headers:{Authorization:jwt!}})
    .then(function (response){
      setState({projects: response.data});
    })
    .catch(function (error){
      if(error.response.status == 401 || error.response.status == 403){
        localStorage.removeItem('joboonja-jwt')
        alert("خطا در احراز هویت!")
        document.getElementById("redirect-to-login")!.click()
      }
    })

    axios.get('http://localhost:8080/users', {headers:{Authorization:jwt!}})
    .then(function (response){
      setState({users: response.data});
    })
    .catch(function (error){
      if(error.response.status == 401 || error.response.status == 403){
        localStorage.removeItem('joboonja-jwt')
        alert("خطا در احراز هویت!")
        document.getElementById("redirect-to-login")!.click()
      }
    })
  }

  render() {
    const projectsJSX = this.state.projects.map((p:any) => {
      return <div key={JSON.parse(JSON.stringify(p)).id} id={JSON.parse(JSON.stringify(p)).id}> {JSON.parse(JSON.stringify(p)).id} </div>
    });

    
    const usersJSX = this.state.users.map((u:any) => {
      return <div key={u["username"]} id={u["username"]}> {u["username"]} </div>
    });
    
    document.title = 'Home'

    const {projects} = this.state
    const {users} = this.state

    return (
      <div id='root'>
        <Navigator/>
        <Container view='home' users={users} projects={projects} />
        <Link id='redirect-to-login' to='/login' />
      </div>
    );
  }
}

export default Home;