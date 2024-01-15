import type IForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ForkTsCheckerWebpackPlugin: typeof IForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';

export const plugins = [
  new ForkTsCheckerWebpackPlugin({
    logger: {
      log(message) {
        // console.log(message);
      },
      error(message) {
        console.log(message);
      },
    },
  }),
  new ReactRefreshWebpackPlugin({ overlay: false }),
];
