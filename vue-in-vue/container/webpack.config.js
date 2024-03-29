const html_webpack = require('html-webpack-plugin')
const { VueLoaderPlugin: vue_loader } = require('vue-loader')
const copy_webpack = require('copy-webpack-plugin')
const webpack = require('webpack')
const { ModuleFederationPlugin: module_federation } =
  require('webpack').container

const dist = __dirname + '/dist/'
const src = __dirname + '/src/'
const template = __dirname + '/src/template/'

const get_rules = (dev) => [
  {
    test: /\.vue$/,
    loader: 'vue-loader',
  },

  {
    test: /\.ts$/,
    loader: 'ts-loader',
    exclude: /node_modules/,
    options: {
      appendTsSuffixTo: [/\.vue$/],
    },
  },

  {
    test: /\.js$/i,
    exclude: /(node_modules)/,
    use: [
      {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
        },
      },
    ],
  },

  {
    test: /\.(scss|css|sass)$/i,
    use: [
      'style-loader',
      'css-loader',
      {
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            plugins: [require('postcss-preset-env')],
          },
        },
      },
      {
        loader: 'sass-loader',
        options: {
          sourceMap: dev,
        },
      },
    ],
  },

  {
    test: /\.(png|jpg|webp|ico|.json)$/i,
    type: 'asset/resource',
  },

  {
    test: /\.svg$/,
    loader: 'svg-inline-loader',
  },
]

const get_plugins = () => [
  new module_federation({
    name: 'container',
    filename: 'remoteEntry.js',
    remotes: {
      app1: 'app1@http://localhost:8801/remoteEntry.js',
    },
  }),
  new webpack.DefinePlugin({
    __VUE_OPTIONS_API__: false,
    __VUE_PROD_DEVTOOLS__: false,
  }),
  new vue_loader(),
  new html_webpack({
    favicon: template + 'favicon.png',
    template: template + 'index.html',
  }),
  new copy_webpack({
    patterns: [
      {
        from: src + 'static',
        to: dist + 'assets',
      },
    ],
  }),
]

const get_alias = () => ({
  '@': src,
})

const get_serve = (dev) => {
  if (!dev) return undefined

  return {
    hot: true,
    port: 8800,
    allowedHosts: 'all',
  }
}

module.exports = ({ dev }) => {
  return {
    mode: dev ? 'development' : 'production',
    target: ['browserslist'],
    devtool: dev ? 'eval-source-map' : undefined,
    devServer: get_serve(dev),
    plugins: get_plugins(),

    entry: {
      main: src + 'app/bootstrap.ts',
    },

    output: {
      filename: '[name].js',
      clean: true,
      path: dist,
      assetModuleFilename: '[name][ext]',
    },

    resolve: {
      extensions: ['.vue', '.ts', '.js'],
      alias: get_alias(),
    },

    module: {
      rules: get_rules(dev),
    },
  }
}
