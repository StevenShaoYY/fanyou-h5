<!--  -->
<template>
  <div class="bottom-tab">
    <span class="tab-item" v-for="(item, i) in tabBarImgArr" :key="i" @click="switchTo(item.url)">
      <img :src="$route.path.includes(item.url)?item.selected:item.normal" alt="">
      <span :class="{on: $route.path.includes(item.url)}">{{item.name}}</span>
    </span>
  </div>
</template>

<script>
export default {
  name: '',

  components: {},

  data () {
    return {
      tabBarImgArr: [
        {normal: require('../assets/images/tab_home_normal.png'), selected: require('../assets/images/tab_home_current.png'), name: '首页' , url: '/index'},
        // {normal: require('../assets/images/icon_intro.png'), selected: require('../assets/images/icon_intro_selected.png'), name: '推荐', url: '/intro'},
        // {normal: require('../assets/images/icon_search.png'), selected: require('../assets/images/icon_search_selected.png'), name: '搜索', url: '/search'},
        // {normal: require('../assets/images/icon_chat.png'), selected: require('../assets/images/icon_chat_selected.png'), name: '聊天', url: '/chat'},
        {normal: require('../assets/images/tab_mine_normal.png'), selected: require('../assets/images/tab_mine_current.png'), name: '我的', url: '/mine'}
      ]
    };
  },

  computed: {},

  watch: {},

  created () {},

  mounted () {},

  methods: {}
}

</script>
<style scoped lang="scss">
  .bottom-tab{
    width: 100%;
    height: 50px;
    background-color: #fff;
    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
    z-index: 999;
    .tab-item{
      display: flex;
      flex: 1;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      color: #666;
      img{
        width: 12%;
        margin-bottom: 2px;
      }
      .on{
        color: red;
      }
    }
  }
</style>
