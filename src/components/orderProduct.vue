<template>
  <div class="wrapper">
    <div class="product-item">
      <img class="img" :src="product.picUrl" background-size="cover" />
      <div class="item-container">
        <div class="title">{{product.name}}</div>
        <div class="tab-container">
          <div class="sub-item" v-for="(item, index) of product.descList" :key="index">{{item}}</div>
        </div>
        <div v-if="product.price" class="price">商品价值：<span class="span">¥{{product.price.toFixed(2)}}</span></div>
        <div v-if="product.totalRent" class="price">租金总额：<span class="span">¥{{product.totalRent.toFixed(2)}}</span></div>
        <div v-if="product.orderSn" class="price">订单编号：<span class="span1">{{product.orderSn}}</span></div>
      </div>
    </div>
  </div>
</template>
<style scoped>
    .wrapper{
        background-color: #ffffff;
        width: 692rpx;
        height: 220rpx;
        margin-bottom: 20rpx;     
    }
    .product-item {
      display: flex;
    }
    .product-item .img {
      width: 170rpx;
      height: 170rpx;
      margin-top: 25rpx;
      margin-left: 25rpx;
    }
    .item-container {
      width: 554rpx;
      margin-left: 25rpx;
      margin-top: 30rpx;
    }
    .item-container .title {
      padding-right: 20rpx;
      font-size: 30rpx;
      font-weight: 400;
      white-space:nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      line-height: 40rpx;
    }
    .tab-container {
      display: flex;
      flex-direction: row;
    }
    .sub-item {
      margin: 20rpx 10rpx 15rpx 0;
      max-width: 100rpx;
      white-space:nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      height: 36rpx;
      border: 1px solid #c4c4c4;
      border-radius: 18rpx;
      padding: 0 10rpx;
      line-height: 36rpx;
      font-size: 24rpx;
      color: #c4c4c4;
      display: block;
    }
    .item-container .price {
      font-size: 26rpx;
      font-weight: 400;
      font-weight: 700;
      line-height: 40rpx;
      color: #969696;
    }
    .item-container .price .span{
      color: #393939;
    }
    .item-container .price .span1{
      font-weight: 100
    }
</style>
<script>
    export default {
        props:{
          product: {
              type: Object,
              default: {}
          },
        },
        data () {
            return {
            }
        },
        methods: {
        }
    }
</script>