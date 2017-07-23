import React from 'react';
import {Link} from 'react-router-dom';
import {IntlProvider, FormattedRelative} from 'react-intl';
import backgroundParallax from './backgroundParallax';

export default class FullArticle extends React.Component {

    constructor (props) {
        super(props);
        this.article = this.props.article;
    }

    componentDidMount() {
        new backgroundParallax($('#' + this.props.id + ' .headerImage'), 0.03);
    }

    render() {
        const headerImageStyle = {
            backgroundImage: "url(" + this.props.article.imageurl + ")"
        };
        return (
            <div class="container-fluid fullArticle" id={this.props.id}>

                <div class="headerImage" style={headerImageStyle}/>

                <div class="col-md-8 col-md-offset-2 col-xs-12">
                    <Link to="/">
                        <button class="btn btn-primary back"><i class="fa fa-angle-double-left"></i> Back</button>
                    </Link>

                    <h2 class="title">
                        <IntlProvider locale="en">
                            <small><i class="fa fa-clock-o"/> <FormattedRelative value={this.props.article.date}/>
                                by {this.props.article.author}</small>
                        </IntlProvider><br/>
                        {this.props.article.title}
                    </h2>
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
                    <p class="introduction">
                        <strong>
                            {this.props.article.text_preview}
                        </strong>
                    </p>
                    <p class="fulltext">
                        {this.props.article.text_full}
                    </p>
                    <h5 class="ext-link"><a href={this.props.article.url}> <i class="fa fa-external-link"/> more
                        information</a></h5>
                </div>
            </div>
        );
    }
}