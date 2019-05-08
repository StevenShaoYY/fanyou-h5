<template>
  <div class="pay-container" v-if="showPay">
        <div class="pay-main">
            <div class="cot-1">
                确认付款
                <img @click="closePay" class="icon-cloce" src="@/assets/images/btn_close_popup.png"/>
            </div>
            <div class="cot-2">
                <div class="text1">¥{{payInfo.amount}}</div>
                <div class="text2">{{payInfo.note}}</div>
            </div>
            <div class="cot-3" @click="selectPayWay(1)">
                <img class="icon-zfb" src="@/assets/images/icon_zhifubao_pay.png"/>
                <div class="text">支付宝</div>
                <img v-if="selectPay == 1" class="icon-check" src="@/assets/images/btn_choose_pay.png"/>
            </div>
            <div class="cot-3" @click="selectPayWay(2)">
                <img class="icon-zfb" src="@/assets/images/icon_wechat_pay.png"/>
                <div class="text">微信</div>
                <img v-if="selectPay == 2" class="icon-check" src="@/assets/images/btn_choose_pay.png"/>
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
        border-radius: 50px 50px 0 0;
    }
    .pay-main .cot-1 {
        height: 50px;
        line-height: 50px;
        text-align: center;
        font-size: 15px;
        border-bottom: 1px solid #e6e6e6
    }
    .pay-main .icon-cloce {
        width: 24px;
        height:  24px;
        position: absolute;
        right: 30px;
        top: 13px;
    }
    .pay-main .cot-2 {
        text-align: center;
        margin: 0 25px;
        padding: 10px 25px;
        border-bottom: 1px solid #e6e6e6
    }
    .pay-main .cot-2 .text1{
        font-size: 35px;
        font-weight: 700;
        line-height: 50px;
    }
    .pay-main .cot-2 .text2{
        font-size:15px;
        font-weight: 200;
        color: #999999;
        line-height: 40px;
    }
    .pay-main .cot-3 {
        height: 65px;
        line-height: 65px;
        margin: 0 25px;
        border-bottom: 1px solid #e6e6e6;
        display: flex;
        flex-direction: row;
        align-items: center;
        /* justify-content: space-between; */
        margin-bottom: 15px;
    }
    .pay-main .cot-3 .text{
        /* flex-grow: 0;
        flex-shrink: 0; */
        /* flex:0 0 calc(100% - 100px); */
        width: calc(100% - 100px);
        font-size: 14px;
        margin-left: 15px;
    }
    .pay-main .icon-zfb{
        width: 41px;
        height: 37px;
    }
    .pay-main .icon-check{
        width: 35px;
        height: 24px;
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
</style>
<script>
    import mixins from '../mixins'
    import {axiosHeaders} from "@/assets/api";
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
              payInfo: {},
              selectPay:1
            }
        },
        methods: {
            selectPayWay(index){
                this.selectPay = index
            },

          payAtOnce() {
            let ddto = {
              'orderId': this.orderId,
              'planIdList': this.planList
            }
            this.$axios.post('/mall/api/orderPlan/payPlanList',
                ddto,
                axiosHeaders
            ).then(res => {
              let result = res.data.result;
              result.amount = result.amount.toFixed(2)
              this.payInfo = result
              this.showPay = true
            });
          },
          payWeixin(){
            let payDto = {
                "amount": this.payInfo.amount,
                "payInfo": this.payInfo.note,
                "planIdList": this.planList,
                "tradeOrderId": this.orderId
            }
            this.$axios.post('/mall/api/wxpay/v1.0/wxpayPlanAppletCreate',
                payDto,
                axiosHeaders
            ).then(res => {
                console.log(res)
            })
          },
          payAli() {
            let payDto = {
                "amount": this.payInfo.amount,
                "payInfo": this.payInfo.note,
                "planIdList": this.planList,
                "tradeOrderId": this.orderId
            }
            this.$axios.post('/mall/api/pay/planAliPayWAPCreate',
                payDto,
                axiosHeaders
            ).then(res => {
                const div = document.createElement('div')
                div.innerHTML = res.data.result
                document.body.appendChild(div)
                document.forms[0].submit()
            })
          },
          payOrder() {
            if(this.selectPay == 1) {
                this.payAli()
            } else {
                this.payWeixin()
            }
                // let payDto = {
                //     "amount": this.payInfo.amount,
                //     "payInfo": this.payInfo.note,
                //     "planIdList": this.planList,
                //     "tradeOrderId": this.orderId
                // }
                // this.POST('api/pay/planAliPayCreateApplet', payDto, res => {
                //     let result = res.data.result;
                //     if(this.$mp.platform === 'alipay') {
                //         my.tradePay({
                //         tradeNO: result, // 调用统一收单交易创建接口（alipay.trade.create），获得返回字段支付宝交易号trade_no
                //         success: (res) => {
                //            if(res.resultCode == 9000) {
                //                this.$emit('paysuccess')
                //            } else if(res.resultCode == 4000 || res.resultCode == 6001 || res.resultCode == 6002 || res.resultCode == 99){
                //                this.$emit('payfail')
                //            } else if(res.resultCode == 8000 || res.resultCode == 6004){
                //                this.$emit('payunknow')
                //            }
                //         },
                //         fail: (res) => {
                //             this.$emit('payfail')
                //         }
                //         });
                //     }
                // });
          },
          closePay() {
            this.$emit('close')      
          }
        }
    }
</script>