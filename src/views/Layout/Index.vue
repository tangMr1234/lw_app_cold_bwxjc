<template>
  <div style="width:100%;height: 100%;overflow: hidden;">
    <x-header slot="header" :title="this.$route.name" @on-click-back="goBack" :left-options="{preventGoBack: true}"
              style="background-color:#409eff;">
    </x-header>
    <!-- 面板 -->
    <div style="height:calc(100% - 66px);overflow-x:hidden;background:#eee;padding-bottom:20px;">
      <div style="width:92%;margin:0 auto;">
        <group style="box-shadow: 0 0 5px #ddd;" v-for="(data, index) in data" :key="index"
               @click.native="goList(data.link)">
          <cell>
            <div slot="title" style="padding: 20px 0;">
              <b style="font-size:18px;color:#333;">{{data.title}}</b>
              <div style="color:#999;margin-top:18px;">
                <p style="margin-bottom:8px;">{{data.comment}}</p>
                <p>{{data.explain}}</p>
              </div>
            </div>
            <div slot="default">
              <img :src="data.src" style="width:60px;"
                   alt="">
            </div>
          </cell>
        </group>
      </div>
    </div>
  </div>
</template>

<script type="es6">
  import {Group, Cell, XHeader} from 'vux'

  export default {
    components: {
      Group,
      Cell,
      XHeader
    },
    data() {
      return {
        data: [
          {
            id: '1',
            title: "所有保温箱",
            comment: "查看所有保温箱温度状态信息",
            explain: "共100个，使用中30个",
            src: "http://pic.qiantucdn.com/58pic/27/55/04/32R58PICfPz_1024.jpg!/fw/780/watermark/url/L3dhdGVybWFyay12MS4zLnBuZw==/align/center/crop/0x1009a0a0",
            link: "list"
          },
          {
            id: '2',
            title: "位置信息",
            comment: "查看所有保温箱位置",
            explain: "请以实际位置为准",
            src: "http://pic.qiantucdn.com/58pic/26/55/77/25K58PICGDz_1024.jpg!/fw/780/watermark/url/L3dhdGVybWFyay12MS4zLnBuZw==/align/center/crop/0x1009a0a0",
            link: "map"
          },
          {
            id: '3',
            title: "派送订单",
            comment: "查看所有保温箱订单",
            explain: "如需查看车辆轨迹，请到电脑端查看",
            src: "http://pic.qiantucdn.com/58pic/27/57/81/36U58PICJhK_1024.jpg!/fw/780/watermark/url/L3dhdGVybWFyay12MS4zLnBuZw==/align/center/crop/0x1009a0a0",
            link: "tablist"
          }
        ]
      }
    },
    mounted() {
      if (!sessionStorage.getItem('warn')) {
        this.alert("提示", "试用应用的演示数据，仅供APP体验，试用期间该弹窗可暂时关闭！", "知道了", this.setSession); //使用main中的全局方法调用弹窗
      }
      this.loadingRemove();
    },
    methods: {
      //设置sessionstorage来打开warn弹窗
      setSession() {
        sessionStorage.setItem('warn', 'yes');
      },
      //  通过postMessage调用iframe父组件的方法
      goBack() {
        let link = parent.window.location.href.split("#");
        window.parent.postMessage('closeLwFrame', link[0]);
      },
      //  打开列表页
      goList(link) {
        sessionStorage.setItem("BWX_openListt", link); //设置sessionStorage请求不一样的列表详情页
        this.$router.push(link);
      }
    }
  }
</script>
