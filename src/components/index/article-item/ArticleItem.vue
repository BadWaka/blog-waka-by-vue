<template>

  <mu-paper class="mu-paper" :zDepth="2">
    <section class="wrapper" @click="itemClick">
      <!--标题-->
      <div class="title">{{article.title}}</div>
      <!--简介-->
      <div class="intro">{{article.intro}}</div>
      <!--额外信息-->
      <div class="extra">
        <span class="type">{{article.typeName}}</span>
      </div>
    </section>
  </mu-paper>

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

  .mu-paper {
    width: 95%;
    margin-bottom: 20px;
  }

  .wrapper {
    padding: 36px;

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
</style>
