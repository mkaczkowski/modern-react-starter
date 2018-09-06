import * as React from 'react';
import { hot } from 'react-hot-loader';
import Header from './components/header';
import Skills from './view/skills';
import Hero from './view/hero/Hero';
import Introduction from './view/introduction';
import Contact from './view/contact';

import './styles/index.css';

function App() {
  return (
    <main>
      <Header />
      <Hero />
      <Introduction />
      <Skills />
      <Contact />
    </main>
  );
}

export default hot(module)(App);
