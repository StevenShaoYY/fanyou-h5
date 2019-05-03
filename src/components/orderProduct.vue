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
        width: 346rpx;
        height: 110px;
        margin-bottom: 10px;     
    }
    .product-item {
      display: flex;
    }
    .product-item .img {
      /* width: 100%; */
      height: 85px;
      margin-top: 12px;
      margin-left: 12px;
    }
    .item-container {
      width: 90%;
      text-align: left;
      margin-left: 12px;
      margin-top: 15px;
    }
    .item-container .title {
      padding-right: 10px;
      font-size: 15px;
      width: 70%;
      font-weight: 400;
      white-space:nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      line-height: 20px;
    }
    .tab-container {
      display: flex;
      flex-direction: row;
    }
    .sub-item {
      margin: 10px 5px 7px 0;
      max-width: 50px;
      white-space:nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      height: 18px;
      border: 1px solid #c4c4c4;
      border-radius: 9px;
      padding: 0 5px;
      line-height: 18px;
      font-size: 12px;
      color: #c4c4c4;
      display: block;
    }
    .item-container .price {
      font-size: 13px;
      font-weight: 400;
      font-weight: 700;
      line-height: 20px;
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