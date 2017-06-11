var webpack = require("webpack");

module.exports = {
    "entry": __dirname + "/js/app.js",
    "output": {
        "path": __dirname + "/js",
        "filename": "bundle.js"
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            "window.jQuery": "jquery",
            "Tether": 'tether',
            "_": "underscore"
        })
    ],
    devtool: "source-map"
};