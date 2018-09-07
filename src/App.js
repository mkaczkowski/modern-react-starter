import * as React from 'react';
import { hot } from 'react-hot-loader';
import Header from './view/header';
import Skills from './view/skills';
import Hero from './view/hero/Hero';
import Introduction from './view/introduction';
import Contact from './view/contact';
import Footer from './view/footer/Footer';

import './styles/index.css';

function App() {
  return (
    <main>
      <Header />
      <Hero />
      <Introduction />
      <Skills />
      <Contact />
      <Footer />
    </main>
  );
}

export default hot(module)(App);
