<template>
  <!--index页整个容器-->
  <section class="page">

    <!--顶部工具栏 使用fixed固定在顶部-->
    <div class="top">
      <!--左侧抽屉开关-->
      <mu-icon-button @click="drawerToggle">
        <i class="material-icons">list</i>
      </mu-icon-button>
      <!--右侧GitHub链接-->
      <mu-icon-button @click="settings">
        <i class="material-icons">settings</i>
        <!--<i class="iconfont icon-github"></i>-->
      </mu-icon-button>
    </div>

    <!--点击抽屉开关打开的侧边菜单-->
    <mu-drawer class="drawer" right :open="isDrawerOpen" @close="drawerToggle">
      <!--标题栏-->
      <mu-appbar class="drawer-header" title="类别"/>
      <mu-list>
        <!--类别List-->
        <mu-list-item v-for="type in types" :title="type.typeName" @click="openArticlesByType(type)"/>
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

    <!--底部分页栏-->
    <section class="pagination-wrapper">
      <mu-pagination :total="total" :current="current" @pageChange="paginationClick"
                     :pageSize="pageSize"></mu-pagination>
    </section>

  </section>
</template>

<script>

  import ArticleItem from '../../components/article-list/article-item/ArticleItem.vue';
  import router from '../../router';
  import constant from '../../common/js/constant';

  export default {
    // 包含的组件
    components: {
      ArticleItem
    },
    // 数据
    data () {
      return {
        current: 1, // 当前页数，Muse-UI默认是从1开始算的
        total: 1,  // 数据总数，默认写0的话 Muse-UI会出现一些问题
        pageSize: 10,  // 每页数据条数，默认每页10条
        articlesFull: {}, // 总的文章数据
        articles: {}, // 要展现的文章数据
        isDrawerOpen: false,  // 侧边栏开关
        types: []  // 类型
      }
    },
    // 实例创建后被调用；生命周期钩子
    created () {
      this.getArticles();
      this.getTypes();
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
      },
      // 跳转到控制台
      settings () {
        router.push('/blogWaka/admin/addArticle');
      },
      // 打开文章列表根据类型
      openArticlesByType (type) {
        console.log(type);
        router.push('/blogWaka/articleList/' + type._id);
      },
      // 获得所有文章
      getArticles () {
        // 请求文章列表数据
        this.$http.get('/blogWaka/articles').then(response => {  // 请求成功
          if (response.status !== 200) {
            // 输出错误信息
            this.articles = 'status = ' + response.status + ' errorCode = ' + response.body.errorCode;
            return;
          }
          this.articlesFull = response.body.data; // 获得所有数据
          this.total = this.articlesFull.length;  // 获得总数目，用来智能展示分页页数
          this.showArticles();
        }, response => {  // 请求失败，因为mock数据没有请求失败，所以暂时没有处理
          this.articles = '请求失败';
        });
      },
      // 获得所有类型
      getTypes () {
        console.log('getTypes');
        this.$http.get('/blogWaka/types').then(response => {
          // 请求成功
          console.log(response);
          if (response.body.errorCode === 0) {
            this.types = response.body.data;
            localStorage.setItem(constant.types, JSON.stringify(this.types)); // 把类型数据写到localStorage中
          }
        }, response => {
          // 请求失败
          console.log(response);
        });
      },
      // 分页栏点击
      paginationClick (index) {
        console.log('分页栏点击 index = ' + index);
        this.current = index;
        this.showArticles();
      },
      // 根据页数展示数据
      showArticles () {
        // 假设默认每页10条数据
        // current是1,则从下标0开始，到9结束
        // 传入的current是2,则从下标10开始，到19结束
        const start = (this.current - 1) * this.pageSize;
        const end = this.current * this.pageSize - 1;
        this.articles = this.articlesFull.slice(start, end);
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
    z-index: 999;
  }

  .drawer {
    z-index: 9999;
  }

  header {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 360px;
    color: #fff;
    background-color: $color-primary;

    .avatar {
      height: 150px;
      width: 150px;
      margin-top: 100px;
      background: url(http://upload.jianshu.io/users/upload_avatars/1828354/ffda24139fb9.png?imageMogr/thumbnail/120x120/quality/100) center no-repeat;
      background-size: cover;
      border-radius: 50%;
      box-shadow: 5px 10px 10px $blue500;
    }

    .welcome {
      margin-top: 20px;
      font-size: 24px;
      font-family: "Comic Sans MS";
    }
  }

  /*文章列表*/
  .articles {
    margin-top: 48px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .pagination-wrapper {
    display: flex;
    justify-content: center;
    margin-bottom: 48px;
  }
</style>
