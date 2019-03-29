<template>
  <div class="wrapper">
    <navigator class="product-item" :url="productItem.goodsDetailUrl">
      <img class="img" :src="productItem.picUrl" background-size="cover" />
      <div class="title">{{productItem.name}}</div>
      <div class="price">¥{{productItem.rentPrice.toFixed(2)}}/{{productItem.periodUnit}}起</div>
    </navigator>
  </div>
</template>
<style scoped>
    .iconfont {
        font-family:iconfont;
        font-family:microsoft yahei;
    }
    .wrapper{
        background-color: #F9F9F9;
        border-radius: 15rpx;
        width: 330rpx;
        height: 360rpx;
        margin-top: 20rpx;     
    }
    .product-item {
      width: 330rpx;
      height: 360rpx;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center; 
    }
    .img {
      width: 180rpx;
      height: 205rpx;
    }
    .title {
      font-size: 28rpx;
      font-weight: 400;
      /* padding: 0 20rpx; */
      color: #A9A9A9;
      width: 290rpx;
      margin-left: 20rpx;
      text-align: center;
      white-space:nowrap;
      text-overflow: ellipsis;
      overflow:hidden;
      margin-top: 10rpx;
      line-height: 30rpx;
    }
    .price {
      line-height: 32rpx;
      font-size: 32rpx;
      margin-top: 10rpx;
      font-weight: 400;
    }
</style>
<script>
    export default {
        props:{
          productItem: {
              type: Object,
              default: {}
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