<template>
  <div class="pay-container" v-if="showPay">
        <div class="pay-main">
            <div class="cot-1">
                确认付款
                <img @click="closePay" class="icon-cloce" src="/static/images/btn_close_popup.png"/>
            </div>
            <div class="cot-2">
                <div class="text1">¥{{payInfo.amount}}</div>
                <div class="text2">{{payInfo.note}}</div>
            </div>
            <div class="cot-3" v-if="$mp.platform=='alipay'">
                <img class="icon-zfb" src="/static/images/icon_zhifubao_pay.png"/>
                <div class="text">支付宝</div>
                <img class="icon-check" src="/static/images/btn_choose_pay.png"/>
            </div>
            <div class="cot-3" v-if="$mp.platform=='wechat'">
                <img class="icon-zfb" src="/static/images/icon_wechat_pay.png"/>
                <div class="text">微信</div>
                <img class="icon-check" src="/static/images/btn_choose_pay.png"/>
            </div>
            <div @click="payOrder" class="botton-btn">立即付款</div>
        </div>
    </div>
</template>
<style scoped>
    .pay-container {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        /* width: 100vw;
        height: 100vh; */
        z-index: 106;
        background: rgba(0, 0, 0, 0.5);
    }
    .pay-main {
        position: absolute;
        bottom: 0;
        width: 100vw;
        z-index: 888;
        background-color: #fff;
        border-radius: 50rpx 50rpx 0 0;
    }
    .pay-main .cot-1 {
        height: 100rpx;
        line-height: 100rpx;
        text-align: center;
        font-size: 30rpx;
        border-bottom: 1px solid #e6e6e6
    }
    .pay-main .icon-cloce {
        width: 48rpx;
        height: 48rpx;
        position: absolute;
        right: 40rpx;
        top: 26rpx;
    }
    .pay-main .cot-2 {
        text-align: center;
        margin: 0 50rpx;
        padding: 20rpx 50rpx;
        border-bottom: 1px solid #e6e6e6
    }
    .pay-main .cot-2 .text1{
        font-size: 70rpx;
        font-weight: 700;
        line-height: 100rpx;
    }
    .pay-main .cot-2 .text2{
        font-size: 30rpx;
        font-weight: 200;
        color: #999999;
        line-height: 80rpx;
    }
    .pay-main .cot-3 {
        height: 130rpx;
        line-height: 130rpx;
        margin: 0 50rpx;
        border-bottom: 1px solid #e6e6e6;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 90rpx;
    }
    .pay-main .cot-3 .text{
        flex: 1;
        font-size: 28rpx;
        margin-left: 30rpx;
    }
    .pay-main .icon-zfb{
        width: 83rpx;
        height: 74rpx;
    }
    .pay-main .icon-check{
        width: 69rpx;
        height: 48rpx;
    }
    .botton-btn {
        color: #fff;
        background-color: #FF6F00;
        height: 80rpx;
        border-radius: 40rpx;
        text-align: center;
        width: 692rpx;
        margin-left: 29rpx;
        line-height: 80rpx;
        font-weight: 400;
        font-size: 30rpx;
        margin-bottom: 30rpx;
    }
</style>
<script>
    import mixins from '../mixins'
    export default {
        mixins: [mixins],
        props:{
          orderId: {
              type: String,
              default: ''
          },
          planList: {
              type: Array,
              default: []
          }
        },
        created() {
          this.payAtOnce()
        },
        data () {
            return {
              showPay:false,
              payInfo: {}
            }
        },
        methods: {
          payAtOnce() {
            let ddto = {
              'orderId': this.orderId,
              'planIdList': this.planList
            }
            this.POST('orderPlan/payPlanList', ddto, res => {
              let result = res.data.result;
              result.amount = result.amount.toFixed(2)
              this.payInfo = result
              this.showPay = true
            });
          },
          payOrder() {
                let payDto = {
                    "amount": this.payInfo.amount,
                    "payInfo": this.payInfo.note,
                    "planIdList": this.planList,
                    "tradeOrderId": this.orderId
                }
                this.POST('api/pay/planAliPayCreateApplet', payDto, res => {
                    let result = res.data.result;
                    if(this.$mp.platform === 'alipay') {
                        my.tradePay({
                        tradeNO: result, // 调用统一收单交易创建接口（alipay.trade.create），获得返回字段支付宝交易号trade_no
                        success: (res) => {
                           if(res.resultCode == 9000) {
                               this.$emit('paysuccess')
                           } else if(res.resultCode == 4000 || res.resultCode == 6001 || res.resultCode == 6002 || res.resultCode == 99){
                               this.$emit('payfail')
                           } else if(res.resultCode == 8000 || res.resultCode == 6004){
                               this.$emit('payunknow')
                           }
                        },
                        fail: (res) => {
                            this.$emit('payfail')
                        }
                        });
                    }
                });
          },
          closePay() {
            this.$emit('close')      
          }
        }
    }
</script>