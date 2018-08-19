var path = require('path');

module.exports = {
    entry: './src/js/datapicker/datapicker',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'index_bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader'                
                }
            }
        ]
    }
};