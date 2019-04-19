import React, { Component } from 'react'

// interface Props {
//   projectID : string;
// }

// interface State {
  
// }

export default class Project extends Component {
  constructor(props : any){
    super(props);
  }
  render() {

    console.log(this.props.match.params)
    return (
      <div>
        
      </div>
    )
  }
}
