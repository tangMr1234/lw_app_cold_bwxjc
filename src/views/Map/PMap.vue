<template>
  <div style="width:100%;height: 100%;overflow: hidden;">
    <div ref="getHeight">
      <card>
        <div slot="content" class="card-padding">
          <p style="font-size:18px;">{{car_data.title}}<span style="float:right;color:#999;">{{car_data.date}}</span>
          </p>
          <p style="margin:10px 0 5px;">{{car_data.other}}</p>
          <p style="color:#999;font-size:12px;">{{car_data.comment}}</p>
        </div>
      </card>
    </div>
    <div id="map" :style="'height:calc(100% - '+mapHeight+')'"></div>
  </div>
</template>

<script type="es6">
  import {Card} from 'vux'
  import {BDMap} from '@/utils/BDMap'

  export default {
    components: {
      Card
    },
    data() {
      return {
        mapHeight: "400px",//地图高度设置,初始化400px
        car_data: {
          title: "沪A·Q12S0",
          comment: "当前位置：上海市嘉定区爱特路855号606上海冷王智能科技",
          date: "2018-04-12 12:00:10",
          other: '温度：23.01℃，18℃，33℃'
        }
      }
    },
    methods: {
      loadMap() {
        BDMap().then(BMap => {
          // 百度地图API功能
          var map = new BMap.Map("map");
          var point = new BMap.Point(116.400244, 39.92556);
          map.centerAndZoom(point, 12);
          var marker = new BMap.Marker(point);// 创建标注
          map.addOverlay(marker);             // 将标注添加到地图中
          marker.enableDragging();           // 不可拖拽

          // 添加带有定位的导航控件
          var navigationControl = new BMap.NavigationControl({
            // 靠左上角位置
            anchor: BMAP_ANCHOR_TOP_LEFT,
            // LARGE类型
            type: BMAP_NAVIGATION_CONTROL_LARGE,
            // 启用显示定位
            enableGeolocation: true
          });
          map.addControl(navigationControl);

          // 添加定位控件
          var geolocationControl = new BMap.GeolocationControl();
          geolocationControl.addEventListener("locationSuccess", function (e) {
            // 定位成功事件
            var address = '';
            address += e.addressComponent.province;
            address += e.addressComponent.city;
            address += e.addressComponent.district;
            address += e.addressComponent.street;
            address += e.addressComponent.streetNumber;
            console.log("当前定位地址为：" + address);
          });
          geolocationControl.addEventListener("locationError", function (e) {
            // 定位失败事件
            alert(e.message);
          });
          map.addControl(geolocationControl);
        })
        //关闭页面跳转时的加载中动画
        this.loadingRemove();
      }
    },
    mounted() {
      const _this = this;
      //监听窗口大小变化
      var height = this.$refs.getHeight.offsetHeight;
      _this.mapHeight = height + "px";
      window.onresize = () => {
        return (() => {
          var height = this.$refs.getHeight.offsetHeight;
          _this.mapHeight = height + "px";
        })()
      }
      //加载地图
      this.loadMap();
    }
  }
</script>
<style scoped lang="less">
  .card-padding {
    padding: 15px;
  }
</style>
