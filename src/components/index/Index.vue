<template>

  <!--index页整个容器-->
  <section>

    <!--顶部抽屉按钮和github-->
    <div class="top">
      <mu-icon-button @click="drawerToggle">
        <i class="material-icons">list</i>
      </mu-icon-button>
      <mu-icon-button @click="github">
        <i class="iconfont icon-github"></i>
      </mu-icon-button>
    </div>

    <!--侧边菜单-->
    <mu-drawer right :open="isDrawerOpen" @close="drawerToggle">
      <mu-appbar class="drawer-header" title="类别"/>
      <mu-list>
        <mu-list-item title="Menu Item 1"/>
        <mu-list-item title="Menu Item 2"/>
        <mu-list-item title="Menu Item 3"/>
        <mu-list-item @click="drawerToggle" title="Close"/>
      </mu-list>
    </mu-drawer>

    <!--头部-->
    <header>
      <!--头像-->
      <div class="avatar"></div>

      <!--提示语-->
      <div class="welcome">Welcome to waka's blog</div>
    </header>

    <!--文章列表-->
    <section class="articles">
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
        articles: {}, // 文章数据
        isDrawerOpen: false   // 侧边栏开关
      }
    },
    // 实例创建后被调用；生命周期钩子
    created () {
      // 请求文章列表数据
      this.$http.get('/api/articles').then(response => {  // 请求成功
        console.log(response);
        if (response.status !== 200) {
          this.articles = 'status = ' + response.status + ' errorCode = ' + response.body.errorCode;
          return;
        }
        this.articles = response.body.data;
      }, response => {  // 请求失败

      });
    },
    methods: {
      drawerToggle () {
        this.isDrawerOpen = !this.isDrawerOpen;
      },
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
    display: flex;
    position: fixed;
    justify-content: space-between;
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
