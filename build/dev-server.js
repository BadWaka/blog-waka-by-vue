require('./check-versions')()

var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn')
var path = require('path')
var express = require('express')

var webpack = require('webpack')
// http 代理中间件
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = process.env.NODE_ENV === 'testing'
  ? require('./webpack.prod.conf')
  : require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()
var compiler = webpack(webpackConfig)


/*********************************************************************/
// TODO 编写本地服务 使用mock数据

// 引入data.json
var appData = require('../data.json');
var articles = appData.articles;  // 拿到文章列表数据

// 因为要读取.md文件，所以引入文件读取模块fs
var fs = require('fs');

// 定义Express的路由，并编写接口
var apiRoutes = express.Router();

// 请求文章列表
apiRoutes.get('/articles', function (req, res) {
  // 返回给客户端json数据
  res.json({
    errorCode: 0,   // 错误码;0为正确
    data: articles    // 数据
  });
});

// 请求具体的某一篇文章
apiRoutes.get('/article/1', function (req, res) {
  // 文件路径
  var mdPath = path.join(__dirname, '../article1.md');
  fs.readFile(mdPath, {
    encoding: 'utf-8'
  }, function (err, data) {
    if (err) {
      console.log(err);
      return;
    }
    var mdStr = data;
    // console.log('mdStr = ' + mdStr);
    res.json({
      errorCode: 0,
      data: mdStr
    });
  });
});

// 使用该路由；所有的路由都要加上/api，举个栗子：localhost:8080/api/articles
app.use('/api', apiRoutes);
/*********************************************************************/


var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {
  }
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({action: 'reload'})
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = {target: options}
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

var uri = 'http://localhost:' + port

devMiddleware.waitUntilValid(function () {
  console.log('> Listening at ' + uri + '\n')
})


module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }

  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
})
