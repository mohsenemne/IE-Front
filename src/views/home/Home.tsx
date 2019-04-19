import React, { Component } from 'react';
import 'src/styles/Home.scss';
import Navigator from 'src/components/navigator/Navigator';
import Container from 'src/components/container/Container';
import { stat } from 'fs';

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

  componentWillMount() {
    fetch(new Request('http://localhost:8080/projects', {method: 'GET'}))
      .then(response => {
        if (response.ok) return response.json();
        return console.error();
      })
      .then((response:[]) => {
        this.setState({projects: response});
    });

    fetch(new Request('http://localhost:8080/users', {method: 'GET'}))
      .then(response => {
        if (response.ok) return response.json();
        return console.error();
      })
      .then((response:[]) => {
        this.setState({users: response});
    });
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
      </div>
    );
  }
}

export default Home;