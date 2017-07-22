import React from "react";
import ReactDOM from "react-dom";
import {HashRouter as Router, Switch, Route, Link} from 'react-router-dom'

import Articles from './resources/articles';

import Overview from './components/Overview';
import FullArticle from './components/FullArticle';

$(() => {
        ReactDOM.render(
            <Router>
                <div class="row">
                    <div class="col-xs-12">
                        <h1 class="caption"> Blog </h1>
                    </div>
                    <Switch>
                        <Route exact path="/" component={(props) => <Overview {...props} articles={Articles}/>}/>
                        <Route exact path="/article/:article"
                               component={(props) => <FullArticle {...props} articles={Articles}/>}/>
                    </Switch>
                </div>
            </Router>,

            $('#blogcontainer')[0]);
    }
);