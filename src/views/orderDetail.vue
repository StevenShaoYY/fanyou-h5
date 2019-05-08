<!--  -->
<template>
  <div>
    <header-bar></header-bar>
    <div class="od-wrapper">
        <div class="address-container">
            <img class="icon" src="@/assets/images/icon_location_address.png" alt="">
            <div class="set-text">
                <div class="text1">{{orderDetail.address}}</div>
                <div class="text2">{{orderDetail.consignee}}&nbsp&nbsp&nbsp{{orderDetail.mobile}}</div>
            </div>
        </div>
        <div class="product-detail-container">
            <order-product :product="productSub"></order-product>
        </div>
        <div class="finace-container" v-if="finace.feeType==1">
            <div>意外保障<span class="span-l">(一次性付清)</span></div>
            <div>¥{{finace.actualPrice.toFixed(2)}}</div>
        </div>
        <div class="finace-container" v-if="finace.feeType==2">
            <div>意外保障<span class="span-l">(分期支付)</span></div>
            <div>每期¥{{finace.actualPrice.toFixed(2)}}</div>
        </div>
        <div class="rent-container" v-if="orderDetail.periods">
            <div class="rent1">
                <div class="sub">总租金</div>
                <div>{{orderDetail.orderPrice.toFixed(2)}}</div>
            </div>
            <div class="rent1">
                <div class="sub">月租金</div>
                <div>{{orderDetail.periodPrice.toFixed(2)}}</div>
            </div>
            <div class="rent1">
                <div class="sub">租期</div>
                <div>共{{orderDetail.periods}}<span v-if="orderDetail.periodType==1">个月</span><span v-if="orderDetail.periodType==2">天</span><span v-if="orderDetail.periodType==3">周</span></div>
            </div>
        </div>
        <div class="rent-container" v-if="orderDetail.periods">
            <div class="rent1">
                <div class="sub">总押金</div>
                <div>{{orderDetail.deposit.toFixed(2)}}</div>
            </div>
            <div class="rent1">
                <div class="sub">免押金</div>
                <div>-{{orderDetail.freeDeposit.toFixed(2)}}</div>
            </div>
            <div class="rent1">
                <div class="sub">实付押金</div>
                <div>{{orderDetail.actualDeposit.toFixed(2)}}</div>
            </div>
            <div  class="remark-container" v-if="orderDetail.remark!=''"> 
                <div class="text">备注信息：{{orderDetail.remark}}</div>
            </div>
        </div>
        <div @click="wuliuShow" class="can-click-container wuliu">
            物流信息
            <img v-if="!wuliuFlag" class="icon" src="@/assets/images/btn_down_more.png" alt="">
            <img v-if="wuliuFlag" class="icon" src="@/assets/images/btn_up_question.png" alt="">
            <div v-if="wuliuFlag" class="click-content">
                <div v-if="orderDetail.shipChannel">{{orderDetail.shipChannel}}：{{orderDetail.shipSn}}</div>
                <div v-if="!orderDetail.shipChannel">暂无物流信息</div>
            </div>
        </div>
        <div @click="deviceShow" class="can-click-container">
            设备序列号
            <img v-if="!deviceFlag" class="icon" src="@/assets/images/btn_down_more.png" alt="">
            <img v-if="deviceFlag" class="icon" src="@/assets/images/btn_up_question.png" alt="">
            <div v-if="deviceFlag" class="click-content">
                <div v-if="orderDetail.deviceSerial&&orderDetail.deviceSerial.length>0">{{orderDetail.deviceSerial[0]}}</div>
                <div v-if="!orderDetail.deviceSerial||orderDetail.deviceSerial.length==0">没有设备信息</div>
            </div>
        </div>
        <div class="rent-container2">
            <div class="rent1">
                <div class="sub">订单编号</div>
                <div>{{orderDetail.orderSn}}</div>
            </div>
            <div class="rent1">
                <div class="sub">下单时间</div>
                <div>{{orderDetail.createTime}}</div>
            </div>
            <div class="rent1">
                <div class="sub">起租时间</div>
                <div>{{orderDetail.beginTime}}</div>
            </div>
            <div class="rent1">
                <div class="sub">到期时间</div>
                <div>{{orderDetail.endTime}}</div>
            </div>
            <div class="rent1">
                <div class="sub">租赁协议</div>
                <div><a href="/xieyi" class="xieyi">《用户服务及租赁协议》</a></div>
            </div>
        </div>
        <div class="bottom-container">
            <div class="status-text">{{orderDetail.orderStatusRemark}}</div>
            <div class="btn-container">
                <div v-for="item of orderDetail.operationList" :key="item.id">
                    <div @click="payAtOnce" v-if="item.id==1" class="btn sty1">立即付款</div>
                    <div @click="confiremOrder" v-if="item.id==6" class="btn sty1">确认收货</div>
                    <div @click="returnOrder" v-if="item.id==3" class="btn sty1">归还设备</div>
                    <div @click="cancleOrder" v-if="item.id==2"  class="btn sty2">取消订单</div>
                    <div v-if="item.id==7" @click="payRest" class="btn sty2">缴纳余款</div>
                </div>
            </div>
        </div>
    </div>
    <pay-pop v-if="showPopFlag" :orderId="orderId" @close="closePay" @paysuccess="paySuccess" @payfail="payFail" @payunknow="payUnknow"></pay-pop>
</div>
</template>

<script>

