<template>
  <div style="height:100%;overflow: hidden;">
    <iframe :src="'#/'+link+'?id='+name" class="mainFrame" frameborder="0" marginheight="0" marginwidth="0"
            scrolling="no" style="height:100%;"></iframe>
  </div>
</template>

<script type="es6">
  import {XHeader} from 'vux'

  export default {
    components: {XHeader},
    props: ['link', "name"],
    data() {
      return {}
    },
    mounted() {
      //监听postMessage变化来调用方法
      let _that = this;
      window.addEventListener('message', function (e) {
        if (e.data === "HandleClose") {
          _that.$emit('reset');
        }
      });
    },
    methods: {}
  }
</script>

<style scoped>
  .mainFrame {
    height: 100%;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
    min-width: 100%;
    *width: 100%;
    width: 1px;
  }
</style>
