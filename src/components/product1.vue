<template>
  <div class="wrapper">
    <a class="product-item" :href="productItem.goodsDetailUrl">
      <img class="img" :src="productItem.picUrl" background-size="cover" />
      <div class="title">{{productItem.name}}</div>
      <div class="price">¥{{productItem.rentPrice.toFixed(2)}}/{{productItem.periodUnit}}起</div>
    </a>
  </div>
</template>
<style lang='scss' scoped>
@import '../assets/styles/global';
    .iconfont {
        font-family:iconfont;
        font-family:microsoft yahei;
    }
    .wrapper{
        background-color: #F9F9F9;
        border-radius: px2rem(7);
        width: px2rem(140);
        height: px2rem(180);
        margin-top: px2rem(10);     
    }
    .product-item {
      width: px2rem(140);
      height: px2rem(180);
      text-decoration: none;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center; 
    }
    .img {
      width: px2rem(90);
      height: px2rem(102);
    }
    .title {
      font-size: px2rem(14);
      font-weight: 400;
      /* padding: 0 20rpx; */
      color: #A9A9A9;
      width: px2rem(145);;
      margin-left: px2rem(10);
      text-align: center;
      white-space:nowrap;
      text-overflow: ellipsis;
      overflow:hidden;
      margin-top: px2rem(5);
      line-height: px2rem(15);
    }
    .price {
      line-height: px2rem(16);
      font-size:  px2rem(16);
      margin-top: px2rem(5);
      font-weight: 400;      
      color: #2c3e50;
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