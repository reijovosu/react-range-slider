const path = require('path')
const HTMLwebpackplugin = require('html-webpack-plugin')

const rules = [
    {
        test: /\.js$/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: [
                    ["@babel/preset-env", {
                        useBuiltIns: 'entry',
                        corejs: 3
                    }],
                    "@babel/preset-react"
                ],
                plugins: [
                    "@babel/plugin-proposal-class-properties",
                    "@babel/plugin-syntax-jsx",
                    "@babel/transform-react-jsx"
                ],
                include: [
                    path.resolve('.yalc/@reijovosu/react-range-slider'),
                    path.resolve('node_modules/@reijovosu/react-range-slider')
                ],
                exclude: /node_modules\/(?!node_modules\/@reijovosu\/react-range-slider).+/
            }
        }
    },
    {
        test: /\.css$(!.module.css$)/,
        use: ["style-loader", "css-loader"],
    },
    {
        test: /\.module.css$/,
        use: [
            'style-loader',
            {
                loader: 'css-loader',
                options: {
                    importLoaders: 1,
                    modules: true
                }
            }
        ]
    },
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

