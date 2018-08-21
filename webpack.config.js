var path = require('path');

module.exports = {
    entry: './src/js/datepicker/datepicker',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'datepicker.js',
        library: ['DatePicker']
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