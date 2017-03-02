<template>
  <section class="page">
    <!--顶部工具栏-->
    <mu-appbar class="app-bar" title="后台管理">
      <!--返回按钮-->
      <mu-icon-button icon="arrow_back" slot="left" @click="back"/>
      <!--右侧菜单-->
      <mu-icon-menu icon="more_vert" slot="right">
      </mu-icon-menu>
    </mu-appbar>

  </section>
</template>

<script>
  export default {
    data () {
      return {
        adminItems: []
      }
    },
    // Vue实例创建之后被调用
    created () {

    },
    // activated
    activated () {

    },
    methods: {
      // 后退
      back () {
        window.history.back();
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

  // 引入颜色css
  @import "../../../common/css/color.scss";

  .page {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

</style>
