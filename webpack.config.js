const path = require("path");
const glob = require('glob');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const AutoprefixerPlugin = require('autoprefixer');
const CssNanoPlugin = require('cssnano');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const PurgeCSSPlugin = require('purgecss-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: path.resolve(__dirname, 'src/app.js'),
    output: {
        filename: 'scripts/bundle.min.js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        port: 9000,
        contentBase: path.resolve(__dirname, 'dist'),
        compress: true,
        writeToDisk: true,
        hot: true
    },
    optimization: {
        minimizer: [
            new OptimizeCSSAssetsPlugin({}),
        ],
    },
    resolve: {
        extensions:
            [
                ".jsx",
                ".js",
                ".json"
            ]
    },
    module: {
        rules: [
            {
                test: /\.m*(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.m?css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            sourceMap: true,
                            hmr: process.env.NODE_ENV === 'development',
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            url: true,
                            import: true,
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            plugins: [
                                AutoprefixerPlugin,
                                CssNanoPlugin({
                                    preset: [
                                        'default',
                                        {
                                            discardComments: {
                                                removeAll: true
                                            }
                                        }
                                    ]
                                })
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            context: path.resolve(__dirname, 'src/'),
                            outputPath: 'images',
                            publicPath: '../images',
                            useRelativePaths: true,
                        },
                    },
                ],
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'styles/bundle.css',
            path: path.resolve(__dirname, 'dist')
        }),
        new PurgeCSSPlugin({
            paths: glob.sync(
                `${path.join(__dirname, 'src')}/**/*`, {nodir: true}
            )
        }),
        new CopyPlugin([
            {
                from: path.resolve(__dirname, 'src', 'architecture.md'),
                to: path.resolve(__dirname, 'dist')
            }
        ]),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src', 'index.html'),
            filename: "./index.html"
        }),
    ]
};
