var webpack = require("webpack");
var path = require("path");

module.exports = {
    "entry": "./js/app.js",
    "output": {
        "path": path.resolve(__dirname, "js"),
        "filename": "bundle.js"
    },
    "plugins": [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            "window.jQuery": "jquery",
            "Tether": 'tether',
            "_": "underscore"
        })
    ],
    "devtool": "source-map"
};