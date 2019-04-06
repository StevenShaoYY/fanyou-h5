<template>
  <div class="product2">
    <a class="product-item" :href="productItem.goodsDetailUrl">
      <img class="img" :src="productItem.picUrl" background-size="cover" />
      <div class="item-container">
        <div class="title">{{productItem.name}}</div>
        <div class="tab-container">
          <div class="sub-item" :class="colorList[index]" v-for="(item, index) of productItem.tagList" :key="index">{{item}}</div>
        </div>
        <div class="price">¥{{productItem.rentPrice.toFixed(2)}}<span class="span">/{{productItem.periodUnit}}</span></div>
      </div>
    </a>
  </div>
</template>

<style scoped>
    .product2{
        background-color: #ffffff;
        border-radius: 15rpx; 
        border: 1px solid #FAFAFA;
        box-shadow: 2rpx 2rpx 50rpx #cccccc;
        width: 346px;
        height: 110px;
        margin-bottom: 10px;     
    }
    .product-item {
      display: flex;
    }
    .product-item .img {
      width: 85px;
      height: 85px;
      margin-top: 12px;
      margin-left: 12px;
    }
    .item-container {
      /* flex:617rpx; */
      width: 209px;
      margin-left: 12px;
      margin-top: 15px;
    }
    .item-container .title {
      font-size: 18px;
      font-weight: 400;
      white-space:nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      line-height: 20px;
      color: #020202;
      text-align: left;
    }
    .tab-container {
      display: flex;
      flex-direction: row;
    }
    .sub-item {
      margin: 10px 5px 7px 0;
      height: 20px;
      padding: 0 7px;
      line-height: 20px;
      font-size: 12px;
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
      font-size: 18px;
      font-weight: 700;
      line-height: 20px;
      color: #020202;
      text-align: left;
    }
    .item-container .price .span{
      font-size: 16px;
      font-weight: 100;
      line-height: 20px;
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