import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

// import Hello from 'components/Hello'
import Index from 'components/index/Index';

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    }
  ]
})
