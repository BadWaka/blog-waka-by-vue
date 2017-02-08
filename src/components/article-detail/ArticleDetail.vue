<template>
  <section>
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

  .app-bar {
    background-color: $blue500;
  }
</style>
