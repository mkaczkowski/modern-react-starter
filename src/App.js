import { hot } from 'react-hot-loader';
import * as React from 'react';
import Home from './view/Home';
import Counter from './view/Counter';

import './styles/theme.sass';

const COUNTER_CONFIG = {
  countTo: 660,
  countFrom: 680,
  onSuccess: () => alert('Time is up!'),
};

class App extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <main>
        <Home username="DaftCoder" />
        <Counter
          to={COUNTER_CONFIG.countTo}
          from={COUNTER_CONFIG.countFrom}
          onSuccess={COUNTER_CONFIG.onSuccess}
        />
      </main>
    );
  }
}

export default hot(module)(App);
