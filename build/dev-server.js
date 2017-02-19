'use strict';

require('./check-versions')();

var config = require('../config');
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn');
var path = require('path');
var express = require('express');
var fs = require('fs');   // 因为要读取.md文件，所以引入文件读取模块fs
var bodyParser = require('body-parser');  // 引入body-parser解析请求过来的数据
var mongoose = require('mongoose'); // 引入mongoose连接数据库
var Article = require('../models/article');  // 引入Article Model
var Type = require('../models/type');  // 引入Type Model

var webpack = require('webpack');
var proxyMiddleware = require('http-proxy-middleware'); // http 代理中间件
var webpackConfig = process.env.NODE_ENV === 'testing'
  ? require('./webpack.prod.conf')
  : require('./webpack.dev.conf');

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port;
// automatically open browser, if not set will be false
var autoOpenBrowser = config.dev.autoOpenBrowser;
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable;

var app = express();
var compiler = webpack(webpackConfig);


/*********************************************************************/
// TODO 编写本地服务 使用mock数据

// 引入data.json
var appData = require('../data.json');
var articles = appData.articles;  // 拿到文章列表数据

// 连接数据库
mongoose.connect('mongodb://localhost/blogWaka');

// 定义Express的路由，并编写接口
var apiRoutes = express.Router();

// 错误处理函数
function handleError(err) {
  console.log(err);
}

// 请求所有类型
apiRoutes.get('/types', function (req, res) {
  Type.fetch(function (err, types) {
    if (err) {
      handleError(err);
      return;
    }
    res.json({
      errorCode: 0,
      data: types
    });
  });
});

// admin post type 后台添加类型接口
apiRoutes.post('/admin/type/new', function (req, res) {
  console.log(req.body);

  var typePost = req.body.type;
  var typeName = typePost.typeName;
  var id = typePost._id;

  Type.findByTypeName(typeName, function (err, type) {
    if (err) {
      handleError(err);
      return;
    }
    console.log(type);
    // type === null 说明该类型数据库里没有，可以添加
    if (type === null) {
      // 新数据添加
      var typeTemp = new Type({ // 调用构造方法构造model
        typeName: typePost.typeName
      });
      typeTemp.save(function (err, type) {  // 保存至数据库
        if (err) {
          handleError(err);
          return;
        }
        res.json({
          errorCode: 0,
          data: '添加成功'
        });
      });
    }
    // 数据库里有了该类型，不可以再添加
    else {
      res.json({
        errorCode: -1,
        data: '已有该类型'
      });
    }
  });
});

// 请求所有文章
apiRoutes.get('/articles', function (req, res) {
  Article.fetch(function (err, articles) {
    if (err) {
      handleError(err);
      return;
    }
    // 处理数据
    articles = articles.map(function (article) {
      article.content = ''; // 删除content字段用来减少网络传输的字节，content详情页再获取
      return article;
    });
    res.json({
      errorCode: 0,
      data: articles
    });
  });
});

// 根据类型请求文章
apiRoutes.get('/articles/:typeName', function () {
  var typeName = req.params.typeName;
  console.log('typeName = ' + typeName);

  Article.findByTypeName(id, function (err, article) {
    if (err) {
      handleError(err);
      return;
    }
    res.json({
      errorCode: 0,
      data: article
    });
  });
});

// 请求具体的某一篇文章
apiRoutes.get('/articleDetail/:id', function (req, res) {
  var id = req.params.id;
  console.log('id = ' + id);

  Article.findById(id, function (err, article) {
    if (err) {
      handleError(err);
      return;
    }
    res.json({
      errorCode: 0,
      data: article
    });
  });
});

// admin post article 后台添加文章接口
apiRoutes.post('/admin/article/new', function (req, res) {
  console.log(req.body);

  var article = req.body.article;
  var id = article._id;

  // 判断是否是添加新的数据还是更新旧的数据
  if (id === undefined) {
    // 新数据添加
    var articleTemp = new Article({ // 调用构造方法构造model
      title: article.title,
      intro: article.intro,
      link: article.link,
      typeId: article.typeId,
      typeName: article.typeName,
      img: article.img,
      content: article.content
    });
    articleTemp.save(function (err, article) {  // 保存至数据库
      if (err) {
        handleError(err);
        return;
      }
      res.json({
        errorCode: 0,
        data: '添加成功'
      });
    });
  } else {
    // 旧数据更新
    Article.findOneAndUpdate({_id: id}, function (err, article) {
      if (err) {
        handleError(err);
        return;
      }
      res.json({
        errorCode: 1,
        data: '更新成功'
      });
    });
  }
});

// 使用bodyParser将req.body解析成json，要不然是undefined
app.use(bodyParser.json());
// 使用该路由；所有的路由都要加上/blogWaka，举个栗子：localhost:8080/blogWaka/articles
app.use('/blogWaka', apiRoutes);
/*********************************************************************/


var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
});

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
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
  var options = proxyTable[context];
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
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory);
app.use(staticPath, express.static('./static'));

var uri = 'http://localhost:' + port;

devMiddleware.waitUntilValid(function () {
  console.log('> Listening at ' + uri + '\n')
});


module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err);
    return
  }

  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
});
