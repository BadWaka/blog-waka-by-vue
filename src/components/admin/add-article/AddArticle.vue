<template>
  <section class="page">
    <!--app bar-->
    <mu-appbar class="bg-color-primary" title="添加文章">
      <mu-icon-button icon='arrow_back' slot="left" @click="back"/>
    </mu-appbar>

    <!--文章详情-->
    <mu-paper class="article" :zDepth="2">
      <form>
        <mu-text-field label="*标题" labelFloat fullWidth v-model="article.title"/>
        <mu-text-field label="*类型" labelFloat fullWidth v-model="article.typeName"/>
        <mu-text-field label="简介" labelFloat fullWidth v-model="article.intro"/>
        <mu-text-field label="链接" labelFloat fullWidth v-model="article.link"/>
        <mu-text-field label="图片地址" labelFloat fullWidth v-model="article.img"/>
        <mu-text-field label="*内容" labelFloat multiLine :rows="10" :rowsMax="30" fullWidth
                       v-model="article.content"/>
        <mu-raised-button class="bg-color-primary btn" label="添加" primary @click="formValidate"/>
        <mu-raised-button class="bg-color-primary btn" label="添加假数据" primary @click="addMockData"/>
      </form>
    </mu-paper>

    <mu-snackbar v-if="snackbar" :message="snackbarMsg" action="关闭" @actionClick="hideSnackbar" @close="hideSnackbar"/>
  </section>
</template>

<script>
  export default {
    data () {
      return {
        // snackbar
        snackbar: false,  // snackbar开关
        snackbarMsg: '',  // snackbar提示语
        // 文章数据
        article: {
          title: '',
          intro: '',
          link: '',
          typeName: '',
          img: '',
          content: ''
        }
      }
    },
    methods: {
      // 后退
      back () {
        window.history.back();
      },
      // 显示错误提示
      showSnackbar () {
        this.snackbar = true;
        if (this.snackTimer) {
          clearTimeout(this.snackTimer);
        }
        this.snackTimer = setTimeout(() => {
          this.snackbar = false;
        }, 2000);
      },
      // 隐藏错误提示
      hideSnackbar () {
        this.snackbar = false;
        if (this.snackTimer) {
          clearTimeout(this.snackTimer);
        }
      },
      // 表单校验
      formValidate () {
        if (!this.article.title || !this.article.typeName || !this.article.content) {
          // 如果必填字段为空，弹出提示语
          this.snackbarMsg = '请填写带*字段';
          this.showSnackbar();
          return;
        }
        this.addArticle();
      },
      // 添加文章
      addArticle () {
        console.log(JSON.stringify(this.article));
        // 请求添加新文章接口
        this.$http.post('/blogWaka/admin/article/new', {
          article: this.article
        }).then(response => {
          console.log(response);
        }).then(response => {
          console.log(response);
        });
      },
      // 添加假数据
      addMockData () {
        const article = {
          title: '标题',
          typeName: '类型',
          content: '内容'
        };
        // 请求添加新文章接口
        this.$http.post('/blogWaka/admin/article/new', {
          article: article
        }).then(response => {
          console.log(response);
          if (response.body.errorCode === 0) {
            this.snackbarMsg = response.body.data;
            this.showSnackbar();
          }
        }).then(response => {
          console.log(response);
        });
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

  form {
    padding: 48px;
    display: flex;
    flex-direction: column;
  }

  .article {
    margin: 48px;
    width: 90%;

    .btn {
      margin-bottom: 24px;
    }
  }
</style>
