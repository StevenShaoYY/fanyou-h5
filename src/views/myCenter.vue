<!--  -->
<template>
    <div class="wrapper">
        <mt-header fixed title="我的"></mt-header>
        <div class="section section1">
            <img class="img" src="@/assets/images/bg_mine_top.png" background-size="cover" />
            <div class="avata-container" v-if="!userInfo.avatar">
                <img class="avata" src="@/assets/images/img_head_mine.png" background-size="cover" />
            </div>
            <div class="avata-container" v-if="userInfo.avatar">
                <img class="avata" :src="userInfo.avatar" background-size="cover" />
            </div>
            <div class="text" v-if="!userInfo.nickName">
                未登录
            </div>
            <div class="text" v-if="userInfo.nickName">
                {{userInfo.nickName}}
            </div>
        </div>
        <div class="section">
            <div class="my-set-container" @click="goToUrl('/pages/realName/index')">
                <img class="icon" src="@/assets/images/icon_massage_mine.png" alt="">
                <div class="set-text">实名认证</div>
                <img class="right" src="@/assets/images/btn_next_mine.png" alt="">
            </div>
            <div class="my-set-container" @click="goToUrl('addressManage')">
                <img class="icon2" src="@/assets/images/ic_address.png" alt="">
                <div class="set-text">地址管理</div>
                <img class="right" src="@/assets/images/btn_next_mine.png" alt="">
            </div>
            <div class="my-set-container" @click="goToUrl('/orderProduct')">
                <img class="icon" src="@/assets/images/tab_order_current.png" alt="">
                <div class="set-text">我的订单</div>
                <img class="right" src="@/assets/images/btn_next_mine.png" alt="">
            </div>
            <div class="my-set-container" @click="goToUrl('/mycollect')">
                <img class="icon" src="@/assets/images/icon_collect_mine.png" alt="">
                <div class="set-text">我的收藏</div>
                <img class="right" src="@/assets/images/btn_next_mine.png" alt="">
            </div>
            <div class="my-set-container" @click="goToUrl('/mycomment')">
                <img class="icon" src="@/assets/images/icon_comment_mine.png" alt="">
                <div class="set-text">我的评论</div>
                <img class="right" src="@/assets/images/btn_next_mine.png" alt="">
            </div>
        </div>
        <div class="section">
            <div class="my-set-container" @click="goToUrl('/help')">
                <img class="icon" src="@/assets/images/icon_question_mine.png" alt="">
                <div class="set-text">帮助中心</div>
                <img class="right" src="@/assets/images/btn_next_mine.png" alt="">
            </div>
            <div class="my-set-container" @click="call">
                <img class="icon" src="@/assets/images/icon_help_mine.png" alt="">
                <div class="set-text">联系客服</div>
                <img class="right" src="@/assets/images/btn_next_mine.png" alt="">
            </div>
        </div>
        <login-dialog v-if="showLogin" @close="showLogin=false"></login-dialog>
    </div>
</template>

<script>
import LoginDialog from '../components/loginDialog.vue';
export default {
  name: '',

  components: {
      'login-dialog': LoginDialog
  },

  data () {
    return {
        showLogin: false,
        userInfo: {}
    }
  },

  computed: {},

  watch: {},

  created () {},

  mounted () {},

  methods: {      
    call() {
        window.location.href = 'tel://0571-86507022'
    },
    goToUrl(url) {
        if(this.checkLogin())
            this.$router.push(url)
    },
    checkLogin() {
        console.log(localStorage.getItem('ACCESS_TOKEN'))
        if(localStorage.getItem('ACCESS_TOKEN')==''||localStorage.getItem('ACCESS_TOKEN')==null) {
            this.$router.push('/login')
        } else {
            return true
        }
        // if(getApp().globalData.accessToken === '') {
        //     return false
        // } else {
        //     return true
        // }
    }
  }
}

</script>
<style lang='scss' scoped>
@import '../assets/styles/global';
   .wrapper{
       background-color: #e2e2e2;
       height:100vh;
       font-family:microsoft yahei;
       padding-top: 10px;
       box-sizing: border-box;
   }
   .icon{
       margin-right: 10px;
   }
   .section.section1{
       margin-top: 40px;
   }
   .section {       
        width: px2rem(346);
        margin-left: px2rem(14);
        border: 1px solid #FAFAFA;
        border-radius: px2rem(10);
        margin-top: 10px;
        box-shadow: 1px 1px 25rx #cccccc;
        background-color: #fff;
   }
//    .section1 {
//        height: 240rpx;
//    }
   .img {
       border-radius: 10px;
       width: 346px;
       height: 200px;
   }
   .avata-container {
       width: 75px;
       height: 75px;
       border-radius: 37px;
       background-color: #fff;
       display: flex;
       justify-content: center;
       align-items: center;
       position: absolute;
       left:150px;
       top:72px;
   }
   .avata-container .avata{
       width: 70px;
       height: 70px;
       border-radius: 37px;
       background-color: #fff;
   }
   .section1 .text {
       position: absolute;
       top:155px;
       width: 375px;
       left: 0;
       text-align: center;
       font-size: 16px;
   }
   .my-set-container {
       height: 45px;
       display: flex;
       flex-direction: row;
       margin: 0 15px;
   }
   .my-set-container + .my-set-container {
       border-top: 1px solid #f6f6f6
   }
   .icon {
       width: 20px;
       height: 20px;
       margin-top: 12px;
       margin-right: 10rpx;
   }
   .icon2 {
       width: 20px;
       height: 20px;
       margin-top: 12px;
       margin-right: 10px;
   }
   .right {
       width: 8px;
       height: 14px;
       margin-top: 15px;
   }
   .set-text{
       flex:1;
       text-align: left;
       line-height: 45px;
       font-size: 14px;
   }
</style>
