import React from 'react';
import {Link} from 'react-router-dom';


export default class ArticlePreview extends React.Component {

    constructor(props) {
        super(props);

        this.article = this.props.article;
    }

    render() {
        const link = "/article/" + this.article.id;
        return (
            <div>
                <h1>{this.article.title}</h1>
                <span>{this.article.short}</span>
                <Link to={link}> mehr </Link>
            </div>
        )
    }
}