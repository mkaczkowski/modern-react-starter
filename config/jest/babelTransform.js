// eslint-disable-next-line import/no-extraneous-dependencies
const babelJest = require('babel-jest');

module.exports = babelJest.createTransformer({
  babelrc: true,
  presets: [[require.resolve('@babel/preset-env'), { modules: 'commonjs' }], require.resolve('@babel/preset-react')],
});
