<template>
  <div>
    <mt-header fixed :title="title">
        <mt-button class="back-btn" slot="left" @click="goBack" icon="back">返回</mt-button>
    </mt-header>
  </div>
</template>
<style lang='scss' scoped>
@import '../assets/styles/global';
.back-btn{
    color:#2c3e50;
    font-size: 16px;
}
    
</style>
<script>
import Star from './star.vue';
    export default {
        props:{
          title: {
              type: String,
              default:'凡有e租'
          },
          backUrl:{
            type: String,
            default:'none'
          }
        },
        components: {
          'star': Star
        },
        data () {
            return {
            }
        },
        methods: {
            goBack () {
              if(this.backUrl == 'none') {
                this.$router.go(-1)
              } else {
                this.$router.push(this.backUrl)
              }
            }
        }
    }
</script>