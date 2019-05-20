import React, { Component } from 'react'
import { Redirect } from 'react-router';
import 'src/styles/RegLog.css'
import 'src/styles/Root.scss'

import { jsxAttribute } from '@babel/types';

import 'src/components/container/RegLogContainer'
import RegLogContainer from 'src/components/container/RegLogContainer';

interface State{

}

interface Props{
  history: History
}

export default class Register extends Component<Props, State> {
  constructor(props: Props){
    super(props)

  }

  render() {

    document.title = 'Register'

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
        <RegLogContainer view='reg' history={this.props.history}/>
      </div>
    )
  }
}
