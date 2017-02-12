<template>
  <section class="page">
    <!--app bar-->
    <mu-appbar title="添加文章">
      <mu-icon-button icon='arrow_back' slot="left"/>
    </mu-appbar>

    <!--文章详情-->
    <mu-paper class="article" :zDepth="2">
      <form>
        <mu-text-field label="标题" labelFloat fullWidth v-model="article.title"/>
        <mu-text-field label="简介" labelFloat fullWidth v-model="article.intro"/>
        <mu-text-field label="链接" labelFloat fullWidth v-model="article.link"/>
        <mu-text-field label="类型" labelFloat fullWidth v-model="article.typeName"/>
        <mu-text-field label="图片地址" labelFloat fullWidth v-model="article.img"/>
        <mu-text-field label="内容" labelFloat multiLine :rows="10" :rowsMax="30" fullWidth
                       v-model="article.content"/>
        <mu-raised-button label="添加" primary @click="addArticle"/>
      </form>
    </mu-paper>
  </section>
</template>

<script>
  export default {
    data () {
      return {
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
      addArticle () {
        console.log(JSON.stringify(this.article));
        this.$http.post('/blogWaka/admin/article/new', {
          article: this.article
        }).then(response => {
          console.log(response);
        }).then(response => {
          console.log(response);
        });
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

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
  }
</style>
