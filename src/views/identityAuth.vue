<!-- D:\jz\src\pages\realName -->
<template>
<<<<<<< HEAD
 <div>
    <div class="wrapper">
        <!-- v-if="userNoAuth" -->
       <!-- 
         <radio-group class="radio-group" @change="radioChange" v-if="userNoAuth">
            <label class="radio" v-for="item of radioGroup" :key="item.name"><radio :value="item.value" :checked="item.checked"/>{{item.value}}</label>           
        </radio-group>
        -->
       
        <div class="radio-group" >
            <label class="radio" ><div ></div></label>           
        </div>
   <!-- <div class="realname-noauth" v-if="userNoAuth && showTab==2">-->
        <div class="realname-noauth">
            <div class="input-emergency-container">
                <p class="_p">姓名</p>
                <!--<input class="input" type="text" v-model= "submitInfo.certName" placeholder="请输入姓名">-->
                <input class="input" type="text"  placeholder="请输入姓名">
            </div>
            <div class="input-emergency-container">
                <p class="_p">身份证号</p>
                <!--<input class="input" type="text" v-model= "submitInfo.certNo" placeholder="请输入身份证号">-->
                <input class="input" type="text"  placeholder="请输入身份证号">
            </div>
            <!--<div @click="submit" class="botton-btn">芝麻认证</div>-->
            <div  class="botton-btn">芝麻认证</div>
        </div>
        <!--<div class="realname-noauth" v-if="userNoAuth && showTab==1">-->
          <div class="realname-noauth">
            <div class="text-container">
              <div class="title"><img class="titleimg" src="../assets/images/icon_upload_card.png" >上传有效证件</div>
              <div class="content">1.大陆公民持有的本人有效<span class="origan">二代身份证</span></div>
              <div class="content">2.拍摄时请保持身份证<span class="origan">边角完整、字迹清晰、亮度均匀</span></div>
            </div>
            <div class="pic-item">
                <!-- <div @click="addPositive" class="img-btn"><img class="sf-pic" :src="imgPositive.src" ></div>-->
                <div class="img-btn"><img class="sf-pic" ></div>
            </div>
            <div class="pic-item">
                 <!--<div @click="addNegative" class="img-btn"><img class="sf-pic" :src="imgNegative.src" ></div>-->
                <div class="img-btn"><img class="sf-pic"  ></div>
            </div>
            <div class="tishi-container">
              <img class="tishi-img" src="../assets/images/img_example_first.png" >
              <img class="tishi-img" src="../assets/images/img_example_forth.png" >
              <img class="tishi-img" src="../assets/images/img_example_second.png" >
              <img class="tishi-img" src="../assets/images/img_example_third.png" >





            </div>
            <!--<div @click="submit" class="botton-btn">芝麻认证</div>-->
             <div class="botton-btn">芝麻认证</div>
        </div>
        <!--<div class="realname-authing" v-if="userAuthed">-->
        <div class="realname-authing">
            <div class="add-item">
                <div class="add-title">姓名</div>
                <!--<div class="add-content"><input v-model="submitInfo.certName" class="add-input" type="text" :disabled="true"></div>-->
                <div class="add-content"><input  class="add-input" type="text" ></div>
            </div>
           <!-- <div class="add-item" v-if="user.nationality">-->
              <div class="add-item">
                <div class="add-title">民族</div>
                <!--<div class="add-content"><input v-model="user.nationality" class="add-input" type="text" :disabled="true"></div>-->
                <div class="add-content"><input  class="add-input" type="text" ></div>
            </div>
            <!--<div class="add-item" v-if="user.sex">-->
              <div class="add-item">
                <div class="add-title" >性别</div>
                <!--<div class="add-content"><input v-model="user.sex" class="add-input" :disabled="true"></div>-->
                <div class="add-content"><input class="add-input" ></div>
            </div>
            <div class="add-item add-item2">
                <div class="add-title">证件号码</div>
                <div class="add-content"><input  class="add-input" type="text"></div>
                  <!--<div class="add-content"><input v-model="submitInfo.certNo"  class="add-input" type="text" :disabled="true"></div>-->
            </div>
        </div>
    </div>
</div>
=======
  <div>身份认证
    <mt-radio
  title="radio list"
  v-model="value"
  :options="['optionA', 'optionB', 'optionC']">
</mt-radio>
  </div>
>>>>>>> 7e139bf7756e76d82fe38f2355aaa2196cec6ba9
</template>


<script>
export default {
  name: '',

  components: {},

  data () {
    return {
    }
  },

  computed: {},

  watch: {},

  created () {},

  mounted () {},

  methods: {}
}

</script>
<style scoped lang="scss">
.wrapper{
    font-family:microsoft yahei;
    font-size: 13px;
    background-color: #fff;
    width: 346px;
    height: calc(900px - 90px);
    padding:40px 14px;
    line-height: 15px;
}
.botton-btn{
    color: #fff;
    background-color: #FF6F00;
    height: 40px;
    border-radius: 20px;
    text-align: center;
    width: 346px;
    line-height: 40px;
    font-weight: 400;
    font-size: 15px;
    margin-top: 15px;
    position:absolute;
}
.radio-group{
    display: flex;
    justify-content: space-around;
    margin-bottom: 10px;
}
.input-emergency-container{
    display: flex;
    padding: 10px;
}
.input-emergency-container ._p{
    flex: 0 0 80px;
    display: flex;
    align-items: center;
}

.input-emergency-container .input{
  border: none;
    border-bottom: 1px solid #ccc;
    font-size: 15px;
}
.text-container .content{
  font-size: 12px;
  color: #cecece;
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
  line-height: 19px;
  position: relative;
  padding-left: 34px;
}
.text-container .titleimg {
  width: 24px;
  height: 19px;
  margin-right:10px;
  position: absolute;
  left:0px;
}
.img-btn {
    text-align: center;
}
.pic-item {
  margin-top: 12px;
  width: 275px;
  height: 245px;
  margin-left: 60px;
}
.sf-pic {
  width: 275px;
  height: 245px;
}
.tishi-container{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 25px;
}
.tishi-container .tishi-img{
  width:78px;
  height:78px;
}
.commit-btn {
    color: #fff;
    background-color: #FF6F00;
    height:40px;
    border-radius: 20px;
    text-align: center;
    width: 346px;
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
    width:90px;
}
.add-content {
    font-size: 13px;
    display: flex;
    align-items: center
}
.add-input {
    font-size: 13px;
    color: #363636;
    
}


</style>