import { render } from '@untool/core';
import React from 'react';
import Loadable from 'react-loadable';

const LoadableComponent = Loadable({
  loader: () => import('./headline'),
  loading: () => 'loading',
  delay: 500
});

export default render(
  <div>
    <LoadableComponent name="World" />
    <LoadableComponent name="World" />
    <LoadableComponent name="World" />
  </div>
);
