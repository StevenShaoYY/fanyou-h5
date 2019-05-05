<!--  -->
<template>
  <div>
    <header-bar></header-bar>
    <div class="wrapper_out">
        <div @click="goToAddress" class="address-container">
            <img class="icon" src="@/assets/images/icon_location_address.png" alt="">
            <div class="set-text">
                <div class="text1">{{address.full_region}}{{address.address}}</div>
                <div class="text2">{{address.name}}&nbsp&nbsp&nbsp{{address.mobile}}</div>
            </div>
            <img class="right" src="@/assets/images/btn_next_mine.png" alt="">
        </div>
        <div class="product-detail-container">
            <order-product :product="productSub"></order-product>
        </div>
        <div class="finace-container" v-if="finace.feeType==1">
            <div>意外保障<span class="span-l">(一次性付清)</span></div>
            <div>¥{{finace.amount}}</div>
        </div>
        <div class="finace-container" v-if="finace.feeType==2">
            <div>意外保障<span class="span-l">(分期支付)</span></div>
            <div>每期¥{{finace.amount}}</div>
        </div>
        <div class="rent-container">
            <div class="rent1">
                <div>租赁期数</div>
                <div>¥{{rentPrice.price}}<span class="sub-span">×{{rentPrice.specification}}</span></div>
            </div>
            <div class="rent2-container">
                <div class="rent2">月租金:¥{{rentPrice.price}}</div>
                <div class="rent2">首期支付:¥{{rentPrice.price+finace.amount}}</div>
            </div>
        </div>
        <div class="remark-container">
          <mt-field placeholder="请输入备注信息..." type="textarea" rows="2" v-model="submitInfo.remark"></mt-field>
            <!-- <input class="text" type="text" v-model= "submitInfo.remark" placeholder="请输入备注信息..."> -->
        </div>
        <div class="emergency-container">
            <div class="title">紧急联系人信息</div>
            <!-- <div class="input-emergency-container"> -->
                <!-- <p class="_p">电话</p>
                <input class="input" type="text" v-model= "submitInfo.emergencyPhone" placeholder="电话"> -->
                <mt-field label="用户名" placeholder="请输入电话" type="tel" v-model="submitInfo.emergencyPhone"></mt-field>
            <!-- </div> -->
            <!-- <div class="input-emergency-container"> -->
                <!-- <p class="_p">姓名</p>
                <input class="input" type="text" v-model= "submitInfo.emergencyName" placeholder="姓名"> -->
                <mt-field label="姓名" placeholder="请输入姓名" v-model="submitInfo.emergencyName"></mt-field>
                <div  @click="showPickerFunc">
                  <mt-field label="关系" :readonly=true  placeholder="请选择关系"  v-model="submitInfo.emergencyRelation"></mt-field>
                </div>
                <div class="picker-container" v-if="showPicker==true">
                  <div class="mask2" @click="closePicker"></div>
                  <mt-picker class="pick-cc"  :slots="slots" @change="onValuesChange"></mt-picker>
                </div>
            <!-- </div> -->
            <!-- <div class="input-emergency-container">
                <p class="_p">关系</p> -->
                <!-- <input class="input" type="text" v-model= "submitInfo.emergencyRelation" placeholder="关系"> -->
                <!-- <picker  @change="bindPickerChange" :value="index" :range="array">
                    <view class="pickcontainer" :class="{'gray':submitInfo.emergencyRelation=='关系'}">
                        {{submitInfo.emergencyRelation}}
                    </view>
                </picker>
            </div> -->
        </div>       
    </div>
    <div class="bottom-container">
        <div class="text">
            <div class="radio-group">
                <van-checkbox class="checkbox" v-model="agressCheck" checked-color="#EF6700"><span>点击确认下单代表已同意</span><a href="/xieyi" class="xieyi">《用户服务及租赁协议》</a></van-checkbox>
            </div>
           <!-- <checkbox-group class="radio-group" @change="onChangeCheck">
                <checkbox :value="agressCheck" class="checkbox" color="#EF6700" :checked="agressCheck"/><span>点击确认下单代表已同意</span><a url="/pages/xieyi/index" class="xieyi">《用户服务及租赁协议》</a>
            </checkbox-group> -->
        </div>
        <div @click="submit" class="botton-btn">确认下单</div>
    </div>
    <pay-pop v-if="showPopFlag" :orderId="orderId" @close="closePay" @paysuccess="paySuccess" @payfail="payFail" @payunknow="payUnknow"></pay-pop>
</div>
</template>

