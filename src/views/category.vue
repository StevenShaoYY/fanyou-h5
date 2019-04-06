<!--  -->
<template>
  <div class="wrapper">
      <mt-header fixed title="凡有e租"></mt-header>
      <div class="productbox">
        <productl v-for="item of categoryList" :key="item.id" :productItem="item"></productl>
      </div>      
      <div class="comment-container no-comment-container" v-if="categoryList.length==0">
          <div class="no-comment">暂无该类目商品</div>
      </div>
  </div>
</template>

<script>
import {axiosHeaders} from "@/assets/api"
import Product2 from '../components/product2.vue';
export default {
  name: 'category',

  components: {
    'productl': Product2
  },

  data () {
    return {
      categoryList:[]
    }
  },

  computed: {},

  watch: {},

  created () {
    console.log('this.$route.query.id: ', this.$route.query.id)
    if(this.$route.query.type == "category") {
        this.getCategoryList()  
    } else if(this.$route.query.type == "topic"){
        this.getTopicList()
    }
  },

  mounted () {},

  methods: {    
    getCategoryList() {
        let dto = {
            "id": this.$route.query.id
        }
        let commentDto = {
            "pageNum": 1,
            "pageSize": 99,
            "categoryId": this.$route.query.id
        }
        
        this.$axios.post('/mall/api/mallGoods/listByCategory',
          commentDto,
          axiosHeaders
        ).then(res => {
          let result = res.data.result;
          for (let j of result) {
              j.goodsDetailUrl = `/pages/goodsDetail/index?id=${j.id}`
          }
          this.categoryList = result;
          if (this.$route.platform === 'alipay') {
              // my.stopPullDownRefresh()
          } else {
              // wx.stopPullDownRefresh()
          }
        })
    },
    getTopicList() {
        let dto = {
            "id": this.$route.query.id
        }
        let commentDto = {
            "id": this.$route.query.id
        }
        this.$axios.post('/mall/topic/detail',
          commentDto,
          axiosHeaders
        ).then(res => {
          this.POST('topic/detail', commentDto, res => {
            let result = res.data.result;
            for (let j of result.goodsList) {
                j.goodsDetailUrl = `/pages/goodsDetail/index?id=${j.id}`
            }
            this.categoryList = result.goodsList;
            if (this.$route.platform === 'alipay') {
                my.stopPullDownRefresh()
            } else {
                wx.stopPullDownRefresh()
            }
          });
        })
    }
  }
}

</script>
<style scoped lang="scss">
.productbox{
  margin-top: 40px;
}
.wrapper{
    font-family:microsoft yahei;
    font-size: 13px;
    margin-left: 13px;
    width: 346px;
    margin-top: 30px;
    margin-left: auto;
    margin-right: auto;
    line-height: 15px;
}
.comment-container {
    font-family:microsoft yahei;
    width: 692rpx;
    min-height: calc(100vh - 55px);
    border: 1px solid #FAFAFA;
    border-radius: 10px;
    box-shadow: 1px 1px 2px #cccccc;
}
.no-comment-container {
    font-family:microsoft yahei;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    color: #a8a8a8;
}
</style>
