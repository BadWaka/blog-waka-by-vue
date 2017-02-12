import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

// 导入需要路由的页面
import Index from 'components/index/Index'; // 主页
import ArticleDetail from 'components/article-detail/ArticleDetail';  // 文章详情页
import AddArticle from '../components/admin/add-article/AddArticle';  // 添加文章页

// 配置路由
export default new Router({
  linkActiveClass: 'active',  // 激活class类名
  routes: [
    // 主页
    {
      path: '/blogWaka',
      name: 'Index',
      component: Index
    },
    // 文章详情页
    {
      path: '/blogWaka/articleDetail',
      name: 'ArticleDetail',
      component: ArticleDetail
    },
    // 添加文章页
    {
      path: '/blogWaka/admin/addArticle',
      name: 'AddArticle',
      component: AddArticle
    }
  ]
});

