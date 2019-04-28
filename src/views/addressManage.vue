<!-- D:\jz\src\pages\addressManage -->
<template>
    <div class="wrapper">
        <div class="address-container">
            <div class="add-item">
                <div class="add-title">收货人</div>
                <!--<div class="add-content"><input v-model="address.name" class="add-input" type="text" placeholder="请填写收货姓名"></div>-->
                <div class="add-content"><input class="add-input" type="text" placeholder="请填写收货姓名"></div>
            </div>
            <div class="add-item">
                <div class="add-title">联系电话</div>
                <!--<div class="add-content"><input v-model="address.mobile" class="add-input" type="text" placeholder="请填写联系电话"></div>-->
                <div class="add-content"><input  class="add-input" type="text" placeholder="请填写联系电话"></div>
            </div>
            <div class="add-item">
                <div class="add-title">所在地区</div>
                <!--<div class="add-content" @click="selectArea"><input v-model="address.full_region" class="add-input" type="text" placeholder="请选择所在地区"></div>-->
                 <div class="add-content"><input  class="add-input" type="text" placeholder="请选择所在地区"></div>
            </div>
            <div class="add-item add-item2">
                <div class="add-title">详细地址</div>
                 <!--<div class="add-content"><input v-model="address.address"  class="add-input" type="text" placeholder="请填写详细地址"></div>-->
               <div class="add-content"><input  class="add-input" type="text" placeholder="请填写详细地址"></div>
            </div>
        </div>
        <div class="region-select" >
        <!--<div class="region-select" v-if="openSelectRegion">-->
            <div class="hd">
                <div class="region-selected">
                    <!--<div :class="['item', { disabled: selectRegionList[0].id == 0, selected: (regionType-1) == 0 }]"
                    @click="selectRegionType" :data-region-type-index="0">
                    {{selectRegionList[0].name}}</div>-->
                     <div ></div>
                </div>
                <div class="region-selected">
                     <!--<div :class="['item', { disabled: selectRegionList[1].id == 0, selected: (regionType-1) == 1 }]"
                    @click="selectRegionType" :data-region-type-index="1">
                    {{selectRegionList[1].name}}</div>-->
                     <div ></div>
                </div>
                <div class="region-selected">
                   <!--<div :class="['item', { disabled: selectRegionList[2].id == 0, selected: (regionType-1) == 2 }]"
                    @click="selectRegionType" :data-region-type-index="2" >
                    {{selectRegionList[2].name}}</div>-->
                    <div ></div>
                </div>
           <!-- <div :class="selectRegionDone ? 'done' : 'disabled done'" @click="doneSelectRegion">确定</div>-->
             <div class="selectRegionDone" >确定</div>
            </div>
            <div class="bd">
            <div class="region-list">
                <!--<div :class="item.selected ? 'selected item' : 'item'" @click="selectRegion" :data-region-index="index"
                v-for="(item, index) of regionList" :key="item.id">{{item.name}}</div>-->
                   <div ></div>
            </div>
            </div>
        </div>
        
        <!--<div class="bg-mask" @click="cancelSelectRegion" v-if="openSelectRegion"></div>-->
        <div class="bg-mask" ></div>
         <!--<div @click="addAddress" v-if="type=='add'" class="botton-btn">添加</div>-->
         <div  class="botton-btn">添加</div>
         <!--<div @click="updateAddress" v-if="type=='update'" class="botton-btn">修改</div>-->
          <div  class="botton-btn">修改</div>
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

  created () {
  console.log(111)
  },

  mounted () {},

  methods: {}
}

</script>
<style scoped lang="scss">
    .wrapper{
        height: 50px;
        font-family:microsoft yahei;
        background-color: #Ffffff
    }
    .address-container {
        width: 346px;
        margin-left: 14px;
        border: 1px solid #FAFAFA;
        border-radius: 10px;
        margin-top: 10px;
        box-shadow: 1px 1px 7px #cccccc;
    }
    .add-item{
        height: 60px;
        display: flex;
        flex-direction: row;
        margin: 0 15px;
    }
    .add-item2{
        padding-bottom: 40px;
    }
    .add-item + .add-item {
        border-top: 1px solid #EBEBEB
    }
    .add-title{
        font-size: 16px;
        line-height: 60px;
        width:90px;
    }
    .add-content {
        font-size: 13px;
        display: flex;
        align-items: center
    }
    .add-input {
        width: 90%;
        font-size: 13px;
        color: #363636;
        border: none;
    }
    .botton-btn {
        color: #fff;
        background-color: #FF6F00;
        height: 40px;
        border-radius: 20px;
        text-align: center;
        width:346px;
        margin-left: 14px;
        line-height: 40px;
        font-weight: 400;
        font-size: 15px;
        margin-bottom:  15px;
        margin-top:  15px;
    }
    .region-select{
    width: 100%;
    height: 310px;
    background: #fff;
    position: fixed;
    z-index: 10;
    left:0;
    bottom: 0;
    }

    .region-select .hd{
    height: 54px;
    width: 92%;
    border-bottom: 1px solid #f4f4f4;
    padding: 23px  15px 0  15px;
    }

    .region-select .region-selected{
    float: left;
    height: 30px;
    display: flex;
    }

    .region-select .region-selected .item{
    max-width: 70px;
    margin-right:  15px;
    text-align: left;
    line-height: 30px;
    height: 100%;
    color: #333;
    font-size: 14px;
    overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .region-select .region-selected .item.disabled{
    color: #999;
    }

    .region-select .region-selected .item.selected{
    color: #b4282d;
    }

    .region-select .done{
    float: right;
    height: 30px;
    width:30px;
    border: none;
    background: #fff;
    line-height:30px;
    text-align: center;
    color: #333;
    font-size: 14px;
    }

    .region-select .done.disabled{
    color: #999;
    }



    .region-select .bd{
    height: 246px;
    width: 100%;
    padding: 0  15px;
    overflow-y: auto;
    }

    .region-select .region-list{
        height: auto;
        overflow: scroll;
    }

    .region-select .region-list .item{
        width: 100%;
        height: 52px;
        line-height: 52px;
        text-align: left;
        color: #333;
        font-size: 14px;
    }

    .region-select .region-list .item.selected{
        color: #b4282d;
    }


    .bg-mask{
        height: 100%;
        width: 100%;
        background: rgba(0, 0, 0, 0.4);
        position: fixed;
        top:0;
        left:0;
        z-index: 8;
    }
</style>
