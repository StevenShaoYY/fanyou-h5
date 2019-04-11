<!-- D:\jz\src\pages\returnDeviceConfirm -->



<template>
  <div>
    <div class="wrapper">
        <div class="header-container">
            <p class="header-p2">归还须知：</p>
            <p class="header-p2">1.请务必备好纸条，写明：下单手机号、订单号；</p>
            <p class="header-p2">2.将纸条附在需要归还的设备上；</p>
            <p class="header-p2">3.须将收到的货品，包含所有附赠配件一并归还；</p>
        </div>
        <div class="rent-container">
            <div class="warn-text">*请按照以下地址发货（拒收到付件）</div>
            <div class="rent1">
                <div class="sub">收件人：</div>
                <div><!--{{receiveName}}--></div>
            </div>
            <div class="rent1">
                <div class="sub">邮政编码：</div>
                <div><!--{{postCode}}--></div>
            </div>
            <div class="rent1">
                <div class="sub">手机号码：</div>
                <div><!--{{mobile}}--></div>
            </div>
            <div class="rent1">
                <div class="sub">收货地址：</div>
                <div><!--{{address}}--></div>
            </div>
        </div>
        <div class="rent-container">
            <div class="rent2">
                <div class="sub">物流公司</div>
                <div><input class="sub-input" type="text"  placeholder="请填写物流公司"></div>
            </div>
            <div class="rent2">
                <div class="sub">运单编号</div>
                <div><input class="sub-input" type="text" placeholder="请填写运单编号"></div>
            </div>
        </div>
        <div class="text-container">
            <p>建议顺丰保价，降低运输风险</p> 
        </div>
        <div class="startOrder">
            确认归还
        </div>
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
  .wrapper{
        background-color: #ffffff;
        font-family:microsoft yahei;
        height: 50px;
        text-align: left;
    }
    .header-container{
        width: 375px;
        height: 150px;
        background: linear-gradient(to bottom right, #f24f18 , #ffc561);
        color: #fff;
        line-height: 30px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        font-size: 13px;
        padding-left: 15px;
    }
    .rent-container {
        width: 346px;
        margin-left: 14px;
        font-size: 13px;
        padding: 10px 0;
        border: 1px solid #FAFAFA;
        border-radius: 10px;
        margin-top: 10px;
        box-shadow: 1px 1px 7px #cccccc;
    }
    .rent-container .warn-text{
        color:#39bbff;
        line-height: 30px;
        font-size:13px;
        margin-left: 15px;
    }
    .rent-container .rent1{
        height: 25px;
        line-height: 25px;
        padding: 0 15px;
        font-size:13px;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
    }
    .rent-container .rent2{
        height:30px;
        line-height: 30px;
        padding: 0 15px;
        font-size: 15px;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
    }
    .rent-container .rent2 .sub {
        color: #797979;
        font-size: 13px;
    }
    .rent-container .rent2 .sub-input {
        font-size: 13px;
        padding: 0 20px;
        border:none;
        color:#aaa;
        height: 30px;
        line-height: 30px;
        margin: 0;
    }
    .rent-container .rent1 .sub {
        color: #969696;
        font-size:15px;
    }
    .text-container {
        font-size: 13px;
        margin: 15px;
        color: #FF6F00;
    }
    .startOrder{
        color: #fff;
        background-color: #FF6F00;
        height: 40px;
        border-radius: 20px;
        text-align: center;
        width: 346px;
        margin-left: 14px;
        line-height:40px;
        font-weight: 400;
        font-size: 15px;
        position: absolute;
        bottom: 15px;
    }

</style>
