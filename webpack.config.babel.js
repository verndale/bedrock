import { entry, output, plugins, rules } from './webpack';

module.exports = (env = {}) => {
  return {
    devtool: env.production ? 'source-map' : 'cheap-module-eval-source-map',
    entry,
    output: output(env),
    plugins: plugins(env),
    module: {
      rules: rules(env)
    },
    mode: env.production ? 'production' : 'development',
    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    },
    resolve: {
      extensions: ['.js']
    },
    performance: {
      maxEntrypointSize: 512000,
      maxAssetSize: 512000
    }
  }
};
