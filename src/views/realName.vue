<!--  -->
<template>
  <div>
    <header-bar backUrl="/myCenter"></header-bar>
    <div class="wrapper">
        <!-- v-if="userNoAuth" -->
        <van-radio-group class="radio-group" v-model="checkedRadio" @change="radioChange" v-if="userNoAuth">
            <label class="radio" v-for="item of radioGroup" :key="item.name"><van-radio :name="item.name"/>{{item.value}}</label>           
        </van-radio-group>
        <div class="realname-noauth" v-if="userNoAuth && showTab==2">
            <!-- <div class="input-emergency-container">
                <p class="_p">姓名</p>
                <input class="input" type="text" v-model= "submitInfo.certName" placeholder="请输入姓名">
            </div>
            <div class="input-emergency-container">
                <p class="_p">身份证号</p>
                <input class="input" type="text" v-model= "submitInfo.certNo" placeholder="请输入身份证号">
            </div> -->
            <van-cell-group>
              <van-field
                v-model="submitInfo.certName"
                required
                label="姓名"
                placeholder="请输入姓名"
              />

              <van-field
                v-model="submitInfo.certNo"
                label="身份证号"
                placeholder="请输入身份证号"
                required
              />
            </van-cell-group>
            <div @click="submit" class="botton-btn">确认</div>
        </div>
        <div class="realname-noauth" v-if="userNoAuth && showTab==1">
            <div class="text-container">
              <div class="title"><img class="titleimg" src="@/assets/images/icon_upload_card.png" >上传有效证件</div>
              <div class="content">1.大陆公民持有的本人有效<span class="origan">二代身份证</span></div>
              <div class="content">2.拍摄时请保持身份证<span class="origan">边角完整、字迹清晰、亮度均匀</span></div>
            </div>
            <div class="pic-item">
                <van-uploader :after-read="addPositive" class="img-btn"><img class="sf-pic" :src="imgPositive.src" ></van-uploader>
            </div>
            <div class="pic-item">
                <van-uploader :after-read="addNegative" class="img-btn"><img class="sf-pic" :src="imgNegative.src" ></van-uploader>
            </div>
            <div class="tishi-container">
              <img class="tishi-img" src="@/assets/images/img_example_first.png" >
              <img class="tishi-img" src="@/assets/images/img_example_forth.png" >
              <img class="tishi-img" src="@/assets/images/img_example_second.png" >
              <img class="tishi-img" src="@/assets/images/img_example_third.png" >
            </div>
            <!-- <div @click="submit" class="botton-btn">芝麻认证</div> -->
            <div @click="submit" class="botton-btn">确认</div>
        </div>
        <div class="realname-authing" v-if="userAuthed">
            <!-- <div class="add-item">
                <div class="add-title">姓名</div>
                <div class="add-content"><input v-model="submitInfo.certName" class="add-input" type="text" :disabled="true"></div>
            </div>
            <div class="add-item" v-if="user.nationality">
                <div class="add-title">民族</div>
                <div class="add-content"><input v-model="user.nationality" class="add-input" type="text" :disabled="true"></div>
            </div>
            <div class="add-item" v-if="user.sex">
                <div class="add-title" >性别</div>
                <div class="add-content"><input v-model="user.sex" class="add-input" :disabled="true"></div>
            </div>
            <div class="add-item add-item2">
                <div class="add-title">证件号码</div>
                <div class="add-content"><input v-model="submitInfo.certNo"  class="add-input" type="text" :disabled="true"></div>
            </div> -->
            <van-cell-group>
              <van-field
                v-model="submitInfo.certName"
                disabled
                label="姓名"
              />
              <van-field
                v-if="user.nationality"
                v-model="user.nationality"
                disabled
                label="民族"
              />
              <van-field
                v-if="user.sex"
                v-model="user.sex"
                disabled
                label="性别"
              />
              <van-field
                v-model="submitInfo.certNo"
                disabled
                label="证件号码"
              />
            </van-cell-group>
        </div>
    </div>
</div>
</template>

