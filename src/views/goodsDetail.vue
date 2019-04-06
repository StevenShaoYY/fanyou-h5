<!--  -->
<template>
  <div>goodsDetail</div>
</template>

<script>
import {axiosHeaders} from "@/assets/api"
export default {
  name: '',

  components: {},

  data () {
    return {
        goodsDetail: {
            financeSpecificationList:[{}],
            finaceList: [{}]
        },
        commentList: [],
        tabList: ['图文详情', '租赁说明', '商品评论'],
        activeItem: 0,
        winHeight: '',
        openAttr:true,
        selectGoods: {
            rentPrice: '',
            goodsPrice: ''
        },
        fenqiSelectFlag: false,
        allResultArr: [],
        hasRentSelected: false,
        finace: '',
        showLogin: false,
        hasScrollB:false,
        hasScrollT:false,
        canScroll: true,
        divStyle: '',
        coloctIcon: "/static/images/icon_collect_normal.png"
    }
  },

  computed: {},

  watch: {},

  created () {
    console.log('this.$route.query.id: ', this.$route.query.id)
    console.log('this.$route.query.type: ', this.$route.query.type)
    
    /*
    * demo 使用假数据
    */
    this.getDetail()
  },

  mounted () {},

  methods: {
    getDetail() {      
      let dto = {
          "id": this.$route.query.id
      }
      let commentDto = {
          "pageNum": 1,
          "pageSize": 100,
          "type": 0,
          "valueId": this.$route.query.id
      }
      this.$axios.post('/mall/api/mallGoods/detail',
          dto,
          axiosHeaders
        ).then(res => {
          console.log('res: ', res)
        })
    }
  }
}

</script>
<style lang='scss' scoped>
</style>
