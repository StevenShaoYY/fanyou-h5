<template>
  <div class="wrapper">
    <div class="mainTit">
      <div class="titBox">
        <div class="firstTit">{{topic.title}}</div>
        <div class="subTit">{{topic.subtitle}}</div>
      </div>
      <a class="more" :href="topic.topicMore">更多<span class="go">»</span></a>
    </div>
    <a :href="topic.topicMore"><img class="img" :src="topic.picUrl" background-size="cover" /></a>
    <section class="hotPro">
      <div class="mainTit">
        <div class="titBox">
          <div class="firstTit"><img class="firstTitIcon" src="../assets/images/icon_hot_pro.png"/>热门商品</div>
        </div>
      </div>
      <div class="hot-proc-list">
        <product v-for="item of topic.goodsList" :key="item.id" :productItem="item"></product>
      </div>
    </section>
  </div>
</template>
<style lang='scss' scoped>
@import '../assets/styles/global';
.mainTit{
  display: flex;
  justify-content: space-between;
  .titBox{
    width: px2rem(100);
    flex-direction: column;
    .firstTit{
      font-size: px2rem(16);
      height: px2rem(24);
      line-height: px2rem(24);
      font-weight: 700;
      color: #2c3e50;
      display: flex;
      align-items: center;
      .firstTitIcon{
        width: px2rem(18);
        height: px2rem(18);
        padding-right: px2rem(8);
      }
    }
    .subTit{
      font-size: px2rem(12);
      text-align: left;
      height: px2rem(24);
      line-height: px2rem(24);
      color: #A9A9A9
    }
  }
  .more{
    font-size: px2rem(12);
    font-weight: 100;
    position: absolute;
    right: px2rem(17);
    text-decoration: none;
    top: 0;
    color: #A9A9A9;
    line-height: px2rem(25);
  }
}
    .iconfont {
        font-family:iconfont;
    }
    .wrapper{
        background-color: #fff;
        margin: px2rem(15) px2rem(15);
        position: relative;
    }
    .title {
      font-size: px2rem(15);
      font-weight: 700;
      line-height: px2rem(25);
    }
    .title .more{
      font-size: px2rem(12);
      font-weight: 100;
      position: absolute;
      right: px2rem(17);
      top: 0;
      color: #A9A9A9;
      line-height: px2rem(25);
    }
    .title .more .go{
      position: absolute;
      line-height: px2rem(25);
      font-size: px2rem(24);
      top: -px2rem(2);
    }
    .subtitle {
      font-size: px2rem(12);
      font-weight: 100;
      color: #A9A9A9;
    }
    .img {
      width:px2rem(345);
      height:px2rem(120);
      margin-top: px2rem(10);
      border-radius: px2rem(7);
    }
    .hotPro {
      margin-top: px2rem(10);
    }
    .hot-icon {
      width:2px2rem(12);
      height:px2rem(15);
      display: inline-block;
      position: absolute;
      top:px2rem(10);
      left: 0;
    }
    .hot-proc-title {
      font-size: px2rem(15);
      font-weight: 700;
      line-height: px2rem(35);
      position: relative;
      padding-left: px2rem(17);
    }
    .hot-proc-list {
      display: flex;
      flex-wrap: wrap;
      margin-top: -px2rem(5);
      justify-content: space-between;
      align-content:space-between ;
    }
</style>
<script>
    import Product1 from './product1.vue';
    export default {
        components: {
            'product': Product1
        },
        props:{
          topic: {
              type: Object,
              default: {
                goodsList: []
              }
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