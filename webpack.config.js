const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { DefinePlugin } = require('webpack');

const Dotenv = require('dotenv-webpack');

const DIST = path.resolve(__dirname, 'dist');
const SRC = path.resolve(__dirname, 'src');
const MODE = process.env.NODE_ENV.trim();
const IS_DEV = MODE === 'development';
const PUBLIC_PATH = IS_DEV ? '/' : '/drive-admin/';
const TEMPLATE = path.join(SRC, IS_DEV ? 'index.dev.html' : 'index.prod.html');

module.exports = {
  mode: MODE,
  entry: '/src/index.tsx',
  output: {
    path: DIST,
    filename: 'js/bundle[contenthash].js'
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/,
        use: [
          {
            loader: "style-loader",
            options: {
              insert: function (element) {
                const parent = document.querySelector("head");
                const firstStyle = parent.querySelector("style");
                if (firstStyle) {
                  firstStyle.before(element);
                } else {
                  parent.append(element);
                }
              },
            },
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [['autoprefixer']],
              },
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [['autoprefixer']],
              },
            },
          },
        ],
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]'
        }
      },
      {
        test: /\.(jpg|png|gif|ico)$/,
        type: 'asset/resource',
        generator: {
          filename: 'img/[hash][ext]'
        }
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
        issuer: /\.([jt]s)x?$/,
      },
      {
         test: /\.svg$/,
          issuer: /\.css$/,
          use: ['svg-url-loader']
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: TEMPLATE,
      publicPath: PUBLIC_PATH
    }),
    new CleanWebpackPlugin({
      root: DIST,
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.join(SRC, 'assets/favicon'),
          to: path.join(DIST, 'favicon')
        },
        {
          from: path.join(SRC, '404.html'),
          to: path.join(DIST, '404.html')
        },
      ],
    }),
    new DefinePlugin({
      PUBLIC_PATH: JSON.stringify(PUBLIC_PATH)
    }),
    new Dotenv({
      path: __dirname + '/.env'
    })
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {
      '@assets': path.join(SRC, 'assets'),
      '@components': path.join(SRC, 'components'),
      '@constants': path.join(SRC, 'constants'),
      '@hocs': path.join(SRC, 'hocs'),
      '@hooks': path.join(SRC, 'hooks'),
      '@pages': path.join(SRC, 'pages'),
      '@services': path.join(SRC, 'services'),
      '@styles': path.join(SRC, 'styles'),
      '@state': path.join(SRC, 'state'),
      '@utils': path.join(SRC, 'utils'),
      '@vars': path.join(SRC, 'styles/_vars.scss'),
    },
  },
  devServer: {
    historyApiFallback: true,
    open: true,
  },
};