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
        this.countOfPreviews = 1;
        this.moreInc = 1;

        this.state = {
            articles: getArticles(this.props.articles, this.countOfPreviews)
        }
    }

    showMore() {
        this.countOfPreviews += this.moreInc;
        this.setState({articles: getArticles(this.props.articles, this.countOfPreviews)});
    }

    render() {

        let showMorebutton = <div></div>;
        if (this.countOfPreviews < this.props.articles.length) {
            showMorebutton = <div class="text-center">
                <button class="btn btn-primary" onClick={this.showMore.bind(this)}>... moa articles</button>
            </div>;
        }

        return (
            <div class="container">
                {this.state.articles}
                {showMorebutton}
            </div>
        );
    }
}