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

<style lang='scss' scoped>
@import '../assets/styles/global';
    .product2{
        background-color: #ffffff;
        border-radius: px2rem(7.5); 
        border: 1px solid #FAFAFA;
        box-shadow: 2rpx 2rpx 50rpx #cccccc;
        width: px2rem(182);
        height: px2rem(55);
        margin-bottom: px2rem(5);     
    }
    .product-item {
      display: flex;
    }
    .product-item .img {
      width: 85px;
      height: 85px;
      margin-top: px2rem(6);
      margin-left: px2rem(6);
    }
    .item-container {
      /* flex:617rpx; */
      width: px2rem(105);
      margin-left: px2rem(6);
      margin-top: px2rem(7);
    }
    .item-container .title {
      font-size: px2rem(9);
      font-weight: 400;
      white-space:nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      line-height: px2rem(10);
      color: #020202;
      text-align: left;
    }
    .tab-container {
      display: flex;
      flex-direction: row;
    }
    .sub-item {
      margin: px2rem(5) px2rem(2) px2rem(3) 0;
      height: px2rem(10);
      padding: 0 px2rem(7);
      line-height: px2rem(10);
      font-size: px2rem(6);
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
      font-size: px2rem(9);
      font-weight: 700;
      line-height: px2rem(10);
      color: #020202;
      text-align: left;
    }
    .item-container .price .span{
      font-size: px2rem(8);
      font-weight: 100;
      line-height: px2rem(10);
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