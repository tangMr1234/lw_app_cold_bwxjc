<template>
  <div class="xHeaderRight" style="height:100%;">
    <view-box ref="viewBox" body-padding-top="0" body-padding-bottom="0">
      <router-view></router-view>
    </view-box>
  </div>
</template>

<script type="es6">
  import {ViewBox} from 'vux'

  export default {
    components: {
      ViewBox
    },
    data() {
      return {}
    },
    methods: {
    },
    mounted() {

    }
  }
</script>
<style>

</style>
