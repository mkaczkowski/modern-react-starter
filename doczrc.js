// eslint-disable-next-line import/no-extraneous-dependencies
import { css } from 'docz-plugin-css';

export default {
  port: 6006,
  debug: false,
  plugins: [css({ preprocessor: 'postcss' })],
};
