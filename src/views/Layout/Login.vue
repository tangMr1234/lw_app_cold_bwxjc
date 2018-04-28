<template>
  <div class="login">
    <blur :blur-amount=40 :url="LoginBg" style="height: 100vh;">
      <p class="center" style="margin: 0 20px;">
        <flexbox align="center" style="min-height: 100vh;">
          <flexbox-item>
            <!-- 圆角Logo -->
            <div class="center"><img :src="Logo"></div>
            <br>
            <!-- 输入组件 -->
            <div>
              <!-- 输入框组 -->
              <group>
                <x-input title="账户:" :placeholder="userNamePlaceholder" novalidate v-model="userNameValue"></x-input>
                <x-input title="密码:" :placeholder="passwordPlaceholder" novalidate v-model="passWordValue"
                         type="password"></x-input>
              </group>
              <br>
              <!-- 登录按钮 -->
              <div style="padding:15px 0;">
                <x-button @click.native="submitValid" type="primary" :show-loading="Loading" :disabled="disabled">登录
                </x-button>
              </div>
              <!-- 错误弹窗 -->
              <div v-transfer-dom>
                <alert v-model="show" :title="title">{{content}}</alert>
              </div>
              <!-- 分割线 -->
              <divider style="color:#fff;">{{VerinFormation}}</divider>
            </div>
            <br>
          </flexbox-item>
        </flexbox>
      </p>
    </blur>
  </div>
</template>

<script type="es6">
  import {
    Flexbox,
    FlexboxItem,
    XInput,
    Group,
    XButton,
    Alert,
    Divider,
    Blur,
    TransferDomDirective as TransferDom
  } from 'vux'

  export default {
    directives: {
      TransferDom
    },
    components: {
      Flexbox, FlexboxItem, XInput, Group, XButton, Alert, Divider, Blur
    },
    data() {
      return {
        Loading: false,  //按钮部分loading
        disabled: false, //设置按钮不可点击
        userName: '',
        passWord: '',
        userNameValue: '',
        passWordValue: '',
        show: false, 	//错误弹出框显示和标题
        title: "提示",  //错误弹窗的title
        content: '', 	//错误弹窗的内容
        Logo: "http://appdev.pujiajia.com/static/mobile/images/app_ico_touch.png",
        LoginBg: "https://o3e85j0cv.qnssl.com/tulips-1083572__340.jpg",
        userNamePlaceholder: "请输入用户名",
        passwordPlaceholder: "请输入密码",
        VerinFormation: "冷王智能科技 V1.0.1"
      }
    },
    methods: {
      //提交登录
      submitValid() {
        this.Loading = true;
        this.disabled = true;
        if (this.userNameValue != "" && this.passWordValue != "") {
          this.$router.push('/index');
        } else {
          this.show = true;
          this.content = "请输入正确的用户名和密码！";
          this.Loading = false;
          this.disabled = false;
        }
      }
    }
  }
</script>

<style>
  .login .weui-cells {
    background: transparent !important;
  }

  .login input::-webkit-input-placeholder {
    color: #F8F8FF;
  }

  .login .weui-icon-clear {
    color: #708090;
  }

  .login .weui-cell {
    padding: 0 15px;
  }

  .login .weui-input {
    padding: 10px 0;
  }
</style>

<style scoped>
  .center {
    text-align: center;
    color: #fff;
    font-size: 18px;
    color: #000;
  }

  .center img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 4px solid #ececec;
  }
</style>
