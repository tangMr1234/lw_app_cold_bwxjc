<template>
  <div class="details" style="height:100%;">
    <pull-to>
      <!-- 装备信息table -->
      <group :gutter="10" v-if="keyword==='tablist'">
        <cell title="订单开始时间" value="2018-09-02"></cell>
        <cell title="订单结束时间" value="2018-09-02"></cell>
      </group>
      <group :title="details.compony">
        <x-table>
          <tbody>
          <tr>
            <td rowspan="6" width="30%"><img
              :src="details.coolerimg"
              alt=""></td>
            <td style="text-align:left;padding:0 30px;"><span style="color:#666;">{{details.coolername.label}}：</span>
              {{details.coolername.value}}
            </td>
          </tr>
          <tr v-for="data in details.cooler">
            <td style="text-align:left;padding:0 30px;"><span style="color:#666;">{{data.label}}：</span>
              {{data.value}}
            </td>
          </tr>
          </tbody>
        </x-table>
      </group>
      <!-- other table -->
      <group :title="details.spacetitle">
        <x-table>
          <tbody v-for="data in details.other">
          <tr>
            <td style="text-align:left;padding:0 20px;"><span style="color:#666;">{{data.label}}：</span>{{data.value}}<i
              v-if="data.icon&&data.icon!=''" :class="data.icon" class="iconfont" style="color:red;font-size:24px;"
              @click="openMap"></i></td>
          </tr>
          </tbody>
        </x-table>
      </group>
    </pull-to>
    <!-- 详情弹出层 -->
    <div v-transfer-dom>
      <popup v-model="mapShow" position="right" width="100%">
        <x-header title="车辆位置" style="background-color:#409eff;">
          <i class="iconfont icon-xiangzuojiantou" style="color:#fff;font-size:18px;" slot="overwrite-left"
             @click="hidden">
            <small>返回</small>
          </i>
        </x-header>
        <div style="height:calc(100% - 46px);">
          <p-map></p-map>
        </div>
      </popup>
    </div>
  </div>
</template>

<script type="es6">
  import {Group, Cell, XTable, Popup, TransferDom, XHeader} from 'vux'
  import PullTo from 'vue-pull-to'

  export default {
    directives: {
      TransferDom
    },
    components: {
      PullTo, Group, Cell, XTable, Popup, XHeader,
      PMap: resolve => {
        require(['@/views/Map/PMap.vue'], resolve)
      }
    },
    data() {
      return {
        keyword: "",
        mapShow: false,
        details: {
          "compony": "天津市某某区疾控中心",
          "coolerimg": "http://pic.qiantucdn.com/58pic/28/27/05/75w58PIC7GV_1024.jpg!/fw/780/watermark/url/L3dhdGVybWFyay12MS4zLnBuZw==/align/center/crop/0x1009a0a0",
          "coolername": {
            label: '车辆名称',
            value: '冷藏车001'
          },
          "cooler": [{
            label: '车牌号码',
            value: '沪A·QQ123'
          }, {
            label: '车辆品牌',
            value: '东风'
          }, {
            label: '车辆型号',
            value: 'Cl-nn123'
          }, {
            label: '车辆颜色',
            value: '白色'
          }],
          "spacetitle": "其他信息",
          "other": [{
            label: '当前位置',
            value: '上海市嘉定区爱特路855号606上海冷王',
            icon: 'icon-ditu'
          }, {
            label: '车内温度',
            value: '2℃，8℃，-20℃'
          }, {
            label: '更新时间',
            value: '2018-02-12 12:22:09'
          }, {
            label: '当前车速',
            value: '130KM/h'
          }]
        }
      }
    },
    methods: {
      openMap() {
        this.mapShow = true;
      },
      hidden() {
        this.mapShow = false;
      }
    },
    mounted() {
      this.loadingRemove();
      this.keyword = sessionStorage.getItem('BWX_openListt');
    }
  }
</script>

<style>
  .vux-header-back {
    color: #fff !important;
  }

  .vux-header .vux-header-left .left-arrow:before {
    border-color: #fff !important;
  }

  .details img {
    width: 100%;
  }
</style>
