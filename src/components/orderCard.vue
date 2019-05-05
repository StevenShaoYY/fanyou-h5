<template>
  <div class="wrapper">
    <div class="section1" @click="gotoDetail">
      {{data.orderRemark}}
    </div>
    <div @click="gotoDetail">
      <order-product :product="productSub"></order-product>
    </div>
    <div class="section2" @click="gotoDetail">
      <div>{{data.note}}</div>
      <div class="text-time">{{data.statusTime}}</div>
    </div>
    <div class="bottom-container">
      <div v-for="item of data.operationList" :key="item.id">
        <div v-if="item.id==1" @click="payAtOnce" class="btn sty1">立即付款</div>
        <div @click="confiremOrder" v-if="item.id==6" class="btn sty1">确认收货</div>
        <div v-if="item.id==3" @click="returnOrder" class="btn sty1">归还设备</div>
        <div v-if="item.id==2" @click="cancleOrder" class="btn sty2">取消订单</div>
        <div v-if="item.id==7" @click="payRest" class="btn sty2">缴纳余款</div>
      </div>
    </div>
    <pay-pop v-if="showPopFlag" :orderId="orderId" @close="closePay" @paysuccess="paySuccess" @payfail="payFail" @payunknow="payUnknow"></pay-pop>
  </div>
</template>
<style scoped>
    .wrapper{
      width: 90%;
      margin-left:auto;
      margin-right:auto;
      border-radius: 7px; 
      background-color: #ffffff;
      border: 1px solid #FAFAFA;
      box-shadow: 1px 1px 25px #cccccc;
      margin-top: 10px;
      margin-bottom: 10px;
    }
    .section1{
      background-color: #EF7000;
      height: 30px;
      color: #ffffff;
      text-align: left;
      line-height: 30px;
      border-radius: 7px 7px 0 0; 
      padding-left: 15px;
      font-size: 14px;
    }
    .section2 {
      background-color: #fafafa;
      color: #969696;
      font-size: 13px;
      margin-left: auto;
      margin-right: auto;
      width: 90%;
      padding: 15px;
      text-align: left;
      box-sizing: border-box;
    }
    .section2 .text-time {
      margin-top: 15px;
      text-align: right;
    }
    .bottom-container{
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      height: 43px;
      margin-right: 16px;
    }
    .bottom-container .btn {
      height: 22px;
      line-height: 22px;
      font-size: 13px;
      margin-left: 12px;
      padding: 0 7px;
      border-radius: 4px;
      margin-top: 10px;
    }
    .bottom-container .sty2 {
      color:#cbcbcb;
      border: 1px solid #cbcbcb;
    }
    .bottom-container .sty1 {
      color:#EF7000;
      border: 1px solid #EF7000;
    }
</style>
<script>
  import PayPop from './payPop.vue'
  import OrderProduct from './orderProduct.vue';
  import mixins from '../mixins'
  import Vue from 'vue';
    export default {
        mixins: [mixins],
        props:{
          data: {
              type: Object,
              default: {}
          },
        },
        components: {
          'order-product': OrderProduct,
          'pay-pop': PayPop
        },
        created() {
          this.orderId = this.data.orderId
          this.productSub.picUrl=this.data.picUrl
          this.productSub.descList=this.data.specifications
          this.productSub.name=this.data.goodsName
          this.productSub.orderSn=this.data.orderSn
        },
        data () {
            return {
              productSub:{},
              showPopFlag: false,
              orderId: ''
            }
        },
        methods: {
          paySuccess() {
                this.showPopFlag = false
                this.toast('支付成功！')
                this.redirectToAddress('/orderList')
          },
          payFail() {
                this.showPopFlag = false
                this.toast('支付失败！请重新支付！')
                this.redirectToAddress('/orderList')
          },
          payUnknow() {
                this.showPopFlag = false
                this.toast('支付处理中！')
                this.redirectToAddress('/orderList')
            },
            confiremOrder() {
                if(this.$mp.platform == 'alipay') {
                    my.confirm({
                        title: '温馨提示',
                        content: '确定要收货吗？',
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        success: (result) => {
                            this.POST('api/tradeOrder/arriveConfirm', {"orderId": this.$mp.query.id}, res => {
                                this.$emit('fresh')                                
                            });
                        },
                    });
                } else {
                    wx.showModal({
                        title: '温馨提示',
                        content: '确定要收货吗？',
                        confirmText: '确定',
                        cancelText: '取消',
                        success: (result) => {
                            this.POST('api/tradeOrder/arriveConfirm', {"orderId": this.$mp.query.id}, res => {
                                this.$emit('fresh')                               
                            });
                        },
                    });
                }
            },
            redirectToAddress(url) {
              this.$router.replace(url)
             
            },
            cancleOrder() {
              let order = this.data.orderId
                if(this.$mp.platform == 'alipay') {
                    my.confirm({
                        title: '温馨提示',
                        content: '确定要取消订单吗？',
                        confirmButtonText: '取消订单',
                        cancelButtonText: '暂不需要',
                        success: (result) => {
                            if(result.confirm) {
                                this.POST('api/tradeOrder/cancel', {"orderId": order}, res => {
                                    this.$emit('fresh')                                  
                                });
                            } else {
                                return
                            }
                        },
                    });
                } else {
                    wx.showModal({
                        title: '温馨提示',
                        content: '确定要取消订单吗？',
                        confirmText: '取消订单',
                        cancelText: '暂不需要',
                        success: (result) => {
                            if(result.comfirm) {
                                this.POST('api/tradeOrder/cancel', {"orderId": order}, res => {
                                   this.$emit('fresh')                                 
                                });
                            } else {
                                return
                            }
                            
                        },
                    });
                }
            },
          gotoDetail() {
            this.$router.push(`/orderDetail?id=${this.data.orderId}`)
          },
          payRest() {
            this.$router.push(`/payrest?id=${this.data.orderId}`)
          },
          payAtOnce() {
            this.showPopFlag = true
          },
          closePay() {
            this.showPopFlag = false
          },
          returnOrder() {
            this.$router.push(`/returnDevice?orderId=${this.orderId}`)
          }
        }
    }
</script>