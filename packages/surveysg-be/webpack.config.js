const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');

const path = require('node:path');

/**
 * https://github.com/nrwl/nx/issues/14708
In the v17 version of the fix a context-variable with the root path was available.
It may be possible to get that value some other way, but for now this works
**/
const workspaceRoot = path.join(__dirname, '../..');

/**
 * @type {import('@nx/webpack/app-plugin').NxAppWebpackPluginOptions}
 */
module.exports = {
  output: {
    path: path.join(__dirname, '../../dist/packages/backend'),
    devtoolModuleFilenameTemplate: (info) => {
      // ref: https://webpack.js.org/configuration/output/#outputdevtoolmodulefilenametemplate
      const rel = path.relative(workspaceRoot, info.absoluteResourcePath);
      return `webpack:///./${rel}`;
    },
  },
  plugins: [
    new NxAppWebpackPlugin({
      target: 'node',
      compiler: 'tsc',
      main: './src/main.ts',
      tsConfig: './tsconfig.app.json',
      assets: ['./src/assets'],
      optimization: false,
      generatePackageJson: true,
      outputHashing: 'none',
      sourceMap: true, // Added source map to output (will not work without this)
    }),
  ],
};
