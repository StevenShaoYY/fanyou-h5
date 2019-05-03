<!--  -->
<template>
  <div class="login">
    <div class="headSculpture"></div>
    <div class="loginTxt">登录/注册</div>
    <div class="form">
      <mt-field placeholder="请输入手机号" v-model="mobile"></mt-field>
    </div>
    <div class="form">
      <div class="identifyingCode"><mt-field placeholder="请输入验证码" v-model="code"></mt-field></div>
      <div class="identifyingCodeBtn" @click="getCode" :class="[isSendCode?'available':'disabled']">获取验证码</div>
    </div>

    <div class="btn">
      <mt-button size="large" type="danger" @click="login">登录</mt-button>
    </div>
    
  </div>
</template>

<script>
import axios from 'axios'
import {axiosHeaders} from "@/assets/api"
import { Toast } from 'mint-ui';
export default {
  name: "index",
  data () {
    return {
      mobile: '',
      code: '',
      isSendCode: true
    };
  },
  created () {
  },
  methods: {
    getCode() {
      if(this.mobile){
        this.$axios.post('/user/userBase/sendMessage',
          {
            mobile: this.mobile
          },
          axiosHeaders
        ).then(res => {
          // let result = res.data.result;
          console.log('res: ', res)
        })
      }else{
        let instance = Toast('请输入手机号');
        setTimeout(() => {
          instance.close();
        }, 2000);
      }
      
    },
    login() {
      if(this.mobile && this.code){
        localStorage.setItem('ACCESS_TOKEN', '');
        this.$axios.post('/user/userBase/login',
          {
            code: this.code,
            mobile: this.mobile
          },
          axiosHeaders
        ).then(res => {
          let result = res.data.result;
          console.log('res: ', res)
          if(res.data.ok){
            localStorage.setItem('ACCESS_TOKEN', result.accessToken);
            // return;
            this.$router.push("/index")
          }
        })
      }else{
        let instance = Toast('请输入手机号或验证码');
        setTimeout(() => {
          instance.close();
        }, 2000);
      }
    }
  }
};
</script>
<style lang='scss'>
.mint-cell-wrapper{
  background-image: none;
}
.mint-button{
  border-radius: 20px;
  background: #ff7000;
}
.available{
  color: #fd7e2a
}
.disabled{
  color: #ccc;
}
</style>

<style lang='scss' scoped>
@import '../assets/styles/global';
.login{
  .headSculpture{
    width: px2rem(100);
    height: px2rem(100);
    margin: px2rem(100) auto px2rem(30) auto;
    border-radius: px2rem(10);
    border: 1px #999 solid;
  }
  .loginTxt{
    height: px2rem(30);
    line-height: px2rem(30);
    font-size: px2rem(18);
    text-align: center;
  }
  .form{
    margin: 0 px2rem(16);
    display: flex;
    border-bottom: px2rem(1) solid #ccc;
    .identifyingCode{
      flex: 3;
    }
    .identifyingCodeBtn{
      flex: 1;
      font-size: px2rem(14);
      display: flex;
      justify-content: center;
      align-items: center; 
    }
  }
  .btn{
    margin: px2rem(30) px2rem(16);
  }
}

</style>

