<!--  -->
<template>
  <div class="index">
    <swiper :options="swiperOption" class="homeSwiper">
      <swiper-slide class="homeSwiperSlide" v-for="(item, i) in categoryList" :key="i">
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
    <div class="titBox">
      <div class=""></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import "swiper/dist/css/swiper.css";
 
import { swiper, swiperSlide } from "vue-awesome-swiper";

export default {
  name: "index",
  components: {
    swiper,
    swiperSlide
  },
  data () {
    return {
      categoryList: [],
      swiperOption: {
        autoplay: true,
        loop: false,
        pagination: {
          el: ".swiper-pagination"
        }
      }
    };
  },
  created () {
    this.$axios.post('/mall/home/ad',{},{headers: {'Content-Type': 'application/json;charset=UTF-8'}}).then(res => {
      
      let result = res.data.result;
      for (let item of result) {
          item.categoryUrl =  `/pages/category/index?id=${item.id}&type=category`
      }
      this.categoryList = result
      console.log('this.categoryList: ', this.categoryList)
    })
  }
};
</script>
<style lang='scss' scoped>
@import '../assets/styles/global';
.index{
  .homeSwiper{
    .homeSwiperSlide{
      height: 200px;
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

