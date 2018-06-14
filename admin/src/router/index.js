import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'home',
    component: home,
    children: [{
      path: '/home/content',
      name: 'content',
      component: require('@/components/content').default,
      children: [{
          path: '/home/content/carLive',
          component: require('@/components/content/carLive').default,
          children: [{
            path: '/home/content/carLive/classify',
            component: require('@/components/content/carLive/classify').default,
          }, {
            path: '/home/content/carLive/manage',
            component: require('@/components/content/carLive/manage').default,
          }]
        },
        {
          path: '/home/content/fault',
          component: require('@/components/content/fault').default,
          children: [{
            path: '/home/content/fault/classifyF',
            component: require('@/components/content/fault/classifyF').default,
          }, {
            path: '/home/content/fault/contentF',
            component: require('@/components/content/fault/contentF').default,
          }]
        },
        {
          path: '/home/content/msgManage',
          component: require('@/components/content/msgManage').default,
          children: [{
            path: '/home/content/msgManage/About',
            component: require('@/components/content/msgManage/About').default,
          }, {
            path: '/home/content/msgManage/banner',
            component: require('@/components/content/msgManage/banner').default,
          }, {
            path: '/home/content/msgManage/basic',
            component: require('@/components/content/msgManage/basic').default,
          }, {
            path: '/home/content/msgManage/client',
            component: require('@/components/content/msgManage/client').default,
          }, {
            path: '/home/content/msgManage/introduce',
            component: require('@/components/content/msgManage/introduce').default,
          }, {
            path: '/home/content/msgManage/links',
            component: require('@/components/content/msgManage/links').default,
          }, {
            path: '/home/content/msgManage/news',
            component: require('@/components/content/msgManage/news').default,
          }]
        },
        {
          path: '/home/content/serviceItem',
          component: require('@/components/content/serviceItem').default,
        }
      ]
    }]
  }]
})
