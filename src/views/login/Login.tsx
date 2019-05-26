import React, { Component } from 'react'
import axios from 'axios';
import RegLogContainer from 'src/components/container/RegLogContainer';

import 'src/styles/RegLog.css'
import 'src/styles/Root.scss'

interface State{

}
interface Props{
  history: History
}

export default class Login extends Component<Props, State> {
  constructor(props: Props){
    super(props)
  }
  
  render() {
    console.log("login")
    document.title = 'Login'

    var slideshow : JSX.Element = <ul className="slideshow">
                                    <li><span>Image 02</span></li>
                                    <li><span>Image 03</span></li>
                                    <li><span>Image 04</span></li>
                                    <li><span>Image 05</span></li>
                                    <li><span>Image 06</span></li>
                                  </ul>
    
    return (
      <div id="root" className="reg-log-root">
        {slideshow}
        <RegLogContainer view='log' history={this.props.history}/>
      </div>
    )
  }
}
