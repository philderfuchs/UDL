import React from 'react';

import Articles from '../resources/articles';

import Overview from './Overview';
import FullArticle from './FullArticle';

import {HashRouter as Router, Switch, Route, Link} from 'react-router-dom'

export default class Layout extends React.Component {

    render() {
        return (
            <Router>
                <div>

                    {/*<Link to="/headi2/somearticle" activeStyle={{color: 'red'}} activeClassName="active">link</Link>*/}

                    <Switch>
                        <Route exact path="/" component={(props) => <Overview {...props} articles={Articles}/>}/>
                        <Route exact path="/article/:article" component={(props) => <FullArticle {...props} articles={Articles}/>}/>
                    </Switch>

                </div>

            </Router>
        )
    }

}