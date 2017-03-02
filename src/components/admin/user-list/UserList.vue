<template>
  <section class="page">
    <!--顶部工具栏-->
    <mu-appbar class="app-bar" title="用户列表">
      <!--返回按钮-->
      <mu-icon-button icon="arrow_back" slot="left" @click="back"/>
      <!--右侧菜单-->
      <mu-icon-menu icon="more_vert" slot="right">
      </mu-icon-menu>
    </mu-appbar>

    <!--用户列表-->
    <section class="users">
      <div v-for="user in users">{{user.username}}</div>
    </section>

    <!--底部分页栏-->
    <section class="pagination-wrapper">
      <mu-pagination :total="total" :current="current" @pageChange="paginationClick"
                     :pageSize="pageSize"></mu-pagination>
    </section>

  </section>
</template>

<script>
  export default {
    data () {
      return {
        current: 1, // 当前页数，Muse-UI默认是从1开始算的
        total: 1,  // 数据总数，默认写0的话 Muse-UI会出现一些问题
        pageSize: 10,  // 每页数据条数，默认每页10条
        usersFull: {}, // 总的文章数据
        users: {} // 要展现的文章数据
      }
    },
    // Vue实例创建之后被调用
    created () {

    },
    // activated
    activated () {
      this.getUserList();
    },
    methods: {
      // 后退
      back () {
        window.history.back();
      },
      // 获得用户列表
      getUserList () {
        console.log('获得用户列表 getUserList');
        const that = this;
        this.$http.get('/blogWaka/admin/userList').then(response => {
          // 请求成功
          console.log(response);
          if (response.body.errorCode === 0) {
            that.usersFull = response.body.data;
            that.total = that.usersFull.length;  // 获得总数目，用来智能展示分页页数
            that.showData();
          }
        }, response => {
          // 请求失败
          console.log('请求失败 response = ');
          console.log(response);
        });
      },
      // 分页栏点击
      paginationClick (index) {
        console.log('分页栏点击 index = ' + index);
        this.current = index;
        this.showData();
      },
      // 根据页数展示数据
      showData () {
        // 假设默认每页10条数据
        // current是1,则从下标0开始，到9结束
        // 传入的current是2,则从下标10开始，到19结束
        const start = (this.current - 1) * this.pageSize;
        const end = this.current * this.pageSize - 1;
        this.users = this.usersFull.slice(start, end);
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

  /*底部分页栏*/
  .pagination-wrapper {
    display: flex;
    justify-content: center;
    margin-bottom: 48px;
  }

</style>
