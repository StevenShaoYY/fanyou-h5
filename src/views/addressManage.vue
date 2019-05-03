<!-- D:\jz\src\pages\addressManage -->
<template>
    <div class="wrapper">
        <header-bar></header-bar>
        <div class="address-container">
            <div class="add-item">
                <div class="add-title">收货人</div>
                <div class="add-content"><input v-model="address.name" class="add-input" type="text" placeholder="请填写收货姓名"></div>
            </div>
            <div class="add-item">
                <div class="add-title">联系电话</div>
                <div class="add-content"><input v-model="address.mobile" class="add-input" type="text" placeholder="请填写联系电话"></div>
            </div>
            <div class="add-item">
                <div class="add-title">所在地区</div>
                <div class="add-content" @click="selectArea"><input v-model="address.full_region" class="add-input" type="text" placeholder="请选择所在地区"></div>
            </div>
            <div class="add-item add-item2">
                <div class="add-title">详细地址</div>
                <div class="add-content"><input v-model="address.address"  class="add-input" type="text" placeholder="请填写详细地址"></div>
            </div>
        </div>
        <div class="region-select" v-if="openSelectRegion">
            <div class="hd">
                <div class="region-selected">
                    <div :class="['item', { disabled: selectRegionList[0].id == 0, selected: (regionType-1) == 0 }]"
                    @click="selectRegionType" :data-region-type-index="0">
                    {{selectRegionList[0].name}}</div>
                </div>
                <div class="region-selected">
                    <div :class="['item', { disabled: selectRegionList[1].id == 0, selected: (regionType-1) == 1 }]"
                    @click="selectRegionType" :data-region-type-index="1">
                    {{selectRegionList[1].name}}</div>
                </div>
                <div class="region-selected">
                    <div :class="['item', { disabled: selectRegionList[2].id == 0, selected: (regionType-1) == 2 }]"
                    @click="selectRegionType" :data-region-type-index="2" >
                    {{selectRegionList[2].name}}</div>
                </div>
            <div :class="selectRegionDone ? 'done' : 'disabled done'" @click="doneSelectRegion">确定</div>
            </div>
            <div class="bd">
            <div class="region-list">
                <div :class="item.selected ? 'selected item' : 'item'" @click="selectRegion" :data-region-index="index"
                v-for="(item, index) of regionList" :key="item.id">{{item.name}}</div>
            </div>
            </div>
        </div>
        <div class="bg-mask" @click="cancelSelectRegion" v-if="openSelectRegion"></div>
        <div @click="addAddress" v-if="type=='add'" class="botton-btn">添加</div>
        <div @click="updateAddress" v-if="type=='update'" class="botton-btn">修改</div>
    </div>
</template>

<script>

