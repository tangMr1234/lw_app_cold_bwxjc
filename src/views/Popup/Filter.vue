<template>
  <div style="height: 100%;">
    <div style="height:calc(100% - 42px);overflow-x: hidden;">
      <group title="设备选择">
        <x-input title="车辆搜索：" placeholder="请输入车牌号"></x-input>
      </group>
      <!-- 选择组 -->
      <checklist title="分组" :options="commonList" required v-model="checklist_Fz" :max=1
                 @on-change="change"></checklist>

      <group :title="clooerType1.title">
        <checker
          v-model="clooerType1.selected"
          type="checkbox"
          default-item-class="demo5-item"
          selected-item-class="demo5-item-selected" style="margin-top:10px;display: flex;"
        >
          <checker-item v-for="data in clooerType1.data" :value="data.id" style="margin-bottom:10px;">{{data.title}}
          </checker-item>
        </checker>
      </group>
    </div>
    <!-- 底部button -->
    <flexbox :gutter="0">
      <flexbox-item>
        <x-button @click.native="reset">重置</x-button>
      </flexbox-item>
      <flexbox-item>
        <x-button :gradients="['#409eff', '#409eff']" @click.native="submit">确定</x-button>
      </flexbox-item>
    </flexbox>
    <!-- 假遮罩 -->
    <div v-transfer-dom>
      <div v-show="show1"
           style="background: rgba(0,0,0,.5);position:fixed;top:0;left:0;width:100%;height:100%;z-index:503;">
      </div>
    </div>
  </div>
</template>

<script type="es6">
  import {
    TransferDom,
    Group,
    XInput,
    XButton,
    Flexbox,
    FlexboxItem,
    Checker,
    CheckerItem,
    Checklist
  } from 'vux'

  export default {
    directives: {
      TransferDom
    },
    components: {
      Group, Checklist, XInput, XButton, Flexbox, FlexboxItem, Checker, CheckerItem
    },
    data() {
      return {
        commonList: [{key: '1', value: '全部'}, {key: '2', value: '某某物流1'}, {key: '3', value: '某某物流2'}],
        checklist_Fz: ["1"],
        search: '',
        popupStyle: {
          'z-index': '504'
        },
        show1: false,
        title4: '单位',
        value4: [],
        // 状态部分数据
        clooerType1: "",
        //  所有单位部分
        deviceTitle: "设备",
        calendarStar: 'TODAY',
        calendarEnd: 'TODAY',
        calendarGroupTitle: "预警日期范围选择",
        calendarStarTitle: "开始日期",
        calendarEndTitle: "结束日期",
      }
    },
    mounted() {
      this.filterCondition();
    },
    methods: {
      change(val, label) {
        console.log('change', val, label)
      },
      //筛选数据加载
      filterCondition() {
        this.clooerType1 = {
          title: '冷藏车状态',
          selected: ['11', "112", "211"],
          data: [
            {id: '11', title: '正常'},
            {id: '112', title: '预警'},
            {id: '211', title: '离线'}
          ]
        };
      },
      //确认
      submit() {
        this.$emit('reset'); //  调用父组件的方法
        this.show1 = false;
      },
      //重置方法
      reset() {
        this.filterCondition();
        this.search = "";
        this.value4 = [];
      },
      // 单位选择弹出时打开假的遮罩层
      pickerShow() {
        this.show1 = true;
      },
      //单位选择关闭时关闭假的遮罩层
      pickerHide() {
        this.show1 = false;
      }
    }
  }
</script>

<style scoped>
  .demo5-item {
    width: 100px;
    height: 26px;
    line-height: 26px;
    text-align: center;
    border-radius: 3px;
    border: 1px solid #ccc;
    background-color: #fff;
    flex: 1;
    margin: 0 8px;
    font-size: 12px;
  }

  .demo5-item-selected {
    background: #ffffff url(../../assets/checker-active.png) no-repeat right bottom;
    border-color: #ff4a00;
  }
</style>
<style>
  .vux-popup-dialog.vux-popup-bottom.vux-popup-show {
    z-index: 505;
  }
</style>
