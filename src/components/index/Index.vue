<template>

  <!--index页整个容器-->
  <section>

    <!--头部-->
    <header>

      <!--顶部抽屉按钮和github-->
      <div class="top">
        <mu-icon-button>
          <i class="material-icons">list</i>
        </mu-icon-button>
        <mu-icon-button>
          <i class="iconfont icon-github"></i>
        </mu-icon-button>
      </div>

      <!--头像-->
      <div class="avatar"></div>

      <!--提示语-->
      <div class="welcome">Welcome to waka's blog</div>
    </header>

    <!--文章列表-->
    <article-item></article-item>
  </section>

</template>

<script>
  import ArticleItem from '../../components/index/article-item/ArticleItem.vue';

  export default {
    // 包含的组件
    components: {
      ArticleItem
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

  // 引入颜色css
  @import "../../common/css/color.scss";

  header {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 400px;
    color: #fff;
    background-color: $blue500;

    .top {
      display: flex;
      justify-content: space-between;
      width: 100%;
    }

    .avatar {
      height: 150px;
      width: 150px;
      margin-top: 50px;
      background: url(http://img.hb.aicdn.com/19dd42725e125bb7424785afbddeee41d5eb13931b097-evWO7z_fw658) center no-repeat;
      background-size: cover;
      border-radius: 50%;
      box-shadow: 5px 10px 10px $blue800;
    }

    .welcome {
      margin-top: 20px;
      font-size: 2.5em;
      font-family: "Comic Sans MS";
    }
  }
</style>
