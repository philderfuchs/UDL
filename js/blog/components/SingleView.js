import React from 'react';
import { observer } from 'mobx-react';
import FullArticle from './FullArticle';

@observer
export default class SingleView extends React.Component {

    render() {
        const articles = this.props.service.articles;

        if(articles.length === 0) return null;

        const article = articles.find(v => v.id === this.props.match.params.article);
        return (
            <FullArticle article={article}/>
        )
    }
}