import {axiosHeaders} from "@/assets/api"
import HeaderBar from '../components/headerBar.vue';
export default {
  name: '',

  components: {
    HeaderBar
  },

  data () {
    return {
        address:{
            id: 0,
            address:'',
            areaId:'',
            areaName:'',
            cityId:'',
            cityName:'',
            isDefault:true,
            mobile:'',
            name:'',
            provinceId:'',
            provinceName:''
        },
        type: 'add',
        areaList:{},
        openSelectRegion: false,
        selectRegionList: [
            { id: 0, name: '省份', pid: 1, type: 1 },
            { id: 0, name: '城市', pid: 1, type: 2 },
            { id: 0, name: '区县', pid: 1, type: 3 }
        ],
        regionType: 1,
        regionList: [],
        selectRegionDone: false,
        regionListAll: []
    }
  },

  computed: {},

  watch: {},

  created () {
    console.log(this.$route.query.from)
    this.getAddressList()
    this.getRegionList(0)
  },

  mounted () {},

  methods: {
    addAddress() {
        if(this.address.name == '') {
            this.toast('请填写收货人姓名！')
            return
        }
        if(this.address.mobile == '') {
            this.toast('请填写联系电话！')
            return
        }
        if(this.address.provinceId == '') {
            this.toast('请选择所在地区！')
            return
        }
        if(this.address.address == '') {
            this.toast('请填写详细地址！')
            return
        }
        if(!this.ValidatePhone(this.address.mobile)) {
            this.toast('请填写正确的联系电话！')
            return
        }
        this.$axios.post('/user/userAddress/add',
          this.address,
          axiosHeaders
        ).then(res=>{
            let result = res.data.result;
            this.toast('编辑成功！')
            if(this.$route.query.from && this.$route.query.from == 'order') {
                let commentDto = {
                    "pageNum": 1,
                    "pageSize":10
                }
                this.$axios.post('/user/userAddress/list',
                    commentDto,
                    axiosHeaders
                ).then(res => {
                    let result = res.data.result;
                    result.list[0].full_region = result.list[0].provinceName+ ' '+result.list[0].cityName+' '+result.list[0].areaName
                    this.address = result.list[0];
                    this.$router.go(-1)
                })
            }
    //     if(this.$mp.query.from && this.$mp.query.from=='order') {
    //         let commentDto = {
    //             "pageNum": 1,
    //             "pageSize":10
    //         }
    //         this.POST('userAddress/list', commentDto, res => {
    //             let result = res.data.result;
    //             result.list[0].full_region = result.list[0].provinceName+ ' '+result.list[0].cityName+' '+result.list[0].areaName
    //             this.address = result.list[0];
    //             let stack = getCurrentPages()
    //             let pre = stack[stack.length-2]
    //             if(this.$mp.platform === 'alipay') {
    //                 my.navigateBack({
    //                     delta: 1,
    //                     success: () => {
    //                         pre.rootVM.address = this.address
    //                     }
    //                 })
    //             } else {
    //                 wx.navigateBack({
    //                     delta: 1,
    //                     success: () => {
    //                         pre.rootVM.address = this.address
    //                     }
    //                 })
    //             }
        })
    },
    updateAddress() {
        if(this.address.name == '') {
            this.toast('请填写收货人姓名！')
            return
        }
        if(this.address.mobile == '') {
            this.toast('请填写联系电话！')
            return
        }
        if(this.address.address == '') {
            this.toast('请填写详细地址！')
            return
        }
        if(!this.ValidatePhone(this.address.mobile)) {
            this.toast('请填写正确的联系电话！')
            return 
        }
        this.$axios.post('/user/userAddress/edit',
          this.address,
          axiosHeaders
        ).then(res=>{
            let result = res.data.result;
            if(result === '编辑成功') {
                this.toast('编辑成功！')
                if(this.$route.query.from && this.$route.query.from == 'order') {
                    this.$router.go(-1)
                    // let stack = getCurrentPages()
                    // let pre = stack[stack.length-2]
                    // if(this.$mp.platform === 'alipay') {
                    //     my.navigateBack({
                    //         delta: 1,
                    //         success: () => {
                    //             pre.rootVM.address = this.address
                    //         }
                    //     })
                    // } else {
                    //     wx.navigateBack({
                    //         delta: 1,
                    //         success: () => {
                    //             pre.rootVM.address = this.address
                    //         }
                    //     })
                    // }
                }        
            }
        })
    },
    getAddressList() {
        let commentDto = {
            "pageNum": 1,
            "pageSize":10
        }
        this.$axios.post('/user/userAddress/list',
          commentDto,
          axiosHeaders
        ).then(res=>{
            let result = res.data.result;
            if (result.list.length>=1) {
                this.type = 'update'
                result.list[0].full_region = result.list[0].provinceName+ ' '+result.list[0].cityName+' '+result.list[0].areaName
                this.address = result.list[0];
            }
        })
    },
    ValidatePhone(val){
        var isPhone = /^([0-9]{3,4}-)?[0-9]{7,8}$/;//手机号码
        var isMob= /^0?1[2|3|4|5|6|7|8|9][0-9]\d{8}$/;// 座机格式
        console.log(val)
        console.log(isMob.test(val))
        console.log(isPhone.test(val))
        if(isMob.test(val)||isPhone.test(val)){
            return true;
        }
        else{
            return false;
        }
    },
    selectArea() {
        this.openSelectRegion = true;
                // if(this.$mp.platform == 'alipay') {
                //     my.hideKeyboard();
                // } else {
                //     wx.hideKeyboard();}
                // },
    },
    getRegionList (regionId) {
        let regionType = this.regionType;
        this.$axios.post('/mall/api/region/treeData',
          { rootId: regionId },
          axiosHeaders
        ).then(res => {
            let result = res.data.result;
            this.regionListAll = result.sublist.map(item => {
                if (regionType === item.type && this.selectRegionList[regionType - 1].id === item.id) {
                    item.selected = true;
                } else {
                    item.selected = false;
                }
                return item;
            })
            this.regionList = this.regionListAll
        })
        // });
    },
    filterFromReginList (id) {
        let all = this.regionListAll
        if (id == 0) {
            this.regionList = all
            return 
        }
        for (let i of all) {
            if(i.id == id) {
                this.regionList = i.sublist
                break
            }
            let sub = i.sublist
            for (let j of sub) {
                if(j.id == id) {
                    if(j.sublist){
                        this.regionList = j.sublist
                    }
                    break
                }
            }
        }
    },
    // 计算3级地市是否都已选好
    setRegionDoneStatus () {
        let doneStatus = this.selectRegionList.every(item => {
            return item.id !== 0;
        });
        this.selectRegionDone = doneStatus;
        },
        // 展开地市选择浮窗
        chooseRegion () {
            this.openSelectRegion = !this.openSelectRegion;
        // 设置区域选择数据
        let address = this.address;
        if (address.provinceId > 0 && address.cityId > 0 && address.areaId > 0) {
            let selectRegionList = this.selectRegionList;
            selectRegionList[0].id = address.provinceId;
            selectRegionList[0].name = address.province_name;
            selectRegionList[0].pid = 1;
            selectRegionList[1].id = address.cityId;
            selectRegionList[1].name = address.city_name;
            selectRegionList[1].pid = address.provinceId;
            selectRegionList[2].id = address.areaId;
            selectRegionList[2].name = address.district_name;
            selectRegionList[2].pid = address.cityId;
            this.selectRegionList = selectRegionList;
            this.regionType = 3;
            this.filterFromReginList(address.cityId);
        } else {
            this.selectRegionList = [
            { id: 0, name: '省份', pid: 1, type: 1 },
            { id: 0, name: '城市', pid: 1, type: 2 },
            { id: 0, name: '区县', pid: 1, type: 3 }
            ];
            this.regionType = 1;
            this.getRegionList(0);
        }
        this.setRegionDoneStatus();
    },
    // 选择不同级别的地市信息
    selectRegionType (event) {
        let regionTypeIndex = event.target.dataset.regionTypeIndex;
        let selectRegionList = this.selectRegionList;
        // 判断是否可点击
        if (regionTypeIndex + 1 === this.regionType || (regionTypeIndex - 1 >= 0 && selectRegionList[regionTypeIndex - 1].id <= 0)) {
            return false;
        }
        this.regionType = regionTypeIndex + 1;
        let selectRegionItem = selectRegionList[regionTypeIndex];
        this.filterFromReginList(selectRegionItem.pid);
        this.setRegionDoneStatus();
    },
    // 点击某一个地市名字
    selectRegion (event) {
        let regionIndex = event.target.dataset.regionIndex;
        let regionItem = this.regionList[regionIndex];
        let regionType = regionItem.type;
        let selectRegionList = this.selectRegionList;
        selectRegionList[regionType - 1] = regionItem;
        if (regionType !== 3) {
            this.selectRegionList = selectRegionList;
            this.regionType = regionType + 1;
            this.filterFromReginList(regionItem.id);
        } else {
            this.selectRegionList = selectRegionList;
        }
        // 重置下级区域为空
        selectRegionList.map((item, index) => {
            if (index > regionType - 1) {
            item.id = 0;
            item.name = index === 1 ? '城市' : '区县';
            item.pid = 0;
            }
            return item;
        });
        this.selectRegionList = selectRegionList;
        this.regionList = this.regionList.map(item => {
            // 找到已选择的
            if (this.regionType === item.type && this.selectRegionList[this.regionType - 1].id === item.id) {
            item.selected = true;
            } else {
            item.selected = false;
            }
            return item;
        })
        this.setRegionDoneStatus();
    },
    // 点击浮窗的确定
    doneSelectRegion () {
        if (this.selectRegionDone === false) {
            return false;
        }
        let address = this.address;
        let selectRegionList = this.selectRegionList;
        address.provinceId = selectRegionList[0].id;
        address.cityId = selectRegionList[1].id;
        address.areaId = selectRegionList[2].id;
        address.provinceName = selectRegionList[0].name;
        address.cityName = selectRegionList[1].name;
        address.areaName = selectRegionList[2].name;
        address.full_region = selectRegionList.map(item => {
            if(item.name == '市辖区') {
                return ''
            } else 
                return item.name;
        }).join(' ');
        this.address = address;
        this.openSelectRegion = false;
    },
    // 点击浮窗的背景遮罩，取消地市选择
    cancelSelectRegion () {
        this.openSelectRegion = false;
        this.regionType = this.regionDoneStatus ? 3 : 1;
    },
  }
}

</script>
<style scoped lang="scss">
    .wrapper{
        height: 50px;
        font-family:microsoft yahei;
        background-color: #Ffffff
    }
    .address-container {
        width: 94vw;
        margin-left: 3vw;
        border: 1px solid #FAFAFA;
        border-radius: 10px;
        margin-top: 50px;
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
