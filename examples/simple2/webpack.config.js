const path = require('path')
const HTMLwebpackplugin = require('html-webpack-plugin')

const rules = [
    {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader'
        }
    },
    {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader"]
    }
];

module.exports = {
    entry: path.join(__dirname, 'src/index.js'),
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './build')
    },
    module: { rules },
    plugins: [
        new HTMLwebpackplugin({
            template: './public/index.html'
        })
    ]
}

