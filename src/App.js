import * as React from 'react';
import { hot } from 'react-hot-loader';
import Hero from './view/hero/Hero';

import './styles/index.css';

function App() {
  return (
    <main>
      <Hero />
    </main>
  );
}

export default hot(module)(App);