import {axiosHeaders} from "@/assets/api";
import HeaderBar from '../components/headerBar.vue';
import OrderProduct from '../components/orderProduct.vue';
import PayPop from '../components/payPop.vue';
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
      finace: {},
      orderId: '',
      payInfo: {},
      orderDetail: {},
      deviceFlag: false,
      wuliuFlag: false,
      showPopFlag: false
    }
  },

  computed: {},

  watch: {},

  created () {
    this.orderId = this.$route.query.id
    this.getOrderDetail()
            // let pages = getCurrentPages();
  },

  mounted () {},

  methods: {
    paySuccess() {
        this.showPopFlag = false
        this.toast('支付成功！')
        this.$router.go(-1)
    },
    payFail() {
        this.showPopFlag = false
        this.toast('支付失败！请重新支付！')
        this.$router.go(-1)
    },
    payUnknow() {
        this.showPopFlag = false
        this.toast('支付处理中！')
        this.redirectToAddress('/pages/orderList/index')
    },
    redirectToAddress(url) {
      this.$router.replace(url)
    },
    getOrderDetail() {
      this.$axios.post('/mall/api/tradeOrder/detail',
          {"orderId": this.$route.query.id},
          axiosHeaders
        ).then(res => {
            let result = res.data.result;
            this.orderDetail = result
            let productSub = {}
            productSub.name = result.tradeOrderGoodsRespDTO.goodsName
            productSub.picUrl = result.tradeOrderGoodsRespDTO.picUrl
            productSub.descList = result.tradeOrderGoodsRespDTO.specifications
            productSub.totalRent = result.actualPrice 
            this.productSub = productSub
            this.finace = result.tradeOrderAttachRespDTO
        })
    },
    wuliuShow() {
        this.wuliuFlag = !this.wuliuFlag
    },
    deviceShow() {
        this.deviceFlag = !this.deviceFlag
    },
    payAtOnce() {
        this.showPopFlag = true
    },
    closePay() {
        console.log(111)
        this.showPopFlag = false
    },
    confiremOrder() {
        this.Dialog.confirm({
        title: '温馨提示',
        message: '确定要收货吗？',
        cancelButtonText:'取消',
        confirmButtonText:'确定'
        }).then(() => {
        this.$axios.post('mall/api/tradeOrder/arriveConfirm',
            {"orderId": this.$route.query.id},
            axiosHeaders
        ).then(res => {
            this.$router.go(-1)
        })
        }).catch(() => {
        // on cancel
        });
    },
    returnOrder() {
      this.$router.push(`returnDevice?orderId=${this.$route.query.id}`)
    },
    payRest() {
      this.$router.push(`payrest?orderId=${this.orderId}`)
       
    },
    cancleOrder() {
        this.Dialog.confirm({
        title: '温馨提示',
        message: '确定要取消订单吗？',
        cancelButtonText:'暂不需要',
        confirmButtonText:'取消订单'
        }).then(() => {
        this.$axios.post('mall/api/tradeOrder/cancel',
            {"orderId": this.$route.query.id},
            axiosHeaders
        ).then(res => {
            this.$router.go(-1)
        })
        }).catch(() => {
        // on cancel
        });
    }
  }
}

</script>
<style lang='scss' scoped>
.od-wrapper{
  margin-top: 50px;
  height: calc(100vh - 50px);
  overflow-y: auto;
  background-color: #ffffff;
  font-family:microsoft yahei;
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
        width: 692rpx;
        margin-left: 29rpx;
        font-size: 30rpx;
        padding: 20rpx 0;
        border-top: 1px solid #f9f9f9
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
    .can-click-container {
        // height: 90rpx;
        line-height: 45px;
        font-size: 15px;
        padding: 0 20px;
        border-bottom: 5px solid #f9f9f9;
        position: relative;
    }
    .can-click-container .icon {
        width: 15px;
        height: 9px;
        position: absolute;
        right: 15px;
        top: 18px;
    }
    .wuliu {
        border-top: 5px solid #f9f9f9;
    }
    .can-click-container .click-content {
        color: #969696;
        font-size: 12.5px;
        line-height: 15px;
        padding: 10px 0 25px 0;
    }
    .xieyi{
        color:#EF7000
    }
    .rent-container2 {
        width: 100vw;
        box-sizing: border-box;
        font-size: 15px;
        padding: 10px 15px;
        border-top: 1px solid #f9f9f9;
        border-bottom: 5px solid #f9f9f9;
    }
    .rent-container2 .rent1{
        height: 25px;
        line-height: 25px;
        font-size: 13px;
        display: flex;
        flex-direction: row;
    }
    .rent-container2 .rent1 .sub {
        color: #969696;
        font-size: 13px;
        padding-right: 15px;
    }
    .bottom-container{
        height: 50px;
        line-height: 50px;
        width: 94vw;
        margin: 0 3vw;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .bottom-container .status-text {
        font-size: 14px;
        color: #EF7000;
    }
    .bottom-container .btn-container {
        display: flex;
    }
    .bottom-container .btn-container .btn {
        font-size: 13px;
        line-height: 28px;
        margin: 11px 8px;
        padding: 0 6.5px;
        border-radius: 4px;
    }
    .btn-container .sty1 {
        color: #fff;
        background-color: #EF7000
    }
    .btn-container .sty2 {
        color: #757575;
        border: 1px solid #e0e0e0;
    }
</style>
