const React = require('react');
const { Mixin } = require('@untool/core');
const { uri } = require('@untool/express');
const Loadable = require('react-loadable');
const { getBundles } = require('react-loadable/webpack');
let stats;

module.exports = class ReactLoadableServerMixin extends Mixin {
  constructor(core) {
    super(core);
    this.modules = [];

    if (!stats) {
      stats = JSON.parse(
        require('fs').readFileSync(
          this.config.buildDir + '/loadable.json',
          'utf-8'
        )
      );
    }
  }
  enhanceElement(reactElement) {
    return (
      <Loadable.Capture
        report={(moduleName) => {
          this.modules.push(moduleName);
        }}
      >
        {reactElement}
      </Loadable.Capture>
    );
  }

  getTemplateData(data) {
    const bundles = Array.from(
      // for some reason bundles show up for everytime they are used
      // use Set to remove duplicates
      new Set(
        getBundles(stats, this.modules)
          .map((bundle) => uri.stripLeadingSlash(bundle.publicPath))
          .filter((file) => !file.endsWith('.map'))
      )
    );

    data.assetsByType.js.unshift(...bundles);

    return data;
  }
};
