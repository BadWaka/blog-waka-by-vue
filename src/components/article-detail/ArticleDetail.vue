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
      <div class="markdown" v-html="articleContent"></div>
    </mu-paper>
  </section>
</template>

<script>

  // 引入marked，用来将Markdown转换成HTML
  import marked from 'marked';
  // 配置marked
  marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false, // pedantic adj. 迂腐的；学究式的；卖弄学问的；假装学者的
    sanitize: false,
    smartLists: true,
    smartypants: false
  });

  export default {
    data () {
      return {
        articleContent: '#你好'
      }
    },
    methods: {
      // 后退
      back () {
        window.history.back();
      },
      // 异步请求
      request () {

      }
    },
    // Vue实例创建之后被调用
    created () {
      this.$http.get('/api/article/1').then(response => {
        console.log(response);
        // 拿到数据
        let mdData = response.body.data;  // md格式数据
        mdData = mdData.replace(/#/g, '# ');  // 因为简书里的#后接文字是可以被识别的，但是marked必须# 后接文字才可以被识别
        let htmlData = marked(mdData);    // html格式数据
//        console.log(htmlData);
        this.articleContent = htmlData;
      }, response => {  // 请求失败
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
    padding-bottom: 20px;
  }

  .app-bar {
    background-color: $blue500;
  }

  .article {
    width: 90%;
    margin-top: 24px;
    padding: 48px;
  }

  .markdown {
    width: 100%;
  }


</style>
