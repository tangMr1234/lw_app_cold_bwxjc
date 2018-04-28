<template>
  <div class="msg" style="height:100%;">
    <msg :title="description" :buttons="buttons" :icon="icon"></msg>
  </div>
</template>

<script type="es6">
  import {XButton, Msg} from 'vux'

  export default {
    components: {
      XButton, Msg
    },
    data() {
      return {
        description: '操作成功',
        icon: '',
        buttons: [{
          type: 'primary',
          text: '返回预警管理',
          link: '/index'
        }, {
          type: 'default',
          text: '返回首页',
          link: 'http://vue.pujiajia.com/vux'
        }]
      }
    },
    methods: {
      changeIcon() {
        if (!this.icon || this.icon === 'success') {
          this.icon = 'warn'
          return
        }
        if (this.icon === 'warn') {
          this.icon = 'info'
          return
        }
        if (this.icon === 'info') {
          this.icon = 'waiting'
          return
        }
        if (this.icon === 'waiting') {
          this.icon = 'success'
        }
      }
    },
    mounted() {
      this.loadingRemove();
    }
  }
</script>

<style>
  .msg .weui-icon-success {
    color: rgb(64, 158, 255);
  }

  .msg .weui-btn_primary {
    background: rgb(64, 158, 255) !important;
  }
</style>
