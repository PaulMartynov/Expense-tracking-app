// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const HtmlWebpackPlugin = require("html-webpack-plugin");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Dotenv = require("dotenv-webpack");

module.exports = (env) => {
  const babelLoaderOptions = {
    presets: ["@babel/preset-env"],
  };
  if (env.production) {
    babelLoaderOptions.plugins = ["babel-plugin-jsx-remove-data-test-id"];
  }
  return {
    entry: "./src/index.tsx",
    resolve: {
      extensions: [".js", ".ts", ".tsx"],
    },
    output: {
      filename: "script.js",
      path: path.resolve(__dirname, "dist"),
      environment: {
        arrowFunction: false,
      },
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "public/index.html",
        inject: "body",
      }),
      new Dotenv({
        safe: true,
        path: path.resolve(__dirname, ".env"),
      }),
    ],
    module: {
      rules: [
        {
          test: /\.(js|tsx|ts)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: babelLoaderOptions,
          },
        },
        {
          test: /\.(css|scss)$/i,
          use: ["style-loader", "css-loader", "sass-loader"],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: "asset/resource",
          generator: {
            filename: "images/[name][ext]",
          },
        },
      ],
    },
    devServer: {
      compress: true,
      port: 9000,
      hot: true,
    },
  };
};
