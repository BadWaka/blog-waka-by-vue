/**
 * Created by BadWaka on 2017/2/19.
 */
'use strict';

let express = require('express');
let config = require('./config/index');

let port = process.env.PORT || config.build.port;

let app = express();

let router = express.Router();

router.get('/', function (req, res, next) {
  req.url = '/index.html';
  next();
});

app.use(router);

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
