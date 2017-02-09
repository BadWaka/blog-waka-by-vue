<template>
  <!--index页整个容器-->
  <section>

    <!--顶部工具栏 使用fixed固定在顶部-->
    <div class="top">
      <!--左侧抽屉开关-->
      <mu-icon-button @click="drawerToggle">
        <i class="material-icons">list</i>
      </mu-icon-button>
      <!--右侧GitHub链接-->
      <mu-icon-button @click="github">
        <i class="iconfont icon-github"></i>
      </mu-icon-button>
    </div>

    <!--点击抽屉开关打开的侧边菜单-->
    <mu-drawer right :open="isDrawerOpen" @close="drawerToggle">
      <!--标题栏-->
      <mu-appbar class="drawer-header" title="类别"/>
      <mu-list>
        <!--类别List-->
        <mu-list-item v-for="type in typeArray" :title="type"/>
        <!--关闭栏-->
        <mu-list-item @click="drawerToggle" title="关闭"/>
      </mu-list>
    </mu-drawer>

    <!--头部-->
    <header>
      <!--头像-->
      <div class="avatar"></div>
      <!--提示语 暂时写死，以后会从服务器取得-->
      <div class="welcome">Welcome to waka's blog</div>
    </header>

    <!--文章列表-->
    <section class="articles">
      <!--引用子组件 ArticleItem 注意html代码中需要将驼峰转化成小写加短横线的形式-->
      <!--artcile 是父组件Index.vue传递给子组件ArticleItem.vue的props-->
      <article-item v-for="article in articles" :article="article"></article-item>
    </section>

  </section>
</template>

<script>

  // 引入ArticleItem组件；这里可以直接使用components而不需要../../components
  // 是因为在build/webpack.base.conf.js中alias字段里定义了别名
  import ArticleItem from 'components/index/article-item/ArticleItem.vue';

  export default {
    // 包含的组件
    components: {
      ArticleItem
    },
    // 数据
    data () {
      return {
        articles: {}, // 文章数据，请求获得
        isDrawerOpen: false,  // 侧边栏开关
        typeArray: ['HTML', 'CSS', 'Sass', 'Java Script', 'ECMAScript', 'Vue.js', 'React', 'React Native', '微信小程序', 'Node.js', 'MongoDB', 'macOS', 'Linux']  // 类型数组，mock数据，后续会从服务器上取得
      }
    },
    // 实例创建后被调用；生命周期钩子
    created () {
      // 请求文章列表数据
      this.$http.get('/api/articles').then(response => {  // 请求成功
        if (response.status !== 200) {
          // 输出错误信息
          this.articles = 'status = ' + response.status + ' errorCode = ' + response.body.errorCode;
          return;
        }
        this.articles = response.body.data;
      }, response => {  // 请求失败，因为mock数据没有请求失败，所以暂时没有处理
        this.articles = '请求失败';
      });
    },
    // 方法
    methods: {
      // 开关抽屉
      drawerToggle () {
        this.isDrawerOpen = !this.isDrawerOpen;
      },
      // 跳转到GitHub
      github () {
        window.open('https://github.com/BadWaka');
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

  // 引入颜色css
  @import "../../common/css/color.scss";

  .top {
    height: 64px;
    padding-left: 8px;
    padding-right: 8px;
    display: flex;
    position: fixed;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    color: #fff;
    background-color: $blue500;
  }

  .drawer-header {
    background-color: $blue500;
  }

  header {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 440px;
    color: #fff;
    background-color: $blue500;

    .avatar {
      height: 150px;
      width: 150px;
      margin-top: 100px;
      background: url(http://img.hb.aicdn.com/19dd42725e125bb7424785afbddeee41d5eb13931b097-evWO7z_fw658) center no-repeat;
      background-size: cover;
      border-radius: 50%;
      box-shadow: 5px 10px 10px $blue800;
    }

    .welcome {
      margin-top: 20px;
      font-size: 24px;
      font-family: "Comic Sans MS";
    }
  }

  /*文章列表*/
  .articles {
    margin-top: -100px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
