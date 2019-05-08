<!--  -->
<template>
  <div class="wrapper">
      <header-bar></header-bar>
      <div class="select-all" @click="clickSelectAll">
          <div  :class="{'selected':selectAll,'not-select':!selectAll} "></div>
          <div class="select-all-text">全选</div>
      </div>
      <div class="main-wrapper">
          <div @click="selcetNeedPay($event)" :data-index='index' v-for="(item, index) in orderPlanList" :key="index" class="pay-item" :class="{'needntpay':item.status,'needpay':!item.status} ">
              <div v-if="item.status==0" class="icon-container">
                  <div :class="{'selected':item.selected,'not-select':!item.selected} "></div>
              </div>
              <div class="text-container">
                  <div class="item-text">
                      <div>
                          {{item.periodNum}}/{{orderPlanList.length}}期
                      </div>
                      <div style="font-size:32rpx" v-if="item.status==1">已缴清</div>
                      <div style="font-size:32rpx" v-if="item.status==0">待缴费</div>
                  </div>
                  <div class="item-text">
                      <div class="price-text">{{item.actualRepayAmount}}</div>
                      <div class="gray">{{item.repayDate}}</div>
                  </div>
              </div>
          </div>
      </div>
      <div class="botton-btn" @click='payAtOnce'>立即缴费<span v-if="needPayMoney!=0">({{needPayMoney}})</span></div>
      <payrest v-if="showPopFlag" :orderId="orderId" :planList="selectPlan" @close="closePay" @paysuccess="paySuccess" @payfail="payFail" @payunknow="payUnknow"></payrest>
  </div>
</template>

<script>
import {axiosHeaders} from "@/assets/api";
import HeaderBar from '../components/headerBar.vue';
import Payrest from '../components/payRest.vue';
export default {
  name: '',

  components: {
    HeaderBar,
    'payrest': Payrest
  },

  data () {
    return {
        orderPlanList: [],
        selectAll: false,
        needPayMoney: 0,
        orderId: '',
        selectPlan: [],
        showPopFlag: false
    }
  },

  computed: {},

  watch: {},

  created () {
    if(this.$route.query.id) {
        this.orderId = this.$route.query.id
        this.getPayList()
    }
    // this.getTEstList()
  },

  mounted () {},

  methods: {
    payAtOnce() {
        this.selectPlan = []
        for(let item of this.orderPlanList) {
            if (!item.status) {
                if(item.selected){
                    this.selectPlan.push(item.id)
                }
            }
        }
        if(this.selectPlan.length <=0 ) {
            this.toast('请先选择付款项！')
            return 
        }
        this.showPopFlag = true
    },
    selcetNeedPay(e) {
        let index = e.currentTarget.dataset.index
        if (!this.orderPlanList[index].status) {
            this.orderPlanList[index].selected = !this.orderPlanList[index].selected
            if(this.orderPlanList[index].selected==false) {
                this.needPayMoney = this.needPayMoney - this.orderPlanList[index].repayAmount
            } else {
                this.needPayMoney = this.needPayMoney + this.orderPlanList[index].repayAmount
            }
        }
    },
    closePay() {
        this.showPopFlag = false
    },
    paySuccess() {
        this.showPopFlag = false
        this.toast('支付成功！')
        // this.redirectToAddress('/pages/orderList/index')
        this.$router.go(-1)
    },
    payFail() {
        this.showPopFlag = false
        this.toast('支付失败！请重新支付！')
        this.$router.go(-1)
        // this.redirectToAddress('/pages/orderList/index')
    },
    payUnknow() {
        this.showPopFlag = false
        this.toast('支付处理中！')
        this.$router.go(-1)
        // this.redirectToAddress('/pages/orderList/index')
    },
    clickSelectAll() {
        this.selectAll = !this.selectAll
        this.needPayMoney = 0
        for(let item of this.orderPlanList) {
            if (!item.status) {
                item.selected = this.selectAll
                if(this.selectAll){
                    this.needPayMoney = this.needPayMoney+item.repayAmount
                } else {
                    this.needPayMoney = 0
                }
            }
        }
    },
    getPayList() {
        let commentDto = {
            "orderId": this.orderId
        }
        this.$axios.post('/mall/api/orderPlan/list',
          commentDto,
          axiosHeaders
        ).then(res => {
            let result = res.data.result;
            for (let i  of result) {
                i.selected = false
                i.repayAmount = parseInt(i.repayAmount)
            }
            this.orderPlanList = result;
        });
    },
    getTEstList() {
        let result = [
            {
            "id": 268,
            "orderId": 515,
            "userId": 1224,
            "periodNum": 1,
            "repayAmount": 0.02,
            "attachRepayAmount": null,
            "overdueAmount": null,
            "actualRepayAmount": 0.02,
            "repayDate": "2018-12-16 12点之前缴清",
            "payAmount": 0.03,
            "payDate": "2018-12-13 16:05:22",
            "status": 1,
            "isOverdue": 0
            }
        ]
        for (let i  of result) {
            i.selected = false
        }
        this.orderPlanList = result;
    }
  }
}

</script>
<style lang='scss' scoped>
.wrapper {
        font-family:microsoft yahei;
        width: 100vw;
        background-color: #fff;
        padding-top: 50px;
        font-size: 14px;
    }
    .select-all{
        display: flex;
        flex-direction: row;
        margin: 0 15px;
        padding: 10px 0;
    }
    .select-all .select-all-text {
        padding-left: 5px;
    }
    .selected{
        width: 18px;
        height: 18px;
        border-radius: 9px;
        background-color: #EF6700;
    }
    .not-select{
        width: 16px;
        height: 16px;
        border-radius: 8px;
        border: 1px solid #ccc;
    }
    .main-wrapper{
        width: 94vw;
        margin-left: 3vw;
        height: calc(100vh - 160px);
        overflow-y: auto;
        border: 1px solid #FAFAFA;
        border-radius: 10px;
        box-shadow: 1px 1px 25px #cccccc;
    }
    .needntpay {
        color: #cccccc
    }
    .pay-item{
        width: 86vw;
        margin: 0 10px;
        padding: 10px 0;
        display: flex;
    }
    .icon-container{
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 20px 0 0;
    }
    .pay-item + .pay-item {
        border-top: 1px solid #ccc;
    }
    .price-text{
        font-weight: 400;
        font-size: 19px;
    }
    .text-container{
        flex:auto;
    }
    .item-text {
        display: flex;
        justify-content: space-between;
        line-height: 30px;
    }
    .gray{
        color: #cccccc;
    }
    .botton-btn {
        color: #fff;
        background-color: #FF6F00;
        height: 40px;
        border-radius: 20px;
        text-align: center;
        width: 94vw;
        line-height:40px;
        font-weight: 400;
        font-size: 15px;
        bottom: 15px;
        left: 15px;
        position: absolute;
    }
</style>
