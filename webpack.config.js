var webpack = require("webpack");
var path = require("path");

const commonConfig = {
    "entry": "./js/app.js",
    "output": {
        "path": path.resolve(__dirname, "js"),
        "filename": "app.min.js"
    },
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
    } else if (env === "build") {
        console.log(">>> PRODUCTION BUILD");
    }

    return commonConfig;
};