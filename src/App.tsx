import * as React from 'react';
import { hot } from 'react-hot-loader';
import Header from './view/header/index';
import Footer from './view/footer/Footer';
import Hero from './view/hero/Hero';

import './styles/index.css';

export interface HelloProps {
  compiler: string;
  framework: string;
}

export const Hello = (props: HelloProps) => (
  <h1>
    Hello from {props.compiler} and {props.framework}!
  </h1>
);

function App() {
  return (
    <main>
      <Hello compiler="test" framework="test" />
      <Header />
      <Hero />
      <Footer />
    </main>
  );
}

export default hot(module)(App);
