<!--  -->
<template>
  <div class="about_us">
    <div class="headSculpture"></div>
    <div class="contain">
      本平台是...
    </div>
  </div>
</template>

<script>
export default {
  name: '',

  components: {},

  data () {
    return {
    }
  },

  computed: {},

  watch: {},

  created () {},

  mounted () {},

  methods: {}
}

</script>
<style lang='scss' scoped>
@import '../assets/styles/global';
.about_us{
  .headSculpture{
    width: px2rem(100);
    height: px2rem(100);
    margin: px2rem(100) auto px2rem(30) auto;
    border-radius: px2rem(10);
    border: 1px #999 solid;
  }
  .contain{
    min-height: 100px;
    width: 90%;
    margin-left: auto;
    margin-right: auto;
    border-radius: 7px;
    background-color: #ffffff;
    border: 1px solid #FAFAFA;
    -webkit-box-shadow: 1px 1px 25px #cccccc;
    box-shadow: 1px 1px 25px #cccccc;
    margin-top: 10px;
    margin-bottom: 10px;
    text-align: left;
    line-height: 24px;
    padding: 10px;
    box-sizing: border-box;
    font-size: 14px;
  }
}
</style>
