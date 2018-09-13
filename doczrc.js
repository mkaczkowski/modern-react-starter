// eslint-disable-next-line import/no-extraneous-dependencies
import { css } from 'docz-plugin-css';
import postcssConfig from './config/postcss.config';

export default {
  port: 6006,
  debug: false,
  plugins: [
    css({
      preprocessor: 'postcss',
      loaderOpts: postcssConfig,
    }),
  ],
};
