<template>
  <section class="page">
    <!--顶部工具栏-->
    <mu-appbar class="app-bar" :title="typeName">
      <!--返回按钮-->
      <mu-icon-button icon="arrow_back" slot="left" @click="back"/>
      <!--右侧菜单-->
      <mu-icon-menu icon="more_vert" slot="right">
        <mu-menu-item title="菜单 1"/>
        <mu-menu-item title="菜单 2"/>
        <mu-menu-item title="菜单 3"/>
        <mu-menu-item title="菜单 4"/>
        <mu-menu-item title="菜单 5"/>
      </mu-icon-menu>
    </mu-appbar>

    <!--文章列表-->
    <section class="articles">
      <!--引用子组件 ArticleItem 注意html代码中需要将驼峰转化成小写加短横线的形式-->
      <!--article 是父组件Index.vue传递给子组件ArticleItem.vue的props-->
      <article-item v-for="article in articles" :article="article"></article-item>
    </section>

  </section>
</template>

<script>

  import constant from '../../common/js/constant';  // 引入常量js
  import util from '../../common/js/util';  // 引入util
  import ArticleItem from '../../components/article-list/article-item/ArticleItem.vue'; // 引入文章项

  export default {
    // 包含的组件
    components: {
      ArticleItem
    },
    data () {
      return {
        typeId: '',
        typeName: '',
        types: [],
        articles: []
      }
    },
    methods: {
      // 后退
      back () {
        window.history.back();
      }
    },
    // Vue实例创建之后被调用
    created () {
      const that = this;
      this.typeId = this.$route.params.typeId; // 从vue-router的路由拿到路由传过来的id
      console.log('typeId = ' + this.typeId);
      try {
        this.types = JSON.parse(localStorage.getItem(constant.types));  // 从localStorage中取出数据
        this.types.forEach(function (type) {
          console.log(type);
          if (type._id === that.typeId) {
            that.typeName = type.typeName;
          }
        });
      } catch (e) {
        console.log(e);
      }
      // 请求文章列表数据
      this.$http.get('/blogWaka/articleList/' + this.typeId).then(response => {  // 请求成功
        console.log('请求成功 response = ');
        console.log(response);
        this.articles = response.body.data;
      }, response => {  // 请求失败，因为mock数据没有请求失败，所以暂时没有处理
        console.log('请求失败 response = ');
        console.log(response);
      });
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

  // 引入颜色css
  @import "../../common/css/color.scss";

  .page {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  /*文章列表*/
  .articles {
    margin-top: 48px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

</style>
