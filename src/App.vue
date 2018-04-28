<template>
  <div id="app" style="height:100%;">
    <!--<transition name="fade" mode="out-in">-->
    <router-view class="router-view"></router-view>
    <!--</transition>-->
    <loading v-model="isLoading"></loading>
  </div>
</template>

<script type="es6">
  import {Loading} from 'vux'
  import {mapState} from 'vuex'

  export default {
    name: 'app',
    components: {
      Loading
    },
    data() {
      return {}
    },
    computed: {
      ...mapState({
        isLoading: state => state.vux.isLoading
      })
    }
  }
</script>

<style lang="less">
  @import '~vux/src/styles/reset.less';
  @import '~vux/src/styles/1px.less';
  @import '~vux/src/styles/tap.less';
  body {
    background-color: #fbf9fe;
  }

  .router-view {
    width: 100%;
  }


  .fade-enter-active,
  .fade-leave-active {
    transition: all .2s ease;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0;
  }
</style>
