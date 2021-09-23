// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const webpack = require("webpack");
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
      new webpack.DefinePlugin({
        "process.env.API_KEY": JSON.stringify(process.env.API_KEY),
        "process.env.AUTHDOMAIN": JSON.stringify(process.env.AUTHDOMAIN),
        "process.env.DB_URL": JSON.stringify(process.env.DB_URL),
        "process.env.PROJECT_ID": JSON.stringify(process.env.PROJECT_ID),
        "process.env.STORAGE_BUCKET": JSON.stringify(
          process.env.STORAGE_BUCKET
        ),
        "process.env.MESSAGING_SENDER_ID": JSON.stringify(
          process.env.MESSAGING_SENDER_ID
        ),
        "process.env.APP_ID": JSON.stringify(process.env.APP_ID),
        "process.env.MEASUREMENT_ID": JSON.stringify(
          process.env.MEASUREMENT_ID
        ),
        "process.env.LOCAL_STORAGE_KEY": JSON.stringify(
          process.env.LOCAL_STORAGE_KEY
        ),
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
