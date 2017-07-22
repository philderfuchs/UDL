import React from 'react';
import {Link} from 'react-router-dom';
import {IntlProvider, FormattedRelative} from 'react-intl';

export default class FullArticle extends React.Component {

    constructor(props) {
        super(props);

        this.article = props.articles.find(
            v => v.id === props.match.params.article
        );
    }

    render() {
        const headerImageStyle = {
            backgroundImage: "url(" + this.article.imageurl + ")"
        };
        return (
            <div class="container-fluid fullArticle">

                <div class="headerImage" style={headerImageStyle}/>

                <div class="col-md-8 col-md-offset-2 col-xs-12">
                    <h2 class="title">
                        <IntlProvider locale="en">
                            <small><i class="fa fa-clock-o"/> <FormattedRelative value={this.article.date}/> by {this.article.author}</small>
                        </IntlProvider><br/>
                        {this.article.title}
                    </h2>
                    <p class="introduction">
                        <strong>
                        {this.article.text_preview}
                        </strong>
                    </p>
                    <p class="fulltext">
                        {this.article.text_full}
                    </p>
                    <h5 class="ext-link"><a href={this.article.url}> <i class="fa fa-external-link"/> more information</a></h5>
                    <h5 class="back"><Link to="/"><i class="fa fa-angle-double-left"></i> Back</Link></h5>
                </div>
            </div>
        );
    }
}