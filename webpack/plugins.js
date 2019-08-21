import webpack from 'webpack';
import path from 'path';
import FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin';

export default ({ production }) => {
  let plugins = [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(production ? 'production' : 'development')
    })
  ];

  if (production) {
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

    plugins = [
      ...plugins,
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: false,
        reportFilename: path.resolve(__dirname, 'report.html')
      })
    ]
  } else {
    plugins = [
      ...plugins,
      new FriendlyErrorsPlugin({
        clearConsole: false
      })
    ]
  }

  return plugins;
}
