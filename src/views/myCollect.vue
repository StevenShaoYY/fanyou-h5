<!-- D:\jz\src\pages\mycollect -->
<template>
    <div class="wrapper">
        <header-bar></header-bar>
        <productl v-for="item of categoryList" :key="item.id" :productItem="item"></productl>
        <div class="comment-container no-comment-container" v-if="categoryList.length==0">
            <div class="no-comment">暂无收藏</div>
        </div>
    </div>
</template>

<script>
import Product2 from '../components/product2.vue';
import {axiosHeaders} from "@/assets/api";
import HeaderBar from '../components/headerBar.vue';
import axios from 'axios'
export default {
  name: '',

  components: {
      'productl': Product2,
      HeaderBar
  },
  data () {
      return {
          categoryList:[]
      }
  },
  created () {
      this.getCollectList()
  },

  computed: {},

  watch: {},

  created () {
    this.getCollectList()
  },

  mounted () {},

  methods: {
    getCollectList() {
        let commentDto = {
            "pageNum": 1,
            "pageSize":100,
            "type": 0
        }
        this.$axios.post('/mall/api/mallCollect/list',
          commentDto,
          axiosHeaders
        ).then(res => {
            let result = res.data.result;
            let re = []
            for (let j of result) {
                j.goodsSimpleRespDTO.goodsDetailUrl = `/pages/goodsDetail/index?id=${j.id}`
                re.push(j.goodsSimpleRespDTO)
            }
            this.categoryList = re;
        })
    }
  }
}

</script>
<style lang='scss' scoped>
@import '../assets/styles/global';
.wrapper{
    background-color: #ffffff;
    font-family:microsoft yahei;
    font-size: px2rem(13);
    margin-left: px2rem(13);
    width: 94vw;
    margin-top: px2rem(15);
    margin-left: 3vw;
    line-height: px2rem(15);
    padding-top: 40px;
}
.no-comment-container {
    min-height: calc(100vh - 60px);
    border: 1px solid #FAFAFA;
    border-radius: px2rem(10);
    box-shadow: 2rpx 2rpx 50rpx #cccccc;
    font-family:microsoft yahei;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    color: #a8a8a8;
}
</style>
