import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

// 导入需要路由的页面
import Index from 'components/index/Index';
import ArticleDetail from 'components/article-detail/ArticleDetail'

// 配置路由
export default new Router({
  routes: [
    // 主页
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    // 文章详情页
    {
      path: '/articleDetail',
      name: 'ArticleDetail',
      component: ArticleDetail
    }
  ]
})
