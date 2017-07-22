import React from 'react';
import {Link} from 'react-router-dom';

export default class FullArticle extends React.Component {

    constructor(props) {
        super(props);

        this.article = props.articles.find(
            v => v.id === props.match.params.article
        );
    }

    render() {

        return (
            <div>
                <Link to="/"> Back </Link>
                <h1>{this.article.title}</h1>
                <span>
                    {this.article.content}
                </span>
            </div>
        );
    }
}