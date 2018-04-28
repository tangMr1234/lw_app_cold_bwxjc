import Vue from 'vue'
import Router from 'vue-router'
const Login = resolve => { //登录
    require.ensure([], () => {
        resolve(require('@/views/Layout/Login'))
    })
}
const Home = resolve => { //主框架
    require.ensure([], () => {
        resolve(require('@/views/Home'))
    })
}
const Index = resolve => { //首页
    require.ensure([], () => {
        resolve(require('@/views/Layout/Index'))
    })
}
const List = resolve => { //列表
    require.ensure([], () => {
        resolve(require('@/views/List/List'))
    })
}
const User = resolve => { //用户中心
    require.ensure([], () => {
        resolve(require('@/views/User/User'))
    })
}
const AboutUs = resolve => { //关于我们
    require.ensure([], () => {
        resolve(require('@/views/AboutUs/AboutUs'))
    })
}
const NotFound = resolve => { //关于我们
    require.ensure([], () => {
        resolve(require('@/views/Layout/404'))
    })
}
const ceshi = resolve => { //测试页面
    require.ensure([], () => {
        resolve(require('@/views/ceshi/ceshi'))
    })
}

Vue.use(Router)

export default new Router({
  routes: [
	{
      path: '/login',
      name: '登录',
      component: Login,
	  hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '错误界面',
        hidden: true
    },
	{
      path: '*',
      name: '404',
	  hidden: true,
      redirect: { path: '/404' }
    },
    {
      path: '/',
      name: '首页',
	  icon: '//image1.suning.cn/uimg/cms/img/151056082390618564.png?from=mobile',
      component: Home,
	  redirect: { path: '/index' },
	  children: [
            { path: '/index', component: Index, name: '系统首页' }
      ]
    },
	{
      path: '/',
      name: '订单',
	  icon: '//image1.suning.cn/uimg/cms/img/149804285027181893.png?from=mobile',
      component: Home,
	  children: [
            { path: '/list', component: List, name: '系统订单' }
      ]
    },
	{
      path: '/',
      name: '消息',
	  icon: '//image4.suning.cn/uimg/cms/img/149916145707908251.png?from=mobile',
      component: Home,
	  badge: '6',
		children: [
            { path: '/ceshi', component: ceshi, name: '系统消息', 
				children: [
					{ path: 'ceshi1', component: Index, name: '系统发现2'},
					{ path: 'ceshi2', component: List, name: '系统发现3'},
				]
			}
		]
    },
	{
      path: '/',
      name: '我的',
	  icon: '//image4.suning.cn/uimg/cms/img/149916132444173312.png?from=mobile',
      component: Home,
	  showDot: 'show-dot',
	  children: [
            { path: '/user', component: User, name: '系统我的' },
            { path: '/about', component: AboutUs, name: '关于我们' }
      ]
    }
  ]
})
