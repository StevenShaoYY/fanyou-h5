<!-- D:\jz\src\pages\returnDevice -->



<template>
  <div>
    <div class="wrapper">
      <div class="header-container">
        <p class="header-p1">到期归还</p>
        <p class="header-p2">未租满1个月归还需缴纳一个月的租金</p>
      </div>
    </div>

    <div class="product-detail-container">
            <order-product :product="productSub"></order-product>
        </div>
        <div class="rent-container">
            <div class="rent1">
                <div class="sub">本单起租日期：</div>
               <!-- <div>{{orderDetail.beginTime}}</div>-->
            </div>
            <div class="rent1">
                <div class="sub">本单到期日期：</div>
               <!-- <div>{{orderDetail.endTime}}</div>-->
            </div>
            <div class="rent1">
                <div class="sub">代缴租金总计：</div>
                <!--<div>¥{{orderDetail.totalRentAmount.toFixed(2)}}</div>-->
            </div>
        </div>
        <div class="rent-container" >
            <div class="rent1">
                <div class="sub">违约金：</div>
                <!--<div>¥{{orderDetail.penalAmount.toFixed(2)}}</div>-->
            </div>
            <div class="rent1">
                <div class="sub">逾期未缴总计：</div>
               <!-- <div>¥{{orderDetail.overdueAmount.toFixed(2)}}</div>-->
            </div>
            <div class="rent1">
                <div class="sub">总需补齐资金：</div>
              <!--  <div>¥{{(orderDetail.penalAmount+orderDetail.overdueAmount).toFixed(2)}}</div>-->
            </div>
        </div>
        <div class="text-container">
            <p>1.我们收到货品后会检测,质检结果会同步到归还进度里,代缴金额的账号也会罗列在您个人中心的缴费计划里。</p> 
            <p style="margin-top:20rpx">2.逾期或违约,或将影响您的芝麻信用。</p>
        </div>
        <div class="startOrder">
            下一步
        </div>
  </div>
</template>

<script>
import mixins from '../mixins'
import {axiosHeaders} from "@/assets/api" 
import OrderProduct from '../components/orderProduct.vue';
export default {
  name: 'returnDevice',
  mixins: [mixins], 

  components: {
      'order-product': OrderProduct
  },

  data () {    
    return {
        productSub: {},
        orderDetail: {},
        orderId: '',
        canClick:true
    }
  },

  computed: {},

  watch: {},

  created () {
      this.orderId = this.$route.query.orderId
      this.getOrderDetail()
  },

  mounted () {},

  methods: {
      getOrderDetail() {
          this.$axios.post('/mall/api/tradeOrder/backInfo',
            {"orderId": this.orderId},
            axiosHeaders
          ).then(res => {
                if(res.data.ok){
                    let result = res.data.result;
                    this.orderDetail = result
                    let productSub = {}
                    productSub.name = result.tradeOrderGoodsRespDTO.goodsName
                    productSub.picUrl = result.tradeOrderGoodsRespDTO.picUrl
                    productSub.descList = result.tradeOrderGoodsRespDTO.specifications
                    productSub.totalRent = result.totalRentAmount 
                    this.productSub = productSub
                } else {
                    this.canClick = false
                    this.toast(res.data.msg)
                }
          })
        },
        nextStep() {
            console.log(this.canClick)
            if(this.canClick==false) {
                return 0
            }
            console.log(1111)
        },
        getOrderDetailTest() {
                let result = {
                    "tradeOrderId": 394,
                    "isBacking": true,
                    "tradeOrderGoodsRespDTO": {
                    "goodsName": "iPhone7    国行三网通 99新",
                    "specifications": [
                        "金色",
                        "32G"
                    ],
                    "picUrl": "http://rent-mall.oss-cn-beijing.aliyuncs.com/kvpn168xxo4glnyhm2n0.png"
                    },
                    "totalRentAmount": 0.03,
                    "beginTime": "2018-07-25",
                    "endTime": "2018-10-25",
                    "totalPayAmount": 0.01,
                    "penalAmount": 0,
                    "overdueAmount": 0,
                    "totalRepayAmount": 0,
                    "receiveName": "小北",
                    "postCode": "310000",
                    "mobile": "0571-86507022",
                    "address": "杭州市萍水街 333 号御峰大厦 1922 室",
                    "shipChannel": "xumin746854",
                    "shipSn": "东风"
                }
                this.orderDetail = result
                let productSub = {}
                productSub.name = result.tradeOrderGoodsRespDTO.goodsName
                productSub.picUrl = result.tradeOrderGoodsRespDTO.picUrl
                productSub.descList = result.tradeOrderGoodsRespDTO.specifications
                productSub.totalRent = result.totalRentAmount 
                this.productSub = productSub
        }
  }
}

</script>
<style lang='scss' scoped>
 .wrapper{
        background-color: #ffffff;
        font-family:microsoft yahei;
    }
  .header-container{
        width: 100%;
        height: 100px;
        background: linear-gradient(to bottom right, #f24f18 , #ffc561);
        color: #fff;
        line-height: 30px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        font-size: 15px;
        padding-left: 15px;
        text-align: left;
    }
    .header-container .header-p1 {
        font-weight: 700;
    }
    .product-detail-container {
        width: 90%;
        margin-left: auto;
        margin-right: auto;
        border: 1px solid #FAFAFA;
        border-radius: 10px;
        margin-top: 10px;
        height: 110px;
        box-shadow: 1px 1px 7rpx #cccccc;
    }
    .rent-container {
        width: 90%;
        margin-left: auto;
        margin-right: auto;
        font-size: 15px;
        padding: 10px 0;
        border: 1px solid #FAFAFA;
        border-radius: 10px;
        margin-top: 10px;
        box-shadow: 1px 1px 7px #cccccc;
    }
    .rent-container .rent1{
        height: 25px;
        line-height: 25px;
        padding: 0 15px;
        font-size: 15px;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
    }
    .rent-container .rent1 .sub {
        color: #969696;
        font-size: 15px;
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
    .rent-container2 {
        width: 350px;
        font-size: 15px;
        padding: 10px 14px;
        border-top: 1px solid #f9f9f9;
        border-bottom: 5px solid #f9f9f9;
    }
    .rent-container2 .rent1{
        height: 25px;
        line-height: 25px;
        font-size:13px;
        display: flex;
        flex-direction: row;
    }
    .rent-container2 .rent1 .sub {
        color: #969696;
        font-size: 13px;
        padding-right: 15px;
    }
    .text-container {
        font-size: 13px;
        margin:15px;
        text-align: left;
        line-height: 24px;
    }
    .startOrder{
        color: #fff;
        background-color: #FF6F00;
        height: 40px;
        border-radius: 20px;
        text-align: center;
        width: 346px;
        left: 50%;
        margin-left: -173px;
        line-height: 40px;
        font-weight: 400;
        font-size: 15px;
        position: absolute;
        bottom: 15px;
    }
    .grayOrder{
        background-color: #aaa;
    }

</style>
