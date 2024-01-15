import type { Configuration } from 'webpack';

import { rules } from './webpack.rules';
import { plugins } from './webpack.plugins';

import path from 'path';

const isProductionMode = process.env.NODE_ENV === 'production';

rules.push(
  {
    test: /\.css$/,
    use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
  },
  {
    test: /\.s[ac]ss$/i,
    use: [
      'style-loader',
      {
        loader: 'css-loader',
        options: {
          modules: {
            localIdentName: isProductionMode ? '[hash:base64]' : '[path][name]__[local][hash:5]',
          },
        },
      },
      'sass-loader',
    ],
  },
  {
    test: /\.svg$/,
    exclude: /node_modules/,
    loader: 'svg-react-loader',
  },
  {
    test: /\.(jpe?g|png|gif)$/i,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 10240,
          fallback: {
            loader: 'file-loader',
            options: {
              name: 'img/[name].[contenthash:8].[ext]',
              esModule: false,
            },
          },
          esModule: false,
        },
      },
    ],
    exclude: /node_modules/,
  }
);

export const rendererConfig: Configuration = {
  module: {
    rules,
  },
  plugins,
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
    alias: {
      src: path.resolve(__dirname, 'src'),
    },
  },
};
