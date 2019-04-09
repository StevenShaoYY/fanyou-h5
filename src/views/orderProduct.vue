<!-- D:\jz\src\pages\orderList -->
<template>
  <div class="container">
    <ul class="tab-list">
        <li class="ta-li" v-for="(item,index) of tabList" :key="index" :class="{'active':index==activeItem}" @click="switchTab(index)">
        {{item.remark}}
        </li>
    </ul>
    <swiper :options="swiperOption" class="homeSwiper">
      <swiper-slide class="orderSwiperSlide" v-for="(item, i) in detailList" :key="i" >
        <div class="comment-container has-comment" v-if="item.data.length>0">
            <order-card v-for="(item1, index1) of item.data" :key="index1" :data="item1" @fresh="refreshPage"></order-card>
        </div>
        <div class="no-order-container" v-if="item.data.length==0">
            <div class="no-comment">暂无订单</div>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import axios from 'axios'
import "swiper/dist/css/swiper.css";
import {axiosHeaders} from "@/assets/api"
import { swiper, swiperSlide } from "vue-awesome-swiper";
import orderCard from '../components/orderCard.vue';
export default {
  name: '',

  components: {
    swiper,
    swiperSlide,
    orderCard
  },

  data () {
    return {
        tabList: [],
        swiperOption: {
          autoplay: false,
          loop: false,
          pagination: {
            el: ".swiper-pagination",
            clickable :true
          },
          on:{
            slideChangeTransitionEnd: () => {
              console.log('this.realIndex: ', this.realIndex)
            },
          }
        },
        activeItem: 0,
        detailList: [
            {
                id:'',
                data: []
            },
            {
                id:'',
                data: []
            },
            {
                id:'',
                data: []
            },
        ],
        winHeight: ''
    }
  },

  computed: {},

  watch: {},

  created () {
    this.getOrderData()
  },

  mounted () {},

  methods: {
    refreshPage() {
        let sta = this.tabList[this.activeItem].status
        this.getOrderByStatus(sta ,this.activeItem)
    },
    getOrderData () {
      this.$axios.post('/mall/api/tradeOrder/statusList',
        {},
        axiosHeaders
      ).then(res => {
        let result = res.data.result;
        this.tabList = result
        for(let i in this.tabList) {
            this.$set(this.detailList[i],'id',this.tabList[i].status)
            // this.detailList[i].id = this.tabList[i].status
        }
        this.getOrderByStatus(this.tabList[0].status, 0)
      });
    },
    getOrderByStatus(sta ,index) {
        let dto = {
            "orderStatus": sta,
            "pageNum": 0,
            "pageSize": 0
        }
        this.$axios.post('/mall/api/tradeOrder/list',
          dto,
          axiosHeaders
        ).then(res => {
          let result = res.data.result;
          this.$set(this.detailList[index],'data',result)
        })
    },
    switchTab (index) {
        this.activeItem = index        
    }
  }
}

</script>
<style lang='scss' scoped>
  .container{
        background-color: #fff;
        font-family:microsoft yahei;
        position: relative;
    }
    .tab-list {
        background-color: #fff;
        display: flex;
        height: 60px;
        justify-content: space-around;
        align-items: center;
        width: 346px;
        margin-left: 14px;
        // margin-top: 10rpx;
    }
    .tab-list .ta-li {
        font-size: 14px;
        line-height: 40px;
        color: #a8a8a8;
        border-radius: 20px;
        background-color: #fff;
        width: 100px;
        display: flex;
        justify-content: center;
        margin-top: 10px;
        // border: 1rpx solid #FFFFFF;
    }
    .tab-list .active {
      border: 1rpx solid #f6f6f6;
      background-color: #fff;
      box-shadow: 2px 2px 10px #cccccc;
      color:#1b1b1b;
    }
    .no-order-container {
        display: flex;
        justify-content: center;
        align-items: center;
        color: #a8a8a8;
        font-size: 14px;
        height: 100%;
        background-color: #fff;
    }
    .swiper-container {
        margin-top: 15px;
        background-color: #fff;
    }
</style>
