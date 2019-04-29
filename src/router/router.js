import Vue from 'vue'
import Router from 'vue-router'

// tabBar 子页面容器
import TabCon from '@/components/ComponentsLayout/TabCon/index'

// tabBar 页面
import Home from '@/pages/ComponentsBarPages/Home/index'
import Rank from '@/pages/ComponentsBarPages/Rank/index'
import Singer from '@/pages/ComponentsBarPages/Singer/index'
import Song from '@/pages/ComponentsBarPages/Song/index'

// 需要重复使用的组件
import MovieDetail from '@/pages/ComponentsDetails/MovieDetail/index'
import SingerDetail from '@/pages/ComponentsDetails/SingerDetail/index'

// 公共打开的页面
import Player from '@/pages/ComponentsCommon/Player/index'

// 每个动态注册的路由重复使用的页面组件。
Vue.prototype.repeatComponents = {
  MovieDetail,
  SingerDetail
}

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: TabCon,
      redirect: '/home',
      children: [
        {
          path: '/home',
          name: '/home',
          component: Home
        }, {
          path: '/singer',
          name: '/singer',
          component: Singer
        }, {
          path: '/rank',
          name: '/rank',
          component: Rank
        }, {
          path: '/song',
          name: '/song',
          component: Song
        }]
    }, {
      path: '/player',
      name: '/player',
      component: Player
    },
    {
      path: '/',
      name: 'home',
      component: () => import('../pages/Home.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../pages/About.vue'),
    },
  ],
})

export default router