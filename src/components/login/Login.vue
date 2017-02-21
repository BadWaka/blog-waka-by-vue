<template>
  <section class="page">
    <mu-paper class="loginView" :zDepth="2">
      <mu-tabs :value="activeTab" @change="handleTabChange">
        <mu-tab value="tab1" title="登录"/>
        <!--<mu-tab value="tab2" title="注册"/>-->
      </mu-tabs>
      <section class="main">
        <div class="login" v-if="activeTab === 'tab1'">
          <mu-text-field class="username" label="用户名" icon="person" labelFloat fullWidth v-model="login.username"/>
          <mu-text-field class="password" type="password" label="密码" icon="lock" labelFloat fullWidth
                         v-model="login.password"/>
          <mu-checkbox class="rememberPassword" label="记住密码" v-model="login.isRememberPassword"/>
          <mu-raised-button label="登录" class="btnLogin" primary @click="btnLogin"/>
        </div>
        <div v-if="activeTab === 'tab2'">

        </div>
      </section>
    </mu-paper>
  </section>
</template>

<script>

  import constant from '../../common/js/constant';
  import router from '../../router';

  export default {
    data () {
      return {
        activeTab: 'tab1',
        login: {
          username: '',
          password: '',
          isRememberPassword: false
        }
      }
    },
    methods: {
      handleTabChange (val) {
        this.activeTab = val
      },
      btnLogin () {
        const that = this;
        console.log(this.login);
        console.log('点击登录 btnLogin');
        // 请求添加新类型接口
        this.$http.post('/blogWaka/login', {
          username: this.login.username,
          password: this.login.password
        }).then(response => {
          console.log('请求成功 response = ');
          console.log(response);
          if (response.body.errorCode === 0) {
            if (that.login.isRememberPassword === true) {
              console.log('写入accessToken');
              localStorage[constant.accessToken] = response.body.data;
            }
            router.push('/blogWaka');  // 跳转到文章详情页
          }
        }, response => {
          console.log('请求失败 response = ');
          console.log(response);
        });
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

  .page {
    height: 100%;
    min-height: 750px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .loginView {
    width: 500px;

    .main {
      padding: 48px;

      .login {
        display: flex;
        flex-direction: column;
        align-items: flex-end;

        .rememberPassword {
          margin-top: 12px;
        }

        .btnLogin {
          align-self: center;
          margin-top: 24px;
          width: 80%;
        }
      }

    }
  }


</style>
