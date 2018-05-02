const { Mixin } = require('@untool/core');
const { ReactLoadablePlugin } = require('react-loadable/webpack');

module.exports = class ReactLoadableMixin extends Mixin {
  configureBuild(webpackConfig, { jsLoaderConfig }, target) {
    jsLoaderConfig.options.plugins.push(
      require.resolve('react-loadable/babel')
    );

    if (target !== 'node') {
      webpackConfig.plugins.push(
        new ReactLoadablePlugin({
          filename: this.config.buildDir + '/loadable.json'
        })
      );
    }

    return webpackConfig;
  }
};
