const path = require(`path`);
const ExtractTextPlugin = require(`extract-text-webpack-plugin`);
const CleanWebpackPlugin = require(`clean-webpack-plugin`);
const HtmlWebpackPlugin = require(`html-webpack-plugin`);

module.exports = {
    entry: {
        bundle: `./src/ts/app.ts`,
        style: `./src/sass/style.sass`,
        icon: `./src/img/icons/logo.svg`,
        notFound: `./src/img/page-not-found.png`
    },
    output: {
        path: path.resolve(__dirname, `dist`),
        filename: `[name].js`,
        publicPath: `/`
    },
    devtool: `inline-source-map`,
    module: {
        rules: [
            {
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
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                loader: `file-loader`,
                options: {
                    name: `[path]/[name].[ext]`
                }
            },
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
            },
            {
                test: /\.html$/,
                use: [`html-loader`]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(`./dist`),
        new ExtractTextPlugin(`style.css`, {
            allChunks: true
        }),
        new HtmlWebpackPlugin({
            template: `src/index.html`
        })
    ],
    resolve: {
        extensions: [`.tsx`, `.ts`, `.js`]
    }
};
