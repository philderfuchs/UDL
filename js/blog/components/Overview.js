import React from 'react';
import {observer} from "mobx-react"

import ArticlePreview from './ArticlePreview';

@observer
export default class Overview extends React.Component {

    getMorePreviews() {
        this.props.service.increasePreviewCount(1);
    }

    render() {

        const previews = this.props.service.previews;

        if (previews.length === 0) return null;
        
        const previewElements = previews.map(
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
                {previewElements}
                {showMorebutton}
            </div>
        );
    }
}