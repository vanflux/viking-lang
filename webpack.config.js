const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  context: __dirname,
  entry: './src/index.ts',
  mode: 'production',
  resolve: {
    extensions: [".ts", ".js"],
    fallback: {
      assert: false,
      util: false,
    },
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
      }
    ]
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new BundleAnalyzerPlugin({
      openAnalyzer: false,
      analyzerMode: 'static',
    }),
  ],
  watchOptions: {
    ignored: /node_modules/,
  },
};