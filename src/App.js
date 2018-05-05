import { hot } from 'react-hot-loader';
import * as React from 'react';
import loadableVisibility from 'react-loadable-visibility/loadable-components';
import Home from './view/Home';

const Contact = loadableVisibility(() => import('./view/Contact'));

const App = () => (
  <main>
    <Home username="DaftCoder" />
    <Contact />
  </main>
);

export default hot(module)(App);
