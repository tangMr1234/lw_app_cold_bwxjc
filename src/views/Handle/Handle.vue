<template>
  <div class="handle" style="height:100%;">
    <x-header :title="this.$route.name" @on-click-back="goBack" :left-options="{preventGoBack: true}"
              style="background-color:#409eff;">
    </x-header>
    <div style="height:calc(100% - 46px);overflow: hidden;">
      <pull-to>
        <x-table>
          <tbody>
          <tr>
            <td rowspan="2" width="25%"><img
              :src="warn_info.ico"
              alt="" style="vertical-align: middle;"></td>
            <td style="text-align: left;padding: 0 20px;">{{warn_info.cooler}}</td>
          </tr>
          <tr>
            <td style="text-align: left;padding: 0 20px;">{{warn_info.sensor}}</td>
          </tr>
          <tr>
            <td style="color:red;">{{warn_info.type}}</td>
            <td style="text-align: left;padding: 0 20px;">{{warn_info.warn_temp}}</td>
          </tr>
          <tr>
            <td>{{warn_info.level}}</td>
            <td style="text-align: left;padding: 0 20px;">{{warn_info.warn_date}}</td>
          </tr>
          </tbody>
        </x-table>
        <!-- 详情table -->
        <div class="Interlace"></div>
        <group>
          <x-table>
            <tbody>
            <tr v-for="(data, index) in warnContent" :key="index">
              <td width="25%">{{data.label}}</td>
              <td style="text-align:left;padding:0 20px;">{{data.value}}</td>
            </tr>
            </tbody>
          </x-table>
        </group>
        <!-- 处理 -->
        <br>
        <divider>预警处理，请认真填写</divider>
        <br>
        <group :gutter="0">
          <x-input title="处理人:" placeholder="请输入处理人姓名"></x-input>
        </group>

        <checklist title="处理备注：" required :options="commonList" :max="1" v-model="checklist001"
                   @on-change="change"></checklist>

        <group :gutter="0" v-show="other">
          <x-input placeholder="请输入处理备注"></x-input>
        </group>
        <!-- 确认&提交按钮 -->
        <box gap="10px 10px">
          <x-button :gradients="['#409eff', '#409eff']" @click.native="submit">确定</x-button>
        </box>
      </pull-to>
    </div>
    <!-- 提交时的loading -->
    <loading :show="submitLoading" :text="submitText"></loading>
  </div>
</template>

<script type="es6">
  import {XTable, Box, XButton, XHeader, Loading, Group, XInput, Checklist, Divider} from 'vux'
  import PullTo from 'vue-pull-to'

  export default {
    components: {
      PullTo, XTable, Box, XButton, XHeader, Loading, Group, XInput, Checklist, Divider
    },
    data() {
      return {
        src: "http://img1.imgtn.bdimg.com/it/u=1170036766,1916028111&fm=200&gp=0.jpg",
        warn_info: {
          cooler: "冰箱：1001010",
          sensor: "探头：1001222222-上",
          warn_temp: "报警值：30℃",
          type: "超温",
          level: "三级",
          warn_date: "2018-02-11 12:10:23",
          ico: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAH0AfQDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD3+iiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKA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CiiigAooooAKKKKACiiigAooooACM1yvizwPp/ieIylRb36jCXCjr7MO4/UV1VFKUVJWZdOpKnLmg7M+aNd8Paj4evDb38BXJ+SReUceoNZVfUOoabZ6paPbXlvHPC/VXGfx9jXkvij4WXVlvutELXMHU27H94v0/vfz+tcNTDuOsdUe9hcyhU92po/wPOKKdJG8UjRyIyOpwysMEH0Iptcx6YUUUUAFFFFABRRRQAUUUUAFFFFABVqH/VCqtWof9UKTNKe4+iiipNQooooAKKKKACiiigAooooAKKKKAClALEAAkngAVq6J4b1PxBPssoCYwcNM/CL9T/QV674a8B6doG2eQC6vf+erjhT/ALI7fXrW1OhKp6HFisfSw6s9X2ON8KfDe4vvLvNZVobbqtvnDv8AX+6P1+ler2tpBZ26QW8KRRRjCogwAPpU4AHSivRp0o01ZHzGJxdTESvN6dgooorQ5gooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAoIB60UUAc/4h8G6P4jj/0q3CXGMLcRfK4/Hv8AjXk3iH4a61oxaa2T7fajndCvzge6/wCGa95owDWVSjGfqdeHxtWjonddmfKhBUkEEEcEGkr6N13wboviAFruzVZj/wAt4vkf8+/45rzbWvhNqdpuk0u4jvI+ojf5HH9D+lcc8POO2p7NHMqNTSXuv+up53RVq+02902Yw3tpNbyekiEZ+nrVWsLWPQTTV0FFFFABRRRQAUUUUAFWof8AVCqtWof9UKTNKe4+iiipNQooooAKKKKACiigAk4A5oAKK6DSfBeuauVaGzaKE/8ALWf5F/xP4Cu/0b4W6faFZdSmN5IOdg+WMf1P+eK2hQnPZHHXx9CjvK77I8u0zRtQ1mfybC1knbuVHyr9T0Fek6B8LYLcpPrMouHHPkRkhB9T1P6fjXoVtaW1nCsNtBHDEvRI1CgfgKmrsp4aMdZanh4nNqtX3afur8SKC1gtYUhghSKJBhURcAD6VLRRXSeVuFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABQQD1FFFAEFzZ215CYrmCKaM9UkQMPyNcf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"
        },
        warnContent: [
          {label: "报警编号", value: "210001"},
          {label: "温区设置", value: "2℃~8℃"},
          {label: "开始时间", value: "2018-03-05 12:40:21"},
          {label: "持续时间", value: "30分钟"},
        ],
        commonList: [{key: '1', value: '冷链设备故障'}, {key: '2', value: '监控设备故障'}, {key: '3', value: '误报警'}, {
          key: '4',
          value: '其他'
        }],
        checklist001: [],
        other: false, //其他部分输入框的显示与隐藏
        submitLoading: false, //提交数据时的loading
        submitText: "提交中", //提交数据时的loading的提示文字
      }
    },
    methods: {
      // 路由变化监听事件
      routerChange() {
        this.loadingRemove();
      },
      //  通过postMessage调用iframe父组件的方法
      goBack() {
        let link = window.location.href.split("#");
        window.parent.postMessage('HandleClose', link[0]);
      },
      //  radio切换时事件
      change(val, label) {
        (label == "其他") ? this.other = true : this.other = false;
        console.log('change', val, label)
      },
      //确认提交
      submit() {
        if (this.batches == '' || this.valid == '' || this.Initial == '' || this.label == '' || this.price == '') {
          this.alertShow = true;
          setTimeout(() => {
            this.alertShow = false;
          }, 3000)
        } else {
          this.submitLoading = true;
          setTimeout(() => {
            this.submitLoading = false;
            parent.window.location.href = "#/msg"
          }, 500);
        }
      }
    },
    mounted() {
      this.loadingRemove();
    },
    watch: {
      "$route": "routerChange"  // 路由变化监听事件
    },
  }
</script>

<style>
  .handle img {
    width: 100%;
  }

  .Interlace table tr:nth-child(odd) {
    background: #F4F4F4;
  }
</style>
