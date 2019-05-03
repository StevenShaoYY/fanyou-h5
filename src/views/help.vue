<!-- D:\jz\src\pages\helper\index.vue -->
<template>
  <div class="help">
    <header-bar></header-bar>
    <div class="comment-container no-comment-container" v-if="faqList.length==0">
        <div class="no-comment">暂无帮助</div>
    </div>
    <ul class="trans-faq">
        <li class="trans-faq-li" :style="{height:item.height}" :class="{'content-show':wtIndex===index}" v-for="(item, index) of faqList" :key="index" :data-index="index"  @click="showDetail(index)">
            <h2 class="trans-faq-h2">{{item.question}}</h2>
            <div class="faqUl" >
                <div class="trans-faq-text">
                    {{item.answer}}
                </div>
            </div>
        </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
import {axiosHeaders} from "@/assets/api"
import HeaderBar from '../components/headerBar.vue';
export default {
  name: '',

  components: {
    HeaderBar
  },

  data () {
    return {
      faqList: [],
      wtIndex: ''
    }
  },

  computed: {},

  watch: {},

  created () {
    this.$axios.post('/mall/issue/list',
      {},
      axiosHeaders
    ).then(res => {
      let result = res.data.result;
      for (let i of result) {
          i.height = '90rpx';
          i.show = false
      }
      this.faqList = result
    })
  },

  mounted () {},

  methods: {
    showDetail (index) {
      console.log('index: ', index)  
      this.wtIndex = index;     
    }
  }
}

</script>
<style lang='scss' scoped>
.content-show{
  height: 240px;
}
.help{
    font-family:microsoft yahei;
    background-color: #fff;
    min-height: 100%;
    margin-top: 50px;
}
.comment-container {
    font-family:microsoft yahei;
    width: 346px;
    margin-left: 14px;
    min-height: calc(100vh - 30px);
    border: 1px solid #FAFAFA;
    border-radius: 10px;
    box-shadow: 1px 1px 5rpx #cccccc;
}
.no-comment-container {
    font-family:microsoft yahei;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    color: #a8a8a8;
}
.trans-faq{
    width: 90%;
    margin: 15px auto;
}

.trans-faq .trans-faq-li {
    width: 100%;
    /* height: 45px; */
    overflow: hidden;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 2px 2px 10px #cccccc;
    transition: all .3s ease;
    text-align: left;
}

.trans-faq .trans-faq-li + .trans-faq-li{
    margin-top: 10px;
}

.trans-faq .trans-faq-li .trans-faq-h2{
    width: 100%;
    height: 45px;
    overflow: hidden;
    line-height: 45px;
    font-size: 13px;
    padding-left: 13px;
    color:#444444;
}
.trans-faq .trans-faq-li .faqUl{
    width: 92%;
    line-height: 20px;
    font-size: 12px;
    padding: 0 0 13px 4%;
    margin: 4px 0 0 0;
    display: none;
    color:#555555;
}
.trans-faq-li.content-show .faqUl{
    display: block;
}
.faqUl .trans-faq-text{
    width: 100%;
}
</style>
