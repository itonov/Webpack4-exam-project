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
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

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
        hot: true,
        disableHostCheck: true
    },
    optimization: {
        minimizer: [
            new OptimizeCSSAssetsPlugin({}),
            new UglifyJsPlugin({
                exclude: /node_modules/,
                cache: true,
                uglifyOptions: {
                    output: {
                        comments: false
                    }
                }
            })
        ],
    },
    resolve: {
        extensions:
            [
                ".js",
                ".css",
                ".png",
                ".svg",
                ".jsx"
            ]
    },
    module: {
        rules: [
            {
                test: /\.m?(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            "@babel/preset-env"
                        ]
                    }
                }
            },
            {
                test: /\.m?css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            sourceMap: process.env.NODE_ENV === 'development',
                            hmr: process.env.NODE_ENV === 'development'
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: process.env.NODE_ENV === 'development',
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
                test: /\.svg$/,
                loader: 'svg-inline-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
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
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'styles/bundle.min.css',
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
            template: path.resolve(__dirname, 'src', 'secondary.html'),
            filename: "./secondary.html"
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src', 'index.html'),
            filename: "./index.html"
        }),
    ]
};
