<template>
  <section class="page">
    <!--appbar-->
    <mu-appbar class="app-bar" title="文章标题">
      <mu-icon-button icon="arrow_back" slot="left" @click="back"/>
      <mu-icon-menu icon="more_vert" slot="right">
        <mu-menu-item title="菜单 1"/>
        <mu-menu-item title="菜单 2"/>
        <mu-menu-item title="菜单 3"/>
        <mu-menu-item title="菜单 4"/>
        <mu-menu-item title="菜单 5"/>
      </mu-icon-menu>
    </mu-appbar>

    <!--文章详情-->
    <mu-paper class="article" :zDepth="2">
      <!--使用v-html输出纯HTML-->
      <div v-html="articleContent"></div>
    </mu-paper>
  </section>
</template>

<script>

  // 引入marked，用来将Markdown转换成HTML
  import marked from 'marked';

  export default {
    data () {
      return {
        articleContent: '# 你好'
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
      console.log('created');
      // Markdown转换HTML
      this.articleContent = marked(this.articleContent);
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
    padding-bottom: 20px;
  }

  .app-bar {
    background-color: $blue500;
  }

  .article {
    width: 90%;
    margin-top: 24px;
    padding: 24px;
  }
</style>
