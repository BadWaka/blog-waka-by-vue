<template>
  <router-link class="wrapper" to="/articleDetail">
    <mu-paper class="wrapper2" :zDepth="2">
      <!--标题-->
      <div class="title">{{article.title}}</div>
      <!--简介-->
      <div class="intro">{{article.intro}}</div>
      <!--额外信息-->
      <div class="extra">
        <span class="type">{{article.typeName}}</span>
      </div>
    </mu-paper>
  </router-link>

</template>

<script>
  export default {
    // 继承自父组件的属性
    props: {
      article: {
        type: Object
      }
    },
    data () {
      return {
        article: this.article
      }
    },
    methods: {
      itemClick () {
        console.log('itemClick');
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

  .wrapper {
    width: 90%;
    margin-bottom: 20px;
    color: #000;

    .wrapper2 {
      padding: 24px;

      .title {
        font-size: 24px;
        margin-bottom: 24px;
      }

      .intro {
        font-size: 16px;
        margin-bottom: 16px;
      }

      .type {
        font-size: 12px;
        margin-bottom: 16px;
      }
    }

  }

</style>
