<!-- D:\jz\src\pages\mycomment -->
<template>
  <div class="wrapper">
        <header-bar></header-bar>
        <div class="comment-container has-comment" v-if="commentList.length>0">
            <comment-card2 v-for="(item, index) of commentList" :key="index" :commentItem="item"></comment-card2>
        </div>
        <div class="comment-container no-comment-container" v-if="commentList.length==0">
            <div class="no-comment">暂无评论</div>
        </div>
    </div>
</template>

<script>
import CommentCard2 from '../components/commentCard2.vue';
import {axiosHeaders} from "@/assets/api"
import HeaderBar from '../components/headerBar.vue';
import axios from 'axios'
export default {
  name: '',

 components: {
      'comment-card2': CommentCard2,
      HeaderBar
  },
  data () {
      return {
          commentList:[]
      }
  },
  created () {
    this.getCommentList()
  },

  mounted () {},

  methods: {
    getCommentList() {
        let commentDto = {
            "pageNum": 1,
            "pageSize":100
        }
        this.$axios.post('/mall/comment/userList',
          commentDto,
          axiosHeaders
        ).then(res => {
            let result = res.data.result;
            this.commentList = result.list;
        })
    }
  }
}

</script>
<style lang='scss' scoped>
@import '../assets/styles/global';
.comment-container {
        font-family:microsoft yahei;
        width: px2rem(346);
        min-height: calc(100vh - 60px);
        margin-left: px2rem(15);
        border: 1px solid #FAFAFA;
        border-radius: px2rem(10);
        margin-top: px2rem(15);
        box-shadow: 2px 2px 50px #cccccc;
        margin-top: 50px;
    }
    .no-comment-container {
        font-family:microsoft yahei;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        color: #a8a8a8;
        font-size: 18px;
    }
</style>
