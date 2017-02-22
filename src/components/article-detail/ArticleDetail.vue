<template>
  <section class="page">
    <!--顶部工具栏-->
    <mu-appbar class="app-bar" :title="article.title">
      <!--返回按钮-->
      <mu-icon-button icon="arrow_back" slot="left" @click="back"/>
      <!--右侧菜单-->
      <mu-icon-menu icon="more_vert" slot="right">
        <mu-menu-item title="编辑" @click="edit"/>
        <mu-menu-item title="分享"/>
      </mu-icon-menu>
    </mu-appbar>

    <!--文章详情-->
    <mu-paper class="article" :zDepth="2">
      <!--使用v-html输出纯HTML-->
      <div class="markdown" v-html="article.articleContentHTML"></div>
    </mu-paper>
  </section>
</template>

<script>

  // 引入highlight.js来将代码块高亮
  // 因为文件夹名最好不要有. 所以叫highlightjs，其实它们是一样的，只不过highlightjs的版本略低
  // highlight.js模块的版本是9.9.0
  // highlightjs模块的版本是9.8.0
  import highlightjs from 'highlightjs';
  import router from '../../router';
  import constant from '../../common/js/constant';
  import marked from 'marked';  // 引入marked，用来将Markdown转换成HTML
  // 配置marked
  marked.setOptions({
    // 配置高亮
    highlight: function (code, lang, callback) {
      return highlightjs.highlightAuto(code).value;   // 这里highlightjs会自动给代码增加类
    }
  });

  export default {
    data () {
      return {
        article: {}
      }
    },
    // Vue实例创建之后被调用
    created () {
      this.articleId = this.$route.params.id; // 从vue-router的路由拿到路由传过来的id
      this.getArticleDetailById();
    },
    methods: {
      // 后退
      back () {
        window.history.back();
      },
      // 跳转到编辑页
      edit () {
        console.log('跳转到编辑页 edit');
        if (localStorage[constant.accessToken]) {
          router.push('/blogWaka/admin/addArticle');
          localStorage[constant.articleDetail] = JSON.stringify(this.article);  // 把文章详情保存到localStorage中，用来在添加文章的页面展示已填写的数据
        } else {
          router.push('/blogWaka/login');
        }
      },
      // 根据id获取文章详情
      getArticleDetailById () {
        // 请求文章详情，要带上文章id
        this.$http.get('/blogWaka/articleDetail/' + this.articleId).then(response => {
          console.log(response);
          // 拿到数据
          this.article = response.body.data;
          let mdData = this.article.content;  // 拿到md格式内容数据
          // 因为简书里的#后接文字是可以被识别的，但是marked必须# 后接文字才可以被识别
          // 这里我想做一个需求，"###标题" 改为 "### 标题",但是我不知道怎么做
          mdData = mdData.replace(/#+/g, '# ');
          this.article.articleContentHTML = marked(mdData);    // html格式数据
        }, response => {  // 请求失败
          console.log(response);
        });
      }
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

  .article {
    width: 90%;
    margin: 48px;
    padding: 48px;
  }

  .markdown {
    width: 100%;
  }

</style>
