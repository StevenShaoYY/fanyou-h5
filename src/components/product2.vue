<template>
  <div class="wrapper">
    <navigator class="product-item" :url="productItem.goodsDetailUrl">
      <img class="img" :src="productItem.picUrl" background-size="cover" />
      <div class="item-container">
        <div class="title">{{productItem.name}}</div>
        <div class="tab-container">
          <div class="sub-item" :class="colorList[index]" v-for="(item, index) of productItem.tagList" :key="index">{{item}}</div>
        </div>
        <div class="price">¥{{productItem.rentPrice.toFixed(2)}}<span class="span">/{{productItem.periodUnit}}</span></div>
      </div>
    </navigator>
  </div>
</template>
<style scoped>
    .wrapper{
        background-color: #ffffff;
        border-radius: 15rpx; 
        border: 1px solid #FAFAFA;
        box-shadow: 2rpx 2rpx 50rpx #cccccc;
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
      /* flex:617rpx; */
      width: 417rpx;
      margin-left: 25rpx;
      margin-top: 30rpx;
    }
    .item-container .title {
      font-size: 36rpx;
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
      height: 40rpx;
      padding: 0 15rpx;
      line-height: 40rpx;
      font-size: 25rpx;
      color: #ffffff;
      display: block;
    }
    .red{
      background-color: #ff7000
    }
    .blue {
      background-color: #999999
    }
    .yellow{
      background-color: yellow
    }
    .blank {
      background-color: #000000
    }
    .item-container .price {
      font-size: 36rpx;
      font-weight: 700;
      line-height: 40rpx;
    }
    .item-container .price .span{
      font-size: 32rpx;
      font-weight: 100;
      line-height: 40rpx;
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
              colorList: [
                'red',
                'blue',
                'yellow',
                'blank'
              ]
            }
        },
        methods: {
        }
    }
</script>