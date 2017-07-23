import React from "react";
import ReactDOM from "react-dom";
import {HashRouter as Router, Switch, Route, Link} from 'react-router-dom'

import ArticleService from './components/ArticleService';

import Overview from './components/Overview';
import FullArticle from './components/FullArticle';

$(() => {


        ReactDOM.render(
            <Router>
                <div>
                    <div class="container">
                        <div class="row">
                            <div class="col-xs-12 caption">
                                <h1> Blog </h1>
                            </div>
                        </div>
                    </div>
                    <Switch>
                        <Route exact path="/" component={(props) => <Overview {...props} service={ArticleService}/>}/>
                        <Route exact path="/article/:article"
                               component={(props) => <FullArticle {...props} service={ArticleService}/>}/>
                    </Switch>
                </div>
            </Router>,

            $('#blogcontainer')[0]);


    }
);