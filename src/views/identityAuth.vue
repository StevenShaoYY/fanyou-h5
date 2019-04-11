<!-- D:\jz\src\pages\realName -->
<template>
  <div>身份认证
    <mt-radio
  title="radio list"
  v-model="value"
  :options="['optionA', 'optionB', 'optionC']">
</mt-radio>
  </div>
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