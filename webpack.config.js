module.exports = {
    entry: `${__dirname}/src/index.js`,
    output: {
        path: `${__dirname}/public`,
        filename: 'app.js'
    },
    devServer: {
        contentBase: `${__dirname}/public`,
        compress: true,
        port: 3000,
        overlay: {
            warnings: true,
            errors: true
        },
        watchContentBase: true
    },
    devtool: 'eval-source-map',
    module: {
        rules: [{
            test: /.js$/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['stage-2']
                }
            }
        }]
    }
};
