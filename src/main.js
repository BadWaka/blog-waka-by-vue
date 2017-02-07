// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 在ESLint规定中，如果new了一个新对象，是必须要赋值给某一个变量的，否则会编译报错
// 但是 new Vue 是不需要赋值给变量的，这时候就需要一个额外的例外
// 而 /* eslint-disable no-new */ 这段注释的意思就是给下方的代码一个特例，下方的代码在ESLint检查的时候可以忽略no-new这个错误
// 所以 /* eslint-disable no-new */ 这个注释很重要，不能删除

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
});
