import React from 'react';
import {Link} from 'react-router-dom';
import {IntlProvider, FormattedRelative} from 'react-intl';
import backgroundParallax from './backgroundParallax';

export default class FullArticle extends React.Component {

    constructor(props) {
        super(props);
        this.getArticle = this.getArticle.bind(this);

        this.state = {
            article: this.props.service.getArticle(this.props.match.params.article)
        };
    }

    componentWillMount() {
        this.props.service.on("change", this.getArticle);
    }

    getArticle() {
        this.setState({
            article: this.props.service.getArticle(props.match.params.article)
        });
    }

    componentDidMount () {
        new backgroundParallax($('#' + this.state.article.id + '_full .headerImage'), 0.03);
    }

    render() {
        const headerImageStyle = {
            backgroundImage: "url(" + this.state.article.imageurl + ")"
        };
        return (
            <div class="container-fluid fullArticle" id={this.state.article.id + "_full"}>

                <div class="headerImage" style={headerImageStyle}/>

                <div class="col-md-8 col-md-offset-2 col-xs-12">
                    <Link to="/"><button class="btn btn-primary back"><i class="fa fa-angle-double-left"></i> Back</button></Link>

                    <h2 class="title">
                        <IntlProvider locale="en">
                            <small><i class="fa fa-clock-o"/> <FormattedRelative value={this.state.article.date}/> by {this.state.article.author}</small>
                        </IntlProvider><br/>
                        {this.state.article.title}
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
                        {this.state.article.text_preview}
                        </strong>
                    </p>
                    <p class="fulltext">
                        {this.state.article.text_full}
                    </p>
                    <h5 class="ext-link"><a href={this.state.article.url}> <i class="fa fa-external-link"/> more information</a></h5>
                </div>
            </div>
        );
    }
}