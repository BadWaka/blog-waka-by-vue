<template>
  <!--使用<router-link>包裹，因为这里需要改变路由，点击后跳转到文章详情页-->
  <!--这里还不完整，因为以后为了区分文章，还需要加入文章id,因为暂时是做样式，所以忽略-->
  <section class="wrapper" @click="articleDetail">
    <!--使用Muse-UI的纸张控件-->
    <mu-paper class="wrapper2" :zDepth="2">
      <!--标题-->
      <div class="title">{{article.title}}</div>
      <!--简介-->
      <div v-if="article.intro" class="intro">简介：{{article.intro}}</div>
      <!--额外信息-->
      <div class="extra">
        <!--类型名-->
        <mu-raised-button :label="article.typeName" class="lower-case" @click="btnType"/>
        <span class="updateAt">{{article.updateAt}}</span>
      </div>
    </mu-paper>
  </section>
</template>

<script>
  import router from '../../../router';

  export default {
    // 定义从父控件继承的props
    props: {
      // 规定属性article的类型
      article: {
        type: Object
      }
    },
    data () {
      return {}
    },
    created () {
      this.timeFormat();
    },
    methods: {
      // 跳转到文章详情页
      articleDetail () {
        console.log('跳转到文章详情页 articleDetail');
        router.push('/blogWaka/articleDetail/' + this.article._id);
      },
      // 点击类型按钮
      btnType (e) {
        console.log('点击类型按钮 btnType');
        e.stopPropagation();  // 阻止事件冒泡
        e.cancelBubble = true;  // IE，阻止事件冒泡
        let typeId = this.article.typeId;
        router.push('/blogWaka/articleList/' + typeId); // 跳转到文章列表
      },
      // 时间格式化
      timeFormat () {
        let updateAt = this.article.meta.updateAt;
        updateAt = new Date(updateAt);
        updateAt = updateAt.toLocaleString();
        this.article.updateAt = updateAt;
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

  .lower-case {
    text-transform: none;
  }

  .wrapper {
    width: 90%;
    margin-bottom: 20px;
    color: #000;
    cursor: pointer;

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

      .extra {
        display: flex;
        align-items: center;

        .updateAt {
          margin-left: 24px;
        }
      }

    }

  }

</style>
