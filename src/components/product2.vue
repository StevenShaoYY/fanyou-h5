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
        border-radius: 15px; 
        border: 1px solid #FAFAFA;
        box-shadow: 2px 2px 50px #cccccc;
        width: 94vw;
        height: 120px;
        margin-bottom: px2rem(10);     
    }
    .product-item {
      display: flex;
      height: 110px;
      align-items: center;
    }
    .product-item .img {
      width: px2rem(85);
      height: px2rem(85);
      margin-top: px2rem(6);
      margin-left: px2rem(6);
    }
    .item-container {
      /* flex:617rpx; */
      width: px2rem(210);
      margin-left: px2rem(12);
      margin-top: px2rem(14);
    }
    .item-container .title {
      font-size: px2rem(18);
      font-weight: 400;
      white-space:nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      line-height: px2rem(20);
      color: #020202;
      text-align: left;
    }
    .tab-container {
      display: flex;
      flex-direction: row;
    }
    .sub-item {
      margin: px2rem(10) px2rem(4) px2rem(6) 0;
      height: px2rem(20);
      padding: 0 px2rem(14);
      line-height: px2rem(20);
      font-size: px2rem(12);
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
      font-size: px2rem(19);
      font-weight: 700;
      line-height: px2rem(20);
      color: #020202;
      text-align: left;
    }
    .item-container .price .span{
      font-size: px2rem(16);
      font-weight: 100;
      line-height: px2rem(20);
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