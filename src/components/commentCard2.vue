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
<style lang='scss' scoped>
@import '../assets/styles/global';
    .wrapper{
      height: px2rem(122);
      width: px2rem(315);
      margin-left: px2rem(15);
      border-bottom: 1px solid #f5f5f5
    }
    .first-section {
      display: flex;
      flex-direction: row;
      margin-top: px2rem(15);
    }
    .image {
      width: px2rem(45);
      height: px2rem(45);
      margin-right: px2rem(12.5);
    }
    .inner-container {
      display: flex;
      flex-direction: column;
      font-size: px2rem(13);
      font-weight: 400;
    }
    .user-text {
      line-height: px2rem(30);
    }
    .second-section {
      margin-top: px2rem(15);
      font-size: px2rem(13);
    }
    .third-section {
      margin-top: px2rem(15);
      font-size: px2rem(12);
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