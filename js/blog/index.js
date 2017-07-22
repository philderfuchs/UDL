import React from "react";
import ReactDOM from "react-dom";
import {HashRouter as Router, Switch, Route, Link} from 'react-router-dom'


import Overview from './components/Overview';
import FullArticle from './components/FullArticle';

$(() => {

    $.get("https://udl.cloudno.de/articles", function(articles) {

        ReactDOM.render(
            <Router>
                <div class="row">
                    <div class="col-xs-12 caption">
                        <h1> Blog </h1>
                    </div>
                    <Switch>
                        <Route exact path="/" component={(props) => <Overview {...props} articles={articles}/>}/>
                        <Route exact path="/article/:article"
                               component={(props) => <FullArticle {...props} articles={articles}/>}/>
                    </Switch>
                </div>
            </Router>,

            $('#blogcontainer')[0]);
    })


    }
);