<script>
import OrderProduct from '../components/orderProduct.vue';
import PayPop from '../components/payPop.vue';
import {axiosHeaders} from "@/assets/api";
import HeaderBar from '../components/headerBar.vue';
export default {
  name: '',

  components: {
    'order-product': OrderProduct,
    'pay-pop': PayPop,
    HeaderBar
  },

  data () {
    return {
      productSub: {},
      product:{},
      finace: {},
      address:{},
      rentPrice:{},
      submitInfo: {
          remark: '',
          emergencyPhone: '',
          emergencyName: '',
          emergencyRelation: ''
      },
      orderId: '',
      showPopFlag:false,
      agressCheck: false,
      array: ['朋友','同学','家人','同事'],
      slots: [
        {
          flex: 1,
          values: ['朋友', '同学', '家人', '同事'],
          className: 'slot1',
          textAlign: 'center'
        }
      ],
      index: 0,
      clickflag: false,
      showPicker: false
    }
  },

  computed: {},

  watch: {},

  created () {
    this.getAddressList()
    this.getProduct()
  },

  mounted () {},

  methods: {
    closePicker(){
      this.showPicker = false
    },
    showPickerFunc() {
      this.showPicker = true
    },
    onValuesChange(picker, values){
      // console.log(picker)
      // console.log(values)
      this.submitInfo.emergencyRelation = values[0]
    },
    getAddressList() {
        let commentDto = {
            "pageNum": 1,
            "pageSize":10
        }
        this.$axios.post('/user/userAddress/list',
          commentDto,
          axiosHeaders
        ).then(res => {
          let result = res.data.result;
          if (result.list.length>=1) {
              this.type = 'update'
              result.list[0].full_region = result.list[0].provinceName+ ' '+result.list[0].cityName+' '+result.list[0].areaName+ ' '
              this.address = result.list[0];
          }
        })
    },
    getProduct() {
        let dto = {
            "id": this.$route.query.id
        }
        this.$axios.post('/mall/api/mallGoods/detail',
          dto,
          axiosHeaders
        ).then(res => {
          let result = res.data.result;
          this.finace = result.finaceList[this.$route.query.finace]
          for (let it of result.productList) {
              if(it.id == this.$route.query.guige) {
                  this.product = it
              }
          }
          this.rentPrice = this.product.financeRespDTOList[this.$route.query.rentTime]
          let productSub = {}
          productSub.name = result.name
          productSub.picUrl = result.picUrl
          productSub.descList = this.product.specifications
          productSub.price = this.product.price
          this.productSub = productSub
        })
    },
    goToAddress() {
        let url = `addressManage?from=order`
        this.$router.push(url)
    },
    redirectToAddress(url) {
        this.$router.replace(url)
    },
    ValidatePhone(val){
        var isPhone = /^([0-9]{3,4}-)?[0-9]{7,8}$/;//手机号码
        var isMob= /^0?1[2|3|4|5|6|7|8|9][0-9]\d{8}$/;// 座机格式
        if(isMob.test(val)||isPhone.test(val)){
            return true;
        }
        else{
            return false;
        }
    },
    onChangeCheck(e) {
        this.agressCheck = !this.agressCheck
    },
    bindPickerChange(e) {
        this.index = e.detail.value
        this.submitInfo.emergencyRelation = this.array[e.detail.value]
    },
    submit() {
        if (this.clickflag == true) {
            return
        }
        this.clickflag = true
        if(this.agressCheck === false) {
            this.toast('请先同意租赁协议！')
            this.clickflag = false
            return
        }
        if(!this.address.full_region) {
            this.toast('请先添加收货地址！')
            this.clickflag = false
            return
        }
        if(this.submitInfo.emergencyPhone === '') {
            this.toast('请填写紧急联系电话！')
            this.clickflag = false
            return
        }
        if(!this.ValidatePhone(this.submitInfo.emergencyPhone)) {
            this.toast('请填写正确的紧急联系电话！')
            this.clickflag = false
            return
        }
        if(this.submitInfo.emergencyName === '') {
            this.toast('请填写紧急联系人！')
            this.clickflag = false
            return
        }
        
        if(this.submitInfo.emergencyRelation === '关系') {
            this.toast('请选择与紧急联系人关系！')
            this.clickflag = false
            return
        }
        let submitInfo = {
            ...this.submitInfo,
            "num": 1,
            "addressId": this.address.id,
            "goodsAttachProductId": this.finace.id,
            "goodsId": this.$route.query.id,
            "productFinanceId": this.rentPrice.id,
            "productId": this.$route.query.guige,
        }
         this.$axios.post('/mall/api/tradeOrder/submit',
          submitInfo,
          axiosHeaders
        ).then(res => {
          let result = res.data.result;
          if (result.orderId){
              this.orderId = result.orderId
              this.showPopFlag = true
          } else {
              this.clickflag = false
          }
        })
    },
    closePay() {
        this.showPopFlag = false
        let url = `orderDetail?id=${this.orderId}`
        this.redirectToAddress(url)
    },
    paySuccess() {
        this.showPopFlag = false
        this.toast('支付成功！')
        this.redirectToAddress('orderList')
    },
    payFail() {
        this.showPopFlag = false
        this.toast('支付失败！请重新支付！')
        this.redirectToAddress('orderList')
    },
    payUnknow() {
        this.showPopFlag = false
        this.toast('支付处理中！')
        this.redirectToAddress('orderList')
    }
  }
}

