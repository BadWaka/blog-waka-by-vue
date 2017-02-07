<template>

  <section class="article-item">
    <mu-paper class="wrapper" :zDepth="3">
      <div class="title">title</div>
      <div class="img"></div>
      <div class="intro"></div>
      <div class="extra">
        <span class="type"></span>
      </div>
    </mu-paper>
  </section>

</template>

<script>
  export default {
    data () {
      return {
        article: {}
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

  .article-item {
    display: flex;
    justify-content: center;
  }

  .wrapper {
    padding: 50px;
    height: 500px;
    width: 80%;

    .title {

    }

    .img {

    }
  }
</style>
