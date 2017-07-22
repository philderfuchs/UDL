var webpack = require("webpack");
var path = require("path");

const commonConfig = {
    "entry": {
        calendar: "./js/calendar"
    },
    "output": {
        "path": path.resolve(__dirname, "build"),
        "publicPath": '/build/',
        "filename": "[name].min.js"
    },
    module: {
        loaders: [
            {
                test: /\.hbs/,
                loader: "handlebars-loader"
            },
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015'],
                    plugins: ['react-html-attrs', 'transform-decorators-legacy', 'transform-class-properties'],
                }
            }
        ]
    }
    ,
    "plugins": [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            "window.jQuery": "jquery",
            "Tether": 'tether',
            "_": "underscore"
        })
    ]
};

module.exports = function (env) {

    if (env === "dev") {
        console.log(">>> DEVELOPMENT RUNNING");

        commonConfig.devtool = "source-map";
        commonConfig.devServer = {
            port: 8000
        }
    } else if (env === "build") {
        console.log(">>> PRODUCTION BUILD");
        commonConfig.plugins.push(new webpack.optimize.OccurrenceOrderPlugin());
        commonConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({mangle: false, sourcemap: false}));
    }


    return commonConfig;
};