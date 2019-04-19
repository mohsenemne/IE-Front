import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import Home from './views/home/Home';
import Project from './views/project/Project';

import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

ReactDOM.render(
    <Router>
        <Route exact path='/' component={Home} />
        <Route exact path='/projects/:id' component={Project}/>
        {/* <Route /> */}
        {/* <Route /> */}
    </Router>, 
    document.getElementsByTagName('body')[0]
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
