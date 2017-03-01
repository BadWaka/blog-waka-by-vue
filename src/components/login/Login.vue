<template>
  <section class="page">

    <!--外面的卡片样式-->
    <mu-paper class="loginView" :zDepth="2">

      <!--tab栏-->
      <mu-tabs :value="activeTab" @change="handleTabChange">
        <mu-tab value="tab1" title="登录"/>
        <mu-tab value="tab2" title="注册"/>
      </mu-tabs>

      <!--中间的框-->
      <section class="main">

        <!--登录框-->
        <div class="login" v-if="activeTab === 'tab1'">
          <div class="row">
            <mu-text-field label="用户名" icon="person" labelFloat fullWidth
                           v-model="loginOpts.username"/>
            <i class="material-icons icon-close" @click="loginOpts.username=''">close</i>
          </div>

          <div class="row">
            <mu-text-field type="password" label="密码" icon="lock" labelFloat fullWidth
                           v-model="loginOpts.password"/>
            <i class="material-icons icon-close" @click="loginOpts.password=''">close</i>
          </div>
          <mu-checkbox class="rememberPassword" label="记住密码" v-model="loginOpts.isRememberPassword"/>
          <mu-raised-button label="登录" class="btnLogin" primary @click="btnLogin"/>
        </div>

        <!--注册框-->
        <div class="login" v-if="activeTab === 'tab2'">
          <div class="row">
            <mu-text-field label="用户名" hintText="请输入用户名" icon="person" labelFloat fullWidth
                           v-model="signUpOpts.username" autocomplete="off"/>
            <i class="material-icons icon-close" @click="signUpOpts.username=''">close</i>
          </div>
          <div class="row">
            <!--这里会有个问题，当你的type为password时，浏览器会记住密码并自动帮你填写上，然而你并不想让它帮你填，网上说加 autocomplete="off" 这个属性，但是这个属性在chrome中不怎么顶用，所以是可以这样解决，把 type="password" 这个字段去掉，加上 onfocus="this.type='password'" 也没有什么用，所以还是它爱记就让它记住吧-->
            <mu-text-field type="password" label="密码" hintText="请输入密码" icon="lock_outline" labelFloat
                           fullWidth
                           v-model="signUpOpts.password" autocomplete="off"/>
            <i class="material-icons icon-close" @click="signUpOpts.password=''">close</i>
          </div>
          <div class="row">
            <mu-text-field type="password" label="确认密码" hintText="请再次输入密码" icon="lock" labelFloat fullWidth
                           v-model="signUpOpts.passwordAgain" autocomplete="off"/>
            <i class="material-icons icon-close" @click="signUpOpts.passwordAgain=''">close</i>
          </div>
          <mu-raised-button label="注册" class="btnLogin" primary @click="btnSignUp"/>
        </div>

      </section>
    </mu-paper>

    <!--提示框-->
    <mu-snackbar v-if="snackbar" :message="snackbarMsg" action="关闭" @actionClick="hideSnackbar" @close="hideSnackbar"/>

  </section>
</template>

<script>

  import constant from '../../common/js/constant';
  import router from '../../router';

  export default {
    data () {
      return {
        // snackbar
        snackbar: false,  // snackbar开关
        snackbarMsg: '',  // snackbar提示语
        // 当前的tab
        activeTab: 'tab1',
        // loginOpts 登录参数
        loginOpts: {
          username: '',
          password: '',
          isRememberPassword: false
        },
        // signUpOpts 注册参数
        signUpOpts: {
          username: '',
          password: '',
          passwordAgain: ''
        }
      }
    },
    methods: {
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
      // 切换tab
      handleTabChange (val) {
        this.activeTab = val
      },
      // 点击登录
      btnLogin () {
        console.log('点击登录 btnLogin');
        console.log(this.loginOpts);
        this.login();
      },
      // 登录
      login () {
        const that = this;
        this.$http.post('/blogWaka/login', {
          username: this.loginOpts.username,
          password: this.loginOpts.password
        }).then(response => {
          console.log('请求成功 response = ');
          console.log(response);
          if (response.body.errorCode === 0) {
            if (that.loginOpts.isRememberPassword === true) {
              console.log('写入accessToken');
              localStorage[constant.accessToken] = response.body.data;
            }
            window.history.back();  // 后退到之前的页面
          } else {
            that.snackbarMsg = response.body.data;
            that.showSnackbar();
          }
        }, response => {
          console.log('请求失败 response = ');
          console.log(response);
        });
      },
      // 点击注册
      btnSignUp () {
        console.log('点击注册 btnSignUp');
        console.log(this.signUpOpts);
        if (this.signUpOpts.password !== this.signUpOpts.passwordAgain) {
          this.snackbarMsg = '两次输入的密码不一致，请核对';
          this.showSnackbar();
          return;
        }
        this.signUp();
      },
      // 注册
      signUp () {
        const that = this;
        this.$http.post('/blogWaka/signUp', {
          username: this.signUpOpts.username,
          password: this.signUpOpts.password
        }).then(response => {
          console.log('请求成功 response = ');
          console.log(response);
          if (response.body.errorCode === 0) {
            that.snackbarMsg = response.body.data;
            that.showSnackbar();
            that.activeTab = 'tab1';
          } else {
            that.snackbarMsg = response.body.data;
            that.showSnackbar();
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

  .row {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: nowrap;

    .icon-close {
      padding-left: 16px;
      padding-top: 16px;
      color: #767676;
      transform-origin: 70% 70%;
      transition: 0.5s;
    }

    .icon-close:hover {
      /*transform: rotate(180deg);*/
      transform: scale(1.2, 1.2);
    }

    .icon-close:active {

      /*transform: rotate(60deg);*/
    }
  }


</style>
