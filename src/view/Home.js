// @flow

import React from 'react';
import { css } from 'emotion';
import styled, { keyframes } from 'react-emotion';

type HomeProps = {
  username: string,
};

const bounce = keyframes`
  from, 20%, 53%, 80%, to {
   transform: translate3d(0,0,0);
  }
  40%, 43% {
   transform: translate3d(0, -30px, 0);
  }
  70% {
   transform: translate3d(0, -15px, 0);
  }
  90% {
   transform: translate3d(0,-4px,0);
  }
 `;

const breakpoints = {
  // Numerical values will result in a min-width query
  phone: 576,
  tablet: 768,
  desktop: 992,
  xLarge: 1200,
  // tallPhone: '(max-width: 360px) and (min-height: 740px)',
};

const mq = Object.keys(breakpoints).reduce((accumulator, label) => {
  const prefix = typeof breakpoints[label] === 'string' ? '' : 'min-width:';
  const suffix = typeof breakpoints[label] === 'string' ? '' : 'px';
  // eslint-disable-next-line no-param-reassign
  accumulator[label] = cls =>
    css`
      @media (${prefix + breakpoints[label] + suffix}) {
        ${cls};
      }
    `;
  return accumulator;
}, {});

const UsernameLabel = styled.div`
  font-weight: normal;
  color: red;
  animation: ${bounce} 1s ease infinite;

  ${mq.phone(css`
    color: blue;
  `)};
  ${mq.tablet(css`
    color: yellowgreen;
  `)};
`;

const welcomeClassName = css`
  min-height: 1000px;
  color: gray;
  font-size: 3rem;
  text-align: center;
  transform: rotate(-5deg);
`;

// PROPS with emotion:: https://emotion.sh/docs/typescript#passing-props-when-styling-a-react-component
class Home extends React.Component<HomeProps> {
  state = {
    welcomeText: 'Hello',
  };

  render() {
    const { welcomeText } = this.state;
    const { username } = this.props;

    return (
      <div>
        <div className={welcomeClassName}>
          {welcomeText}
          <UsernameLabel>{`: ${username}`}</UsernameLabel>
        </div>
      </div>
    );
  }
}

//SAMPLES
//https://github.com/emotion-js/emotion/blob/master/packages/site/src/layouts/index.js
// https://github.com/appbaseio/reactivesearch/blob/dev/site/src/styles/base.js
// https://github.com/appbaseio/reactivesearch/blob/dev/site/src/styles/mediaQueries.js
// https://github.com/sumup/circuit-ui/tree/master/src/styles
// https://github.com/sumup/circuit-ui/blob/master/src/themes/default.js
// https://github.com/sumup/circuit-ui/tree/master/src/components/Button
//https://sumup.github.io/circuit-ui/?selectedKind=Badge&selectedStory=Default%20Badge&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel

export default Home;
