const path = require(`path`);
const ExtractTextPlugin = require(`extract-text-webpack-plugin`);

module.exports = {
    entry: `./src/app.ts`,
    output: {
        path: path.resolve(__dirname, `dist`),
        filename: `bundle.js`
    },
    devtool: `inline-source-map`,
    module: {
        rules: [
            /*{
                test: /\.css$/,
                include: path.join(__dirname, `src`),
                use: [
                    `style-loader`,
                    {
                        loader: `typings-for-css-modules-loader`,
                        options: {
                            modules: true,
                            namedExport: true,
                            camelCase: true,
                            sass: true
                        }
                    }
                ]
            },*/
            {
                test: /\.sass$/,
                use: ExtractTextPlugin.extract({
                    fallback: `style-loader`,
                    use: [
                        `css-loader`,
                        `sass-loader`
                    ]
                })
            },
            {
                test: /\.tsx?$/,
                use: `ts-loader`,
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin(`style.css`)
    ],
    resolve: {
        extensions: [ `.tsx`, `.ts`, `.js` ]
    }
};