</script>
<style lang='scss' scoped>
    .picker-container{
      position: fixed;
      width: 100vw;
      height: 100vh;
      top:0;
      left:0;
      bottom:0;
      right: 0;
      z-index: 9999;
      .mask2{
        width: 100vw;
        height: 70vh;
        background-color: rgba(0,0,0,0.8)
      }
      .pick-cc{
        background-color: #fff;
        height: 30vh;
        z-index: 9999;
        bottom:0;
      }
    }
    .wrapper_out{
        background-color: #ffffff;
        font-family:microsoft yahei;
        height: calc(100vh - 150px);
        width: 100vw;
        // margin-left: 3vw;
        overflow-y: auto;
        margin-top: 50px;
    }
    .address-container {
        width: 94vw;
        margin-left: 3vw;
        box-sizing: border-box;
        height: 90px;
        border: 1px solid #FAFAFA;
        border-radius: 10px;
        margin-top: 10px;
        box-shadow: 2px 2px 15px #cccccc;
        padding: 10px;
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .address-container .icon{
        width: 20px;
        height: 24px;
    }
    .address-container .set-text{
        width: calc(100% - 60px);
        padding: 0 20px;
    }
    .address-container .set-text .text1{
        font-size: 16px;
        line-height: 30px;
        text-align: left;
        color: #676767;
    }
    .address-container .set-text .text2{
        font-size: 14px;
        line-height: 30px;
        text-align: left;
        color: #9D9D9D;
    }
    .gray {
        color: #ccc
    }
    .address-container .right {
       width: 9px;
       height: 14px;
    }
    .checkbox{
        border-radius: 11px;
        vertical-align:middle;
        margin-bottom: 2.5px;
        margin-right: 5px;
        margin-top: -4px;
    }
    .product-detail-container {
        width: 94vw;
        margin-left: 3vw;
        overflow: hidden;
        margin-top: 15px;
    }
    .finace-container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 94vw;
        margin-left: 3vw;
        font-size: 15px;
        padding-bottom: 15px;
        border-bottom: 1px solid #E7E7E7
    }
    .finace-container .span-l {
        color: #969696;
        font-size: 13px;
    }
    .rent-container {
        width: 94vw;
        margin-left: 3vw;
        font-size: 15px;
        padding: 15px 0;
    }
    .rent-container .rent1{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .rent-container .rent1 .sub-span {
        color: #969696;
        font-size: 13px;
    }
    .rent-container .rent2-container {
        margin-top: 15px;
    }
    .rent-container .rent2{
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        font-weight: 700;
        line-height: 25px;
    }
    .remark-container {
        width: 94vw;
        margin-left: 3vw;
        box-sizing: border-box;
        border-radius: 10px;
        background-color: #f7f7f7;
        font-size: 13px;
        padding: 15px 10px;
        height: 90px;
    }
    .remark-container .text{
        background-color: #f7f7f7;
        font-size: 13px;
    }
    .emergency-container {
        width: 94vw;
        margin-left: 3vw;
        margin-top: 15px;
    }
    .emergency-container .title {
        font-size: 15px;
        font-weight: 400;
    }
    // .emergency-container .input-emergency-container {
    //     font-size: 13px;
    //     line-height: 40px;
    //     height: 40px;
    //     display: flex;
    //     flex-direction: row;
    // }
    // .emergency-container .input-emergency-container ._p{
    //     width: 13%;
    //     font-size: 13px;
    //     line-height: 30px;
    //     margin-top: 7px;
    //     height: 40px;
    // }
    // .emergency-container .input-emergency-container .input{
    //     width: 88%;
    //     font-size: 13px;
    //     line-height: 40px;
    //     height: 40px;
    // }
    .pickcontainer{
        width: 281px;
        font-size: 13px;
        line-height: 40px;
        margin-top: 2px;
        padding-left: 2px;
        height: 40px;
    }
    .emergency-container .input-emergency-container + .input-emergency-container{
        border-top: 1px solid #f7f7f7
    }
    .botton-btn {
        color: #fff;
        background-color: #FF6F00;
        height: 40px;
        border-radius: 20px;
        text-align: center;
        width: 94vw;
        margin-left: 3vw;
        line-height: 40px;
        font-weight: 400;
        font-size: 15px;
        margin-bottom: 15px;
    }
    .bottom-container{
        position: fixed;
        bottom: 0;
        height: 100px;
        background-color: #f9f9f9
    }
    .bottom-container .text{
        font-size: 13px;
        color: #9a9a9a;
        line-height: 30px;
        padding: 10px 15px;
    }
    .bottom-container .xieyi {
        color: #ff7000;
        display: inline;
    }
</style>
