<template>
  <div class="wrapper">
    <div class="title">{{topic.title}}
      <navigator class="more" :url="topic.topicMore">更多<span class="go">»</span></navigator>
      <div class="subtitle">{{topic.subtitle}}</div>
    </div>
    <navigator :url="topic.topicMore"><img class="img" :src="topic.picUrl" background-size="cover" /></navigator>
    <section class="hotPro">
      <div class="hot-proc-title"><img class="hot-icon" src="/static/images/icon_hot_pro.png"/>热门商品</div>
      <div class="hot-proc-list">
        <product v-for="item of topic.goodsList" :key="item.id" :productItem="item"></product>
      </div>
    </section>
  </div>
</template>
<style scoped>
    .iconfont {
        font-family:iconfont;
    }
    .wrapper{
        background-color: #fff;
        margin: 30rpx 30rpx;
        position: relative;
    }
    .title {
      font-size: 30rpx;
      font-weight: 700;
      line-height: 50rpx;
    }
    .title .more{
      font-size: 24rpx;
      font-weight: 100;
      position: absolute;
      right: 35rpx;
      top: 0rpx;
      color: #A9A9A9;
      line-height: 50rpx;
    }
    .title .more .go{
      position: absolute;
      line-height: 50rpx;
      font-size: 48rpx;
      top: -4rpx;
    }
    .subtitle {
      font-size: 24rpx;
      font-weight: 100;
      color: #A9A9A9;
    }
    .img {
      width:690rpx;
      height:240rpx;
      margin-top: 20rpx;
      border-radius: 15rpx;
    }
    .hotPro {
      margin-top: 20rpx;
    }
    .hot-icon {
      width:24rpx;
      height:30rpx;
      display: inline-block;
      position: absolute;
      top:19rpx;
      left: 0rpx;
    }
    .hot-proc-title {
      font-size: 30rpx;
      font-weight: 700;
      line-height: 70rpx;
      position: relative;
      padding-left: 34rpx;
    }
    .hot-proc-list {
      display: flex;
      flex-wrap: wrap;
      margin-top: -10rpx;
      justify-content: space-between;
      align-content:space-between ;
    }
</style>
<script>
    import Product1 from './product1.vue';
    export default {
        components: {
            'product': Product1
        },
        props:{
          topic: {
              type: Object,
              default: {
                goodsList: []
              }
          },
        },
        data () {
            return {
            }
        },
        methods: {
            jumpWeb (_url) {
            }
        }
    }
</script>