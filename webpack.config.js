const path = require("path");
const webpack = require("webpack");
const ESLintPlugin = require("eslint-webpack-plugin");

module.exports = {
    mode: "development", //배포: production
    devtool: "eval",
    resolve: {
        extensions: [".jsx", ".js"],
    },
    entry: {
        app: "./client",
    },
    module: {
        rules: [
            {
                test: /\.jsx?/,
                loader: "babel-loader",
                options: {
                    presets: [
                        [
                            "@babel/preset-env",
                            {
                                targets: {
                                    browsers: [
                                        "> 5% in KR",
                                        "last 2 chrome versions",
                                    ],
                                },
                            },
                        ],
                        "@babel/preset-react",
                    ],
                    plugins: ["@babel/plugin-proposal-class-properties"],
                },
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {},
                    },
                ],
            },
            {
                test: /\.less$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" },
                    {
                        loader: "less-loader",
                        options: { javascriptEnabled: true },
                    },
                ],
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({ debug: true }),
        new ESLintPlugin({
            context: "./.eslintrc",
            extensions: [".jsx", ".js"],
        }),
    ],
    output: {
        path: path.join(__dirname, "dist"),
        filename: "app.js",
        //publicPath: "/react_pr/todoList/",
    },
};
