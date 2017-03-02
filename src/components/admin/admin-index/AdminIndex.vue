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

    <section class="list">
      <mu-raised-button v-for="item in adminItems" :label="item.name" @click="eventBus(item.clickEvent)"
                        class="item" primary fullWidth/>
    </section>

  </section>
</template>

<script>

  import router from '../../../router';

  export default {
    data () {
      return {
        adminItems: [{
          name: '添加文章',
          clickEvent: 'addArticle'
        }, {
          name: '用户列表',
          clickEvent: 'userList'
        }]
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
      },
      /**
       * 事件处理总线
       * 用于解决vue绑定事件的时候不能动态赋值的问题
       *
       * @param eventName
       * @param params
       */
      eventBus (eventName, params) {
        this[eventName](params);
      },
      // 添加文章
      addArticle () {
        console.log('addArticle');
        router.push('/blogWaka/admin/addArticle');
      },
      // 用户列表
      userList () {
        console.log('userList');
        router.push('/blogWaka/admin/userList');
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

  .list {
    width: 100%;
    padding: 48px;

    .item {
      margin-bottom: 24px;
    }
  }

</style>
