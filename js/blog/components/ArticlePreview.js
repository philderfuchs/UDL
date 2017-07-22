import React from 'react';
import {Link} from 'react-router-dom';
import {IntlProvider, FormattedRelative} from 'react-intl';

export default class ArticlePreview extends React.Component {

    constructor(props) {
        super(props);

        this.article = this.props.article;
    }

    render() {
        const headerImageStyle = {
            backgroundImage: "url(" + this.article.imageurl + ")"
        };
        return (
            <div class="row">
                <div class="col-xs-12 preview">
                    <div class="headerImage" style={headerImageStyle}/>
                    <div class="row">
                        <div class="col-md-8 col-md-offset-2 col-xs-12">
                            <h3 class="title">
                                {this.article.title}<br/>
                                <IntlProvider locale="en">
                                    <small><i class="fa fa-clock-o"/> <FormattedRelative value={this.article.date}/>
                                    </small>
                                </IntlProvider>
                                <small><a href={"mailto:" + this.article.email}> <i
                                    class="fa fa-user-circle-o"/> {this.article.author}</a>
                                </small>
                                <small><a href={this.article.url}> <i class="fa fa-external-link"/> homepage</a></small>
                            </h3>
                            <div class="colorstripe-container">
                                <div class="colorstripe">
                                    <div class="colorblock event-standard"></div>
                                    <div class="colorblock event-important"></div>
                                    <div class="colorblock event-warning"></div>
                                    <div class="colorblock event-info"></div>
                                    <div class="colorblock event-inverse"></div>
                                    <div class="colorblock event-success"></div>
                                    <div class="colorblock event-special"></div>
                                </div>
                            </div>
                            <div class="text">
                                {this.article.text_preview}
                                <Link to={"/article/" + this.article.id}>... mehr lesen </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}