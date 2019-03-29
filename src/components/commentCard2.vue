<template>
  <div class="wrapper">
    <div class="first-section">
      <img class="image" :src="commentItem.goodsImage" background-size="cover"/>
      <div class="inner-container">
        <div class="user-text">{{commentItem.goodsName}}</div>
        <star :starNum="commentItem.star"></star>
      </div>
    </div>
    <div class="second-section">
      {{commentItem.content}}
    </div>
    <div class="third-section">
      {{commentItem.addTime}}
    </div>
  </div>
</template>
<style scoped>
    .wrapper{
      height: 245rpx;
      width: 630rpx;
      margin-left: 30rpx;
      border-bottom: 1px solid #f5f5f5
    }
    .first-section {
      display: flex;
      flex-direction: row;
      margin-top: 30rpx;
    }
    .image {
      width: 90rpx;
      height: 90rpx;
      margin-right: 25rpx;
    }
    .inner-container {
      display: flex;
      flex-direction: column;
      font-size: 26rpx;
      font-weight: 400;
    }
    .user-text {
      line-height: 60rpx;
    }
    .second-section {
      margin-top: 30rpx;
      font-size: 26rpx;
    }
    .third-section {
      margin-top: 30rpx;
      font-size: 24rpx;
      color: #a8a8a8;
    }
</style>
<script>
import Star from './star.vue';
    export default {
        props:{
          commentItem: {
              type: Object,
              default: {}
          },
        },
        components: {
          'star': Star
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