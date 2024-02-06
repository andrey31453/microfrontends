const html_webpack = require('html-webpack-plugin')
const { ModuleFederationPlugin: module_federation } =
  require('webpack').container
const external_template_remotes = require('external-remotes-plugin')

const dist = __dirname + '/dist/'
const src = __dirname + '/src/'

const get_rules = (dev) => [
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
]

const get_plugins = () => [
  new module_federation({
    name: 'container',
    remotes: {
      app1: 'app1@[app1Url]/remoteEntry.js',
    },
  }),
  new external_template_remotes(),
  new html_webpack({
    template: src + 'index.html',
  }),
]

const get_serve = (dev) => {
  if (!dev) return undefined

  return {
    hot: true,
    static: dist,
    port: 8810,
  }
}

const get_alias = () => ({
  '@': src,
})

module.exports = ({ dev }) => {
  return {
    mode: dev ? 'development' : 'production',
    target: ['browserslist'],
    devtool: dev ? 'eval-source-map' : undefined,
    devServer: get_serve(dev),
    plugins: get_plugins(),

    entry: {
      main: src + 'bootstrap.js',
    },

    output: {
      filename: '[name].js',
      clean: true,
      path: dist,
      publicPath: 'auto',
      assetModuleFilename: '[name][ext]',
    },

    resolve: {
      extensions: ['.js'],
      alias: get_alias(),
    },

    module: {
      rules: get_rules(dev),
    },
  }
}
