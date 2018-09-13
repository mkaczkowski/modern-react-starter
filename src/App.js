import * as React from 'react';
import { hot } from 'react-hot-loader';
import Header from './view/header';
import Footer from './view/footer/Footer';
import Hero from './view/hero/Hero';

import './styles/index.css';

function App() {
  return (
    <main>
      <Header />
      <Hero />
      <Footer />
    </main>
  );
}

export default hot(module)(App);
