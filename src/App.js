import { hot } from 'react-hot-loader';
import * as React from 'react';
import Home from './view/Home';
import Timer from './Timer';

import './styles/theme.sass';

class App extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <main>
        <Home username="Daftcoders" />
        <Timer from="5" to="0"/>
      </main>
    );
  }
}
export default hot(module)(App);
