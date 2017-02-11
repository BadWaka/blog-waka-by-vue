require('./check-versions')();

let config = require('../config');
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

let opn = require('opn');
let path = require('path');
let express = require('express');

let webpack = require('webpack');
// http 代理中间件
let proxyMiddleware = require('http-proxy-middleware');
let webpackConfig = process.env.NODE_ENV === 'testing'
  ? require('./webpack.prod.conf')
  : require('./webpack.dev.conf');

// default port where dev server listens for incoming traffic
let port = process.env.PORT || config.dev.port;
// automatically open browser, if not set will be false
let autoOpenBrowser = !!config.dev.autoOpenBrowser;
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
let proxyTable = config.dev.proxyTable;

let app = express();
let compiler = webpack(webpackConfig);


/*********************************************************************/
// TODO 编写本地服务 使用mock数据

// 引入data.json
let appData = require('../data.json');
let articles = appData.articles;  // 拿到文章列表数据

// 因为要读取.md文件，所以引入文件读取模块fs
let fs = require('fs');

// 定义Express的路由，并编写接口
let apiRoutes = express.Router();

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
  let mdPath = path.join(__dirname, '../article1.md');
  fs.readFile(mdPath, {
    encoding: 'utf-8'
  }, function (err, data) {
    if (err) {
      console.log(err);
      return;
    }
    res.json({
      errorCode: 0,
      data: data
    });
  });
});

// 使用该路由；所有的路由都要加上/blogWaka，举个栗子：localhost:8080/blogWaka/articles
app.use('/blogWaka', apiRoutes);
/*********************************************************************/


let devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
});

let hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {
  }
});
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({action: 'reload'});
    cb()
  })
});

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  let options = proxyTable[context];
  if (typeof options === 'string') {
    options = {target: options}
  }
  app.use(proxyMiddleware(options.filter || context, options))
});

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')());

// serve webpack bundle output
app.use(devMiddleware);

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware);

// serve pure static assets
let staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory);
app.use(staticPath, express.static('./static'));

let uri = 'http://localhost:' + port;

devMiddleware.waitUntilValid(function () {
  console.log('> Listening at ' + uri + '\n');
});


module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err);
    return
  }

  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri);
  }
});
