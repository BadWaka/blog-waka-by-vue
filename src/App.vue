<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style lang="scss" rel="stylesheet/scss">

  // 引入颜色css
  @import "./common/css/color.scss";

  html, body {
    font-family: Helvetica, STHeiti;
  }

</style>
