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

    </mu-paper>
  </section>
</template>

<script>
  export default {
    methods: {
      back () {
        console.log('back');
        window.history.back();
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
    padding-bottom: 20px;
  }

  .app-bar {
    background-color: $blue500;
  }

  .article {
    width: 90%;
    height: 500px;
    margin-top: 48px;
  }
</style>
