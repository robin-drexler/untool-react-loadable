const React = require('react');
const { Mixin } = require('@untool/core');
const Loadable = require('react-loadable');

module.exports = class ReactLoadableBrowserMixin extends Mixin {
  bootstrap() {
    return Loadable.preloadReady();
  }
};
