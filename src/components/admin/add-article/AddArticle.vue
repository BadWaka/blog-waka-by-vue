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
        <!--v-model="article.typeId_typeName"-->
        <mu-select-field class="type-select" label="*类型" :maxHeight="300" labelFloat v-model="currentTypeIndex">
          <mu-menu-item v-for="(type,index) in types" :title="type.typeName" :value="index"/>
          <mu-menu-item title="添加新类型" value="-1" @click="openDialog"/>
        </mu-select-field>
        <mu-text-field label="简介" labelFloat fullWidth v-model="article.intro"/>
        <mu-text-field label="链接" labelFloat fullWidth v-model="article.link"/>
        <mu-text-field label="图片地址" labelFloat fullWidth v-model="article.img"/>
        <mu-text-field label="*内容" labelFloat multiLine :rows="10" :rowsMax="30" fullWidth
                       v-model="article.content"/>
        <mu-raised-button class="bg-color-primary btn" label="添加" primary @click="btnAddArticle"/>
      </form>
    </mu-paper>

    <!--提示框-->
    <mu-snackbar v-if="snackbar" :message="snackbarMsg" action="关闭" @actionClick="hideSnackbar" @close="hideSnackbar"/>
    <!--添加新类型对话框-->
    <mu-dialog :open="dialog" title="添加新类型" @close="closeDialog">
      <mu-text-field class="full-width" label="请输入类型名" labelFloat v-model="newType"/>
      <mu-flat-button slot="actions" @click="closeDialog" primary label="取消"/>
      <mu-flat-button slot="actions" primary @click="btnAddType" label="确定"/>
    </mu-dialog>
  </section>
</template>

<script>
  export default {
    data () {
      return {
        currentTypeIndex: 0,
        newType: '',
        types: [],
        // snackbar
        snackbar: false,  // snackbar开关
        snackbarMsg: '',  // snackbar提示语
        // dialog
        dialog: false,
        // 文章数据
        article: {
          title: '',
          intro: '',
          link: '',
          typeId_typeName: '',
          typeId: '',
          typeName: '',
          img: '',
          content: ''
        }
      }
    },
    created () {
      this.getTypes();
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
      // 打开对话框
      openDialog () {
        this.dialog = true;
      },
      // 关闭对话框
      closeDialog () {
        this.dialog = false;
      },
      /**
       * 获得所有类型
       * @param isUpdateCurrentType 是否更新当前选中类型
       */
      getTypes (isUpdateCurrentType) {
        console.log('获得所有类型 getTypes');
        const that = this;
        this.$http.get('/blogWaka/types').then(response => {
          console.log('请求成功 response = ');
          console.log(response);
          if (response.body.errorCode !== 0) {
            return;
          }
          this.types = response.body.data;  // 获得最新类型数据
          if (isUpdateCurrentType) {
            // 如果需要更新当前类型
            that.types.forEach(function (type, index) { // 遍历types数组
              if (type.typeName === that.newType) { // 找到数组中最新添加的那项
                that.currentTypeIndex = index;  // 把数组中该元素的下标赋给当前选中项
                that.newType = '';  // 把新类型置为空
              }
            });
          }
        }, response => {
          console.log('请求失败 response = ');
          console.log(response);
        });
      },
      // 添加新类型按钮
      btnAddType () {
        console.log('添加新类型按钮 btnAddType');
        this.addTypeFormValidate();
      },
      // 类型表单校验
      addTypeFormValidate () {
        console.log('类型表单校验 addTypeFormValidate');
        if (!this.newType) {
          this.snackbarMsg = '类型名不能为空，请重新填写';
          this.showSnackbar();
          return;
        }
        this.addType();
      },
      // 添加新类型
      addType () {
        console.log('添加新类型 addType');
        // 请求添加新类型接口
        this.$http.post('/blogWaka/admin/type/new', {
          type: {
            typeName: this.newType
          }
        }).then(response => {
          console.log('请求成功 response = ');
          console.log(response);
          if (response.body.errorCode === 0) {
            // 添加成功
            this.getTypes(true);
          }
          this.snackbarMsg = response.body.data;
          this.showSnackbar();
          this.closeDialog();
        }, response => {
          console.log('请求失败 response = ');
          console.log(response);
        });
      },
      // 点击添加文章按钮
      btnAddArticle () {
        console.log('当前选中的文章类型的下标 currentTypeIndex = ' + this.currentTypeIndex);
        this.currentTypeIndex = 0;
      },
      // 文章表单校验
      addArticleFormValidate () {
        console.log(JSON.stringify(this.article));
        const array = this.article.typeId_typeName.split('_');
        this.article.typeId = array[0];
        this.article.typeName = array[1];
        if (!this.article.title || !this.article.typeId || !this.article.typeName || !this.article.content) {
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
          this.snackbarMsg = response.body.data;
          this.showSnackbar();
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

  .full-width {
    width: 100%;
  }

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

    .type-select {
      width: 100%;
    }

    .btn {
      margin-bottom: 24px;
    }
  }
</style>
