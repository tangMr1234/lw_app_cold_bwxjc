import Vue from 'vue'
import Vuex from 'vuex'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import router from '@/router/index'
import {ConfirmPlugin, AlertPlugin} from 'vux'
import utils from '@/utils/utils'

require('./assets/icon/iconfont');

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(ConfirmPlugin)
Vue.use(AlertPlugin)
FastClick.attach(document.body)

const store = new Vuex.Store({}) // 这里你可能已经有其他 module

store.registerModule('vux', { // 名字自己定义
  state: {
    isLoading: false
  },
  mutations: {
    updateLoadingStatus(state, payload) {
      state.isLoading = payload.isLoading
    }
  }
})

Vue.config.productionTip = false

Vue.prototype.$utils = utils //注册全局方法，用来获取url传递的参数
Vue.prototype.loadingRemove = function () {
  store.commit('updateLoadingStatus', {isLoading: false})
} //关闭loading的全局方法
//注册弹窗的全局方法
Vue.prototype.confirm = function (title, content, buttonText, func) {
  this.$vux.confirm.show({
    title: title,
    content: content,
    confirmText: buttonText,
    onConfirm() {
      if (func && func != "") {
        func();
      }
    }
  })
}
//注册alert的全局方法
Vue.prototype.alert = function (title, content, buttonText, func) {
  this.$vux.alert.show({
    title: title,
    content: content,
    buttonText: buttonText,
    onHide() {
      if (func && func != "") {
        func();
      }
    }
  })
}

router.beforeEach(function (to, from, next) {
  if (to.path != "/login") {
    store.commit('updateLoadingStatus', {isLoading: true})
  }
  next()
})

router.afterEach(function (to) {
  // store.commit('updateLoadingStatus', {isLoading: false})
})

/* eslint-disable no-new */
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app-box')
