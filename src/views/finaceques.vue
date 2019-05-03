<!--  -->
<template>
    <div class="wrapper">
        <header-bar></header-bar>
    <p>保障服务指：</p>
    <p>1.租赁期间租赁物发生非人为原因（经甲方鉴定）造成的意外损坏，符合保障服务理赔范围的，由甲方提供一次性理赔的保障服务。</p>
    <p>2.本条款仅适用于乙方通过本协议租赁的在租期内的租赁设备。</p>
    <p>3.保障服务费及支付方式</p>
    <p>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp根据租赁物型号及配置，乙方需向甲方购买意外保障服务费，在乙方签署租赁协议的同时一次性或分期支付。退租时无论意外保障服务是否启动，该意外保障服务费均不予退还。</p>
    <p>4.保障服务理赔范围及实施</p>
    <p>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp租期内，租赁物经甲方工程师检测确认后属于非人为原因造成的产品意外损坏且该损坏属于意外保障服务范围内的，可申请启动意外保障服务（服务专线：0571-86507022）。由甲方负责维修，更换及维修的部件将会使用相同或类似规格的或同等级的部件。维修完成后将甲方将租赁物送还给乙方。甲乙双方约定该保障服务在租赁期间仅享受一次免费修理，修理完成即视为本次意外保障服务结束。 注：若启动意外保障服务时，实际缴纳租金不足3个月的，乙方需要提前补足三个月租金后方可享受该服务，提前补足支付的租金日后可抵扣后续产生的相应租金；实际缴纳租金超出3个月则无需提前缴纳租金。</p>
    <p>5.租赁物产品质量问题保修条例</p>
    <p>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp租赁期间，全新租赁物有产品质量问题，按照厂商规定的条例进行保修；非全新租赁物有产品质量问题，甲方负责租赁物的保修。</p>
    <p>6.保障服务范围</p>
    <p>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp租赁物因非人为意外造成的显示屏碎屏或功能性故障。(租赁物需正常开机，正常显示)</p>
    <p>7.不属于本协议意外保保修范围</p>
    <p>&nbsp&nbsp&nbsp&nbsp&nbsp&nbspHome键；租赁物受潮、浸液；租赁物显示屏内屏，外壳及外壳玻璃；日常使用造成的外观磨损或损坏；已私修过租赁物等或其他人为损坏的等。</p>
    </div>
</template>

<script>
import HeaderBar from '../components/headerBar.vue';
export default {
  name: '',

  components: {
    HeaderBar
  },

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
.wrapper{
    font-size: 18px;
    text-align: left;
    margin-left: 3vw;
    width: 94vw;
    margin-top: 50px;
    line-height: 30px;
}
</style>
