<template>
  <div class="wrapper">
    <img class="star" v-for="(item,index) of starList" :key="index" src="/static/images/star_evaluate_enable.png" alt="">
    <img class="star" v-for="(item,index) of fakeList" :key="index" src="/static/images/star_evaluate_disable.png" alt="">
  </div>
</template>
<style scoped>
    .iconfont {
        font-family:iconfont;
    }
    .wrapper{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      width: 180rpx;
      height: 30rpx;
    }
    .star{
      width: 30rpx;
      height: 30rpx;
    }
</style>
<script>
    export default {
        props:{
          starNum: {
              type: Number,
              default: {}
          },
        },
        data () {
          return {
            starList: [],
            fakeList: []
          }
        },
        created () {
          this.initStar()
        },
        methods: {
          initStar() {
            for (let i = 0; i < this.starNum; i++) {
              this.starList.push({
                trueStar:true
              })
            }
            for (let i = 0; i < 5 - this.starNum; i++) {
              this.fakeList.push({
                trueStar:false
              })
            }
          }
        }
    }
</script>