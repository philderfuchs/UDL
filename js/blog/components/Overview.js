import React from 'react';

import ArticlePreview from './ArticlePreview';


export default class Overview extends React.Component {

    constructor(props) {
        super(props);
        this.getPreviews = this.getPreviews.bind(this);
        this.state = {
            articles: this.props.service.getSomePreviews()
        }
    }

    componentWillMount() {
        console.log("mooooooooount")
        this.props.service.on("change", this.getPreviews);
    }

    getMorePreviews() {
        this.props.service.increasePreviewCount(1);
    }

    getPreviews() {
        this.setState({
            articles: this.props.service.getSomePreviews()
        })
    }

    render() {

        let previews = this.state.articles.map(
            v => <ArticlePreview key={v.id} article={v}/>
        );


        let showMorebutton = <div></div>
        if (this.props.service.hasMorePreviews()) {
            showMorebutton = <div class="text-center">
                <button class="btn btn-primary" onClick={this.getMorePreviews.bind(this)}>... moa articles</button>
            </div>;
        }

        return (
            <div class="container">
                {previews}
                {showMorebutton}
            </div>
        );
    }
}