<script>
import {axiosHeaders} from "@/assets/api";
import HeaderBar from '../components/headerBar.vue';
import img1 from '@/assets/images/btn_upload_face.png'
import img2 from '@/assets/images/btn_upload_back.png'
import lrz from 'lrz/dist/lrz.all.bundle.js'
export default {
  name: '',

  components: {
    HeaderBar
  },

  data () {
    return {
        submitInfo: {
            certName: '',
            certNo: ''
        },
        radioGroup: [
            {name: '1', value: '拍摄身份证', checked: 'true'},
            {name: '2', value: '手动录入'}
        ],
        checkedRadio:'1',
        showTab:1,
        url:'',
        imgUrl:'',
        imgPositive:{
            // src: '../assets/images/btn_upload_face.png',
            src:img1,
            isOk:false
        },
        imgNegative:{
            src: img2,
            isOk:false
        },
        userNoAuth:false,
        userAuthing:false,
        userAuthed:true,
        user:{
            address:'',
            birth:'',
            name:'',
            nationality:'',
            num:'',
            sex:''
        },
        backUrl: false,
        picUploaded: false,
        frontUploaded: false,
        backUploaded: false
    }
  },

  computed: {},

  watch: {},

  created () {
    if (this.$route.query.id) {
        let query = this.$route.query
        this.backUrl1 = `placeOrder?id=${query.id}&guige=${query.guige}&rentTime=${query.rentTime}&finace=${query.finace}`
    }
    this.getUserInfo();
  },

  mounted () {},

  methods: {
    submit() {
        if(this.showTab==1) {
            if(this.frontUploaded == true && this.backUploaded == true) {
                this.zhimaCom()
            } else {
                if(this.frontUploaded == true) {
                    this.toast('请上传身份证反面照片！')
                } else if (this.backUploaded == true){
                    this.toast('请上传身份证正面照片！')
                } else {
                    this.toast('请上传身份证照片！')
                }
            }
        }
        if(this.showTab==2) {
            if(this.submitInfo.certName !== ''){
                if(this.submitInfo.certNo !== '') {
                    if(this.isCardNo(this.submitInfo.certNo)) {
                        this.uploadData()
                    } else {
                        this.toast('请先输入正确的身份证！')
                    }
                } else {
                    this.toast('请先输入身份证！')
                }
            } else {
                this.toast('请先输入姓名！')
            }
        }
    },
    uploadData() {
        let dto = {
            "cardName": this.submitInfo.certName,
            "homeAddress": "",
            "idCardNo": this.submitInfo.certNo,
            "workAddress": ""
        }
        this.$axios.post('/user/userBase/sumitInfo',
          dto,
          axiosHeaders
        ).then(res => {
          if(res.data.ok == true)
              this.zhimaCom()
        })
    },
    isCardNo(card) 
    { 
    // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X 
        var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; 
        if(reg.test(card) === false) 
        { 
            return false; 
        } else {
            return true;
        }
    },
    radioChange(e){
        if(e === "1")
            this.showTab = 1
        else
            this.showTab = 2
    },
    zhimaCom() {
        // let dto = {
        //     isAuth: true
        // }
        let dto = {
            "certName": this.submitInfo.certName,
            "certNo": this.submitInfo.certNo
        }
        this.$axios.post('/mall/api/certification/certificationInitializeH5',
          dto,
          axiosHeaders
        ).then(res => {
          console.log(res.url)
          window.location.href = res.data.result.url
          // this.userAuthed = true;
          // this.userNoAuth = false;
          // if(this.backUrl!==false) {
          //     if(this.$mp.platform === 'alipay') {
          //         my.redirectTo({
          //             url: this.backUrl1
          //         })
          //     } else {
          //         wx.redirectTo({
          //             url: this.backUrl1
          //         })
          //     }
          // }
        })
    },
    getUserInfo() {
        this.$axios.post('/user/userBase/getSimpleInfo',
          '',
          axiosHeaders
        ).then(res => {
            let result = res.data;
            if(result.ok===true) {
                // debugger
                if(result.result.idCardFrontImage!=null) {
                    this.frontUploaded = true
                }
                if(result.result.idCardBackImage!=null) {
                    this.backUploaded = true
                }
                if(result.result.idCardBackImage!=null && result.result.idCardFrontImage !=null) {
                    this.user.address = result.result.frontRespDTO.address;
                    this.imgPositive.src = result.result.idCardFrontImage
                    this.imgNegative.src = result.result.idCardBackImage
                    this.user.birth = result.result.frontRespDTO.birth;
                    // this.user.name = result.result.frontRespDTO.name;
                    this.user.nationality = result.result.frontRespDTO.nationality;
                    let numDes = result.result.frontRespDTO.num.substr(0,3) + "***********" + result.result.frontRespDTO.num.substr(-4);
                    // this.user.num = numDes;
                    this.user.sex = result.result.frontRespDTO.sex;
                    this.submitInfo = {
                        certName: result.result.cardName,
                        certNo: result.result.idCardNo
                    }
                } else {
                    this.userNoAuth = true;
                    this.userAuthed = false;
                }
                if(!result.result.isIdCardFront){
                    this.userNoAuth = true;
                    this.userAuthed = false;
                } else {
                    this.submitInfo = {
                        certName: result.result.cardName,
                        certNo: result.result.idCardNo
                    }
                    this.userNoAuth = false;
                    this.userAuthed = true; 
                    // this.userNoAuth = true;
                    // this.userAuthed = false;
                }
            } else {
                this.toast(result.msg)
            }
        });
    },
    addPositive(file) {
        lrz(file.file).then(rst => {
            let dt = new FormData()
            dt.append('fileStr',rst.base64)
            this.$axios.post('/user/userBase/v1.2/idCard/frontBase',
                dt,
                {headers: {'Content-Type': 'multipart/form-data'}}
                ).then(res => {
                let result = res.data
                if(result.ok===true) {
                    this.imgPositive.src = this.imgUrl;
                    this.imgPositive.isOk = true;
                    this.frontUploaded = true
                    this.checkStatus();
                } else {
                    this.toast(result.msg)
                }
            })
        }).catch(err => {
            console.log(err)
        })     
    },
    addNegative(file) {
        lrz(file.file).then(rst => {
            dt.append('fileStr',rst.base64)
            this.$axios.post('/user/userBase/v1.2/idCard/backBase',
                dt,
                {headers: {'Content-Type': 'multipart/form-data'}}
                ).then(res => {
                let result = res.data
                if(result.ok===true) {
                    this.imgNegative.src = this.imgUrl;
                    this.imgNegative.isOk = true;
                    this.backUploaded = true
                    this.checkStatus();
                } else {
                    this.toast(result.msg)
                }
            })
        }).catch(err => {
            console.log(err)
        })     
    },
    checkStatus() {
        if(this.imgPositive.isOk == true && this.imgNegative.isOk == true) {
            this.userNoAuth = false;
            this.userAuthing = false;
            this.userAuthed = false;
            
            this.getUserInfo();
        }
    },
  }
}

</script>
<style lang='scss' scoped>
.wrapper{
    font-family:microsoft yahei;
    font-size: 13px;
    background-color: #fff;
    margin-top: 50px;
    width: 94vw;
    height: calc(100vh - 120px);
    overflow-y: auto;
    padding:10px 3vw;
    line-height: 30px;
}
.botton-btn{
    color: #fff;
    background-color: #FF6F00;
    height: 40px;
    border-radius: 20px;
    text-align: center;
    width: 94vw;
    line-height: 40px;
    font-weight: 400;
    font-size: 15px;
    margin-top: 15px;
    position:fixed;
    bottom: 10px;
}
.radio-group{
    display: flex;
    justify-content: space-around;
    margin-bottom: 10px;
}
.radio-group .radio{
  display:flex;
  align-items: center;
}
.input-emergency-container{
    display: flex;
    padding: 15px;
}
.input-emergency-container ._p{
    flex: 0 0 100px;
    display: flex;
    align-items: center;
}

.input-emergency-container .input{
    border-bottom: 1px solid #ccc;
    font-size: 15px;
}
.text-container .content{
  font-size: 12px;
  color: #cecece;
  line-height: 20px;
  text-align: left;
  margin-top: 10px;
}
.realname-authing{
    padding: 10px;
    background-color: #fff;
    border: 1rpx solid #f6f6f6;
    box-shadow: 2px 2px  10px #cccccc;
}
.origan {
  color:#f27605;
}
.text-container .title {
  color: #949494;
  font-size:13px;
  line-height: 20px;
  position: relative;
  padding-left: 34px;
  text-align: left;
}
.text-container .titleimg {
  width: 24px;
  height: 20px;
  margin-right: 10px;
  position: absolute;
  left:0px;
}
.img-btn {
    text-align: center;
}
.pic-item {
  margin-top: 12.5px;
  display: flex;
  justify-content: center;
  // width: 225px;
  height: 145px;
}
.sf-pic {
  width: 225px;
  height: 145px;
}
.tishi-container{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 25px;
}
.tishi-container .tishi-img{
  width: 70px;
  height: 65px;
}
.commit-btn {
    color: #fff;
    background-color: #FF6F00;
    height: 40px;
    border-radius: 20px;
    text-align: center;
    width: 94vw;
    line-height: 40px;
    font-weight: 400;
    font-size: 15px;
    margin-top: 15px;
}

.add-item{
    height: 45px;
    display: flex;
    flex-direction: row;
    margin: 0 15px;
}

.add-title{
    font-size: 16px;
    line-height: 45px;
    width: 90px;
}
.add-content {
    font-size:13px;
    display: flex;
    align-items: center
}
.add-input {
    font-size:13px;
    color: #363636;
}

</style>
