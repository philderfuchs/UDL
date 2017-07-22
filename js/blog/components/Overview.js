import React from 'react';

import ArticlePreview from './ArticlePreview';

function getArticles(articles, max) {
    return articles.map(
        v => <ArticlePreview article={v}/>
    ).slice(0, max);
}

export default class Overview extends React.Component {

    constructor(props) {
        super(props);
        this.countOfPreviews = 3;
        this.moreInc = 2;

        this.state = {
            articles: getArticles(this.props.articles, this.countOfPreviews)
        }
    }

    showMore() {
        this.countOfPreviews += this.moreInc;
        this.setState({articles: getArticles(this.props.articles, this.countOfPreviews)});
    }

    render() {

        return (
            <div>
                {this.state.articles}
                <a onClick={this.showMore.bind(this)}>moa</a>
            </div>
        );
    }
}