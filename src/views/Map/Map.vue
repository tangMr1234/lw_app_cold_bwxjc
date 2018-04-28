<template>
  <div style="width:100%;height: 100%;overflow: hidden;">
    <x-header slot="header" :title="this.$route.name" style="background-color:#409eff;">
    </x-header>
    <!-- 面板 -->
    <div id="map" style="width:100%;height:calc(100% - 46px);overflow:hidden;"></div>
  </div>
</template>

<script type="es6">
  import {XHeader} from 'vux'
  import {BDMap} from '@/utils/BDMap'

  export default {
    components: {
      XHeader
    },
    data() {
      return {}
    },
    methods: {
      loadMap() {
        // 通过utils里的BDMap.js调用百度地图API功能
        let _this = this;
        //加载百度地图插件
        let mapUrl = [
          'https://api.map.baidu.com/library/TextIconOverlay/1.2/src/TextIconOverlay_min.js',
          "https://api.map.baidu.com/library/MarkerClusterer/1.2/src/MarkerClusterer_min.js"
        ];
        BDMap(mapUrl).then(BMap => {
          var map = new BMap.Map("map");
          map.centerAndZoom(new BMap.Point(116.404, 39.915), 4);
          map.enableScrollWheelZoom();
          var myIcon2 = new BMap.Icon("tb1_0.png", new BMap.Size(30, 40));
          var data = [{"mapy": "32.94584", "mapx": "112.894350", "time": "12:30"},
            {"mapy": "33.34683", "mapx": "112.694300", "time": "11:30"},
            {"mapy": "33.54702", "mapx": "112.094380", "time": "10:30"},
            {"mapy": "33.148780", "mapx": "116.494390", "time": "13:30"}
          ];
          var markers = new Array();

          for (var i = 0; i < data.length; i++) {
            var point = new BMap.Point(data[i].mapx, data[i].mapy);
            var marker = new BMap.Marker(point);
            var content = data[i].time;
            _this.addClickHandler(content, marker); //添加点击事件
            markers.push(marker);
          }
          // map.disableDragging();
          //添加聚合效果。
          var markerClusterer = new BMapLib.MarkerClusterer(map, {markers: markers});
        })
        //关闭页面跳转时的加载中动画
        this.loadingRemove();
      },
      //地图标注的点击事件
      addClickHandler(content, marker) {
        let _this = this;
        marker.addEventListener("click", function (e) {
          _this.$router.push('/pointmap');
        });
      }
    },
    mounted() {
      //加载地图
      this.loadMap();
    }
  }
</script>
