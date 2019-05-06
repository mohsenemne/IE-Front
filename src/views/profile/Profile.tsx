import React, { Component } from 'react'
import 'src/styles/Root.scss'
import 'src/fonts/iransans-fonts/fonts.css'

import Navigator from 'src/components/navigator/Navigator';
import Container from 'src/components/container/Container';

interface State {
  username : string
  firstName : string
  lastName : string
  jobTitle : string
  skills : []
  bio : string  
}

export default class User extends Component<any, State>{
  constructor(props : any){
    super(props);
  }

  componentWillMount() {
    const {username} = this.props.match.params
    
    fetch(new Request('http://localhost:8080/users/'+username, {method: 'GET'}))
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
    const {state} = this
    if(this.state)
      document.title = state.firstName + ' ' + state.lastName

    return (
      <div id='root'>
        <Navigator/>
        <Container view='profile' user={state} />
      </div>
    )
  }
}
