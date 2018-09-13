import path from 'path';
import webpack from 'webpack';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import LodashModuleReplacementPlugin from 'lodash-webpack-plugin';
import ManifestPlugin from 'webpack-manifest-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import PostcssPresetEnv from 'postcss-preset-env';
import PrerenderSPAPlugin from 'prerender-spa-plugin';
import StyleLintPlugin from 'stylelint-webpack-plugin';
import SWPrecacheWebpackPlugin from 'sw-precache-webpack-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import WebpackPwaManifest from 'webpack-pwa-manifest';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import HtmlCriticalWebpackPlugin from 'html-critical-webpack-plugin';
import getClientEnvironment from './env';
import getMetaData from './metadata';
import postcssConfig from './postcss.config';

const env = getClientEnvironment('production', '/');
const metadata = getMetaData(env.raw);

const isPWA = env.raw.PWA_ENABLED !== 'false';
const isProfiler = env.raw.PROFILER_ENABLED !== 'false';
const shouldUseLinters = env.raw.LINTERS_DISABLED !== 'true';

export default {
  mode: 'production',
  bail: true,
  devtool: false,
  entry: [path.resolve('src/index.js')],
  resolve: {
    modules: [path.resolve('src'), path.resolve('node_modules')],
    extensions: ['.js', '.json'],
    alias: {
      '@assets': path.resolve('src/assets'),
      modernizr$: path.resolve('.modernizrrc'),
      ...(isProfiler
        ? {
            'react-dom': 'react-dom/profiling',
            'schedule/tracking': 'schedule/cjs/schedule-tracking.profiling.min',
          }
        : {}),
    },
  },
  output: {
    path: path.resolve('dist'),
    filename: '[name].[hash].js',
    chunkFilename: '[name].[chunkhash:8].chunk.js',
    publicPath: '',
  },
  optimization: {
    runtimeChunk: false,
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: false, // set to true if you want JS source maps
        uglifyOptions: {
          mangle: !isProfiler ? { safari10: true } : false,
        },
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
  module: {
    strictExportPresence: true,
    rules: [
      shouldUseLinters && {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'eslint-loader',
        options: {
          emitError: true,
          failOnError: true,
        },
        exclude: [/[/\\\\]node_modules[/\\\\]/],
      },
      {
        oneOf: [
          {
            test: /\.js$/,
            exclude: [/[/\\\\]node_modules[/\\\\]/],
            use: {
              loader: 'babel-loader',
              options: {
                cacheDirectory: false,
                highlightCode: false,
                plugins: [
                  [
                    'react-css-modules',
                    {
                      generateScopedName: '[hash:base64]',
                    },
                  ],
                ],
              },
            },
          },
          {
            test: /\.css$/,
            use: [
              MiniCssExtractPlugin.loader,
              {
                loader: 'css-loader',
                options: {
                  sourceMap: false,
                  importLoaders: 1,
                  modules: true,
                  localIdentName: '[hash:base64]',
                },
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: false,
                  ident: 'postcss',
                  plugins: () => [PostcssPresetEnv(postcssConfig)],
                },
              },
            ],
          },
          {
            test: /\.svg$/,
            issuer: /\.js$/,
            use: [
              {
                loader: 'babel-loader',
              },
              {
                loader: 'react-svg-loader',
                options: {
                  jsx: true, // true outputs JSX tags,
                  svgo: {
                    floatPrecision: 3,
                  },
                },
              },
            ],
          },
          {
            test: /\.modernizrrc.js$/,
            use: ['modernizr-loader'],
          },
          {
            test: /\.modernizrrc(\.json)?$/,
            use: ['modernizr-loader', 'json-loader'],
          },
          {
            test: /\.(jpe?g|jpg|gif|png|svg|ico|woff|woff2|eot|ttf|webp)$/,
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              emitFile: true,
            },
          },
        ],
      },
    ].filter(rule => rule !== false),
  },
  plugins: [
    new webpack.DefinePlugin(env.stringified),
    new CleanWebpackPlugin(path.resolve('dist'), { root: path.resolve('.') }),
    shouldUseLinters &&
      new StyleLintPlugin({
        context: path.resolve('src'),
        files: '**/*.css',
        emitErrors: true,
      }),
    new CopyWebpackPlugin([path.resolve('public')]),
    new LodashModuleReplacementPlugin({ paths: true }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:8].css',
      chunkFilename: '[name].[contenthash:8].chunk.css',
    }),
    isPWA &&
      new FaviconsWebpackPlugin({
        logo: './src/assets/favicon.png',
        prefix: '',
        background: '#ffffff',
        emitStats: false,
        persistentCache: false,
        icons: {
          appleStartup: false,
        },
      }),
    isPWA &&
      new SWPrecacheWebpackPlugin({
        cacheId: 'modern-react-starter-pwa',
        filename: 'service-worker.js',
        dontCacheBustUrlsMatching: /\.\w{8}\./,
        mergeStaticsConfig: true, // if false you won't see any wpack-emitted assets in your sw config
        minify: true,
        navigateFallback: '/index.html',
        staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
      }),
    isPWA &&
      new ManifestPlugin({
        fileName: 'asset-manifest.json',
      }),
    isPWA &&
      new WebpackPwaManifest({
        ...metadata,
        ios: true,
        inject: true,
        icons: [
          {
            src: path.resolve('src/assets/favicon.png'),
            sizes: [96, 128, 192, 256, 384, 512], // multiple sizes
          },
        ],
      }),
    new HTMLWebpackPlugin({
      template: path.resolve('public/index.html'),
      title: metadata.name,
      description: metadata.description,
      manifest: metadata.filename,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    new PrerenderSPAPlugin({
      staticDir: path.resolve('dist'),
      // Required - Routes to render.
      routes: ['/'],
      minify: {
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        decodeEntities: true,
        keepClosingSlash: true,
        sortAttributes: true,
      },
      renderer: new PrerenderSPAPlugin.PuppeteerRenderer({
        skipThirdPartyRequests: true,
        headless: true, // Display the browser window when rendering. Useful for debugging.
      }),
    }),
    new HtmlCriticalWebpackPlugin({
      base: path.resolve('dist'),
      src: 'index.html',
      dest: 'index.html',
      inline: true,
      minify: true,
      extract: true,
      dimensions: [
        {
          height: 200,
          width: 500,
        },
        {
          height: 900,
          width: 1300,
        },
      ],
      ignore: ['@font-face', /some-regexp/],
      penthouse: {
        blockJSRequests: false,
      },
    }),
    env.raw.CI !== 'true' &&
      env.raw.BUNDLE_ANALYZER !== 'false' &&
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: true,
        defaultSizes: 'gzip',
      }),
  ].filter(plugin => plugin !== false),
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
  performance: {
    hints: 'warning',
  },
};
