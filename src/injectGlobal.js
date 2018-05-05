/* eslint-disable no-unused-expressions */
import { injectGlobal } from 'emotion';
import emotionNormalize from 'emotion-normalize';

injectGlobal`
  ${emotionNormalize}
  
  body {
    /* rules go here */
    background: aquamarine;
  }
  a {
    color: #000;
  }
`;
