import React from 'react';

import ArticlePreview from './ArticlePreview';

export default class Overview extends React.Component {

    render() {

        const articles = this.props.articles.map(
            v => <ArticlePreview article={v}/>
        );

        return (
            <div>
                {articles}
            </div>
        );
    }
}