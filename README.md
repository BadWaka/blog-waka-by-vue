# blog-waka-by-vue

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

# 值得记录的问题
1. marked `#标题`不识别，必须是`# 标题`才可以
2. vue-router跳转时记录滚动条位置，参考vue-router官网文档无效

# 待实现的功能
1. 点击分类跳转到相应分类列表（已实现）
2. 管理员权限的实现（已实现）
3. 更新文章功能，删除文章功能
4. MongoDB实现数据库加密
5. 实现后退不刷新页面

# 待解决的bug
1. 回退到主页时记住滚动条的位置（已解决）
- 通过设置keep-alive完成
2. 主页的文章项和里面的类型标签点击事件冲突（已解决）
3. 登录后主页的退出按钮没有显示，需要重新刷新才显示
4. 点击进入文章详情页后标题不显示的问题
    - 原因：因为使用了title