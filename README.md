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

# 值得记录的点
1. marked `#标题`不识别，必须是`# 标题`才可以
2. vue-router跳转时记录滚动条位置，参考vue-router官网文档无效
3. 通过bcrypt这个npm库来实现密码的保存（加盐、哈希算法）
4. 这里会有个问题，当你的type为password时，浏览器会记住密码并自动帮你填写上，然而你并不想让它帮你填，网上说加 autocomplete="off" 这个属性，但是这个属性在chrome中不怎么顶用，所以是可以这样解决，把 type="password" 这个字段去掉，加上 onfocus="this.type='password'" 也没有什么用，所以还是它爱记就让它记住吧
5. 事件处理总线，用于解决vue绑定事件的时候不能动态赋值的问题 (参考文章:[*vue*.js - *vue* *绑定事件*时可以*动态*赋值么 - SegmentFault](https://www.baidu.com/link?url=3Z6fLEniC6ODVBeZCe7cpVELhN9qYjSTWjPOF12CVvTm7cm2JDmhVum7tjj5v8JE17IG5knKxYmZtr4_xY5ZxK&wd=&eqid=d3fd2fde00077d1a0000000358b76716))
  ```
      // HTML
      <mu-raised-button v-for="item in adminItems" :label="item.name" @click="eventBus(item.clickEvent)"
                        class="demo-raised-button" primary fullWidth/>
      // JS
      /**
       * 事件处理总线
       * 用于解决vue绑定事件的时候不能动态赋值的问题
       *
       * @param eventName
       * @param params
       */
      eventBus (eventName, params) {
        this[eventName](params);
      },
  ```
6. 

# 待实现的功能
1. 点击分类跳转到相应分类列表（已实现）
2. 管理员权限的实现（已实现）
3. 更新文章功能，删除文章功能（已实现）
4. MongoDB实现数据库加密
5. 实现后退不刷新页面（已实现）
6. 登录功能

# 待解决的bug
1. 回退到主页时记住滚动条的位置（已解决）
- 通过设置keep-alive完成
2. 主页的文章项和里面的类型标签点击事件冲突（已解决）
3. 登录后主页的退出按钮没有显示，需要重新刷新才显示
4. 点击进入文章详情页后标题不显示的问题（已解决）
    - 原因：因为使用的是MuseUi的appbar 它的title属性是个props需要外部传进来的，改成内容就可以了
5. 点击更改文章时Android类型带不过来的问题（已解决）
  - 因为Android是第一个类型，而选择器默认是有值的，设默认值为0，这时候第一个类型外面带过来的时候就不显示了，所以增加了一个空的类型放在0的位置，但是不显示它
