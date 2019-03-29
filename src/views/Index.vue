<!--  -->
<template>
  <div class="index">
    <swiper :options="swiperOption" class="homeSwiper">
      <swiper-slide class="homeSwiperSlide" v-for="(item, i) in YXBanners" :key="i">
        <img class="img" :src="item.url" background-size="cover" />
        <text class="text">{{item.name}}</text>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <ul class="nav">
      <li>
        <div class="navImg"></div>
        <span class="navTxt">台式机</span>
      </li>
      <li>
        <div class="navImg"></div>
        <span class="navTxt">手机</span>
      </li>
      <li>
        <div class="navImg"></div>
        <span class="navTxt">游戏机</span>
      </li>
      <li>
        <div class="navImg"></div>
        <span class="navTxt">数码潮品</span>
      </li>
    </ul>
    <section class="hot-wrapper" v-for="item of topic" :key="item.id" >
      <topic :topic="item"></topic>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
import "swiper/dist/css/swiper.css";
import {axiosHeaders} from "@/assets/api"
import topic from '@/components/topic.vue';
 
import { swiper, swiperSlide } from "vue-awesome-swiper";

export default {
  name: "index",
  components: {
    swiper,
    swiperSlide,
    topic
  },
  data () {
    return {
      YXBanners: [],
      categoryList: [],
      topic: [],
      showLoading: 'hide',
      pageData: {
          "pageNum": 1,
          "pageSize": 10
      },
      scrollX: true,
      swiperOption: {
        autoplay: false,
        loop: false,
        pagination: {
          el: ".swiper-pagination"
        }
      }
    };
  },
  created () {
    this.getYXBanners();
    this.getCategoryList();
    this.getTopic();
  },
  methods: {
    getYXBanners() {
      this.$axios.post('/mall/home/ad',
        {},
        axiosHeaders
      ).then(res => {
        let result = res.data.result;
        this.YXBanners = result
      })
    },
    getCategoryList() {
      this.$axios.post('/mall/mallCategory/list',
        this.pageData,
        axiosHeaders
      ).then(res => {
        let result = res.data.result;
        for (let item of result) {
            item.categoryUrl =  `/pages/category/index?id=${item.id}&type=category`
        }
        this.categoryList = result
      })
    },
    getTopic() {
      this.$axios.post('/mall/home/topic',
        {},
        axiosHeaders
      ).then(res => {
        let result = res.data.result;
        for (let item of result) {
            item.topicMore = `/pages/category/index?id=${item.id}&type=topic`
            for (let goods of item.goodsList) {
                goods.goodsDetailUrl = `/pages/goodsDetail/index?id=${goods.id}`
            }
        }
        this.topic = result
      })
    }
  }
};
</script>
<style lang='scss' scoped>
@import '../assets/styles/global';
.index{
  .homeSwiper{
    margin: 0 20px;
    border-radius: 6px;
    .homeSwiperSlide{
      height: 200px;
      width: 100%;
      img{
        width: 100%;
        height: 100%;
      }
    }
  }
  .nav{
    padding: 20px;
    display: flex;
    li{
      flex: 1;
      display: flex;
      flex-direction: column;
      height: 120px;
      .navImg{
        height: 80px;
        width: 100%;
      }
      .navTxt{
        display: flex;
        flex: 1px;
        font-size: px2rem(16);
        justify-content: center;
        align-items: center;        
      }
    }
  }
}

</style>

