<!--  -->
<template>
  <div>
    <div class="container" :style="divStyle">
      <section class="header">
          <swiper class="goodsimgs" indicator-dots="true" autoplay="true" interval="3000" duration="1000">
              <swiper-slide v-for="(item, index) of goodsDetail.gallery" :key="index" :data-index="index">
                  <img class="image" :src="item" background-size="cover"/>
              </swiper-slide>
          </swiper>
          <div class="goods-title">{{goodsDetail.name}}</div>
          <div class="goods-price-container">
              <div class="rent-price">¥<span class="big-price">{{goodsDetail.rentPrice}}</span><span class="normal-font">/{{goodsDetail.periodUnit}}</span></div>
              <div class="total-price">1商品价值：¥{{goodsDetail.retailPrice}}</div>
          </div>
      </section>
      <ul class="tab-list">
          <li class="ta-li" v-for="(item,index) of tabList" :key="index" :class="{'active':index==activeItem}" @click="switchTab(index)">
          {{item}}
          </li>
      </ul>
      
        <div v-if="activeItem == 0">
            <div @scroll="scrollEvent($event)" :scroll-y="canScroll" :style="{height:winHeight+'rpx'}">
                <div class="img-container">
                    <img mode="widthFix" v-for="(item, index) of goodsDetail.description" :key="index" :data-index="index" class="desc-image" :src="item" background-size="cover"/>
                </div>
            </div>
        </div>
        <div v-else-if="activeItem == 1">
            <div @scroll="scrollEvent($event)" :scroll-y="canScroll" :style="{height:winHeight+'rpx'}">
                <section class="zuling-box">
                    <div class="zuling-header">租赁流程</div>
                    <div class="zuling-content">选择商品 -- 下单审核 -- 首期支付 -- 发货 -- 月付租金 -- 归还商品</div>
                    <div class="zuling-header">租期结束后可选方案</div>
                    <div class="zuling-subheader">归还</div>
                    <div class="zuling-content">支持邮寄归还</div>
                    <div class="zuling-subheader">买断</div>
                    <div class="zuling-content">支持尾款终身拥有</div>
                </section>
                <section class="zuling-box">
                    <div class="zuling-header">其他说明</div>
                    <div class="zuling-subheader">收货须知</div>
                    <div class="zuling-content">身份证正反面复印件以确认本人收货，并交由快递小哥寄回本平台制定地点存档</div>
                    <div class="zuling-subheader">租金</div>
                    <div class="zuling-content">用户需按月支付租金，平台将在每月账单日发出账单提醒，用户需登录账户支付该月租金，请避免逾期对您产生的信用影响。</div>
                    <div class="zuling-subheader">买断</div>
                    <div class="zuling-content">租赁到期后可支付买断款买断该商品，买断款以下单时协议里的买断价为准。</div>
                </section>
            </div>
        </div>
        <div v-else-if="activeItem == 2">
            <div @scroll="scrollEvent($event)" :scroll-y="canScroll" :style="{height:winHeight+'rpx'}">
                <div class="comment-container has-comment" v-if="commentList.length>0">
                    <comment-card v-for="(item, index) of commentList" :key="index" :commentItem="item"></comment-card>
                </div>
                <div class="comment-container no-comment-container" v-if="commentList.length==0">
                    <div class="no-comment">暂无评论</div>
                </div>
            </div>
        </div>

        <div class="bottom-btn">
            <div class="l-collect" @click="collect()">
                <img v-if="goodsDetail.isCollect" class="icon" src="../assets/images/icon_collect_current.png"/>
                <img v-else class="icon" src="../assets/images/icon_collect_normal.png"/>
            </div>
            <div class="l-collect l-collect2" >
                <img @click="call" class="icon" src="../assets/images/btn_call_contact.png"/>
            </div>
            <div @click="showDialog($event)" class="select-guige">立即租赁</div>
        </div>      
    </div>
    <login-dialog v-if="showLogin" @close="showLogin=false"></login-dialog>
    <!--  catchtouchmove="true" -->
       <div class="attr-pop-box" :hidden="openAttr">
            <div class="attr-pop">
                <div class="img-info">
                    <div class="close" @click="closeAttr">
                        <img class="icon" src="../assets/images/btn_close_popup.png"/>
                    </div>
                    <img class="img" :src="goodsDetail.picUrl"/>
                    <div class="info">
                        {{goodsDetail.name}}
                    </div>
                </div>
                <div class="price-container">
                    <div class="p">¥{{selectGoods.rentPrice}}</div>
                    <div class="a">商品价值:¥{{selectGoods.goodsPrice}}</div>
                </div>
                <div class="center-container">
                    <div class="spec-con">
                        <div class="spec-item" v-for="(item, index) of goodsDetail.specificationList" :key="index" :data-index="index">
                            <div class="name">{{item.name}}</div>
                            <div class="values">
                                <!-- <div :class="iitem.checked ? iitem.checked=='noexist'?'value unexist-value':'selected value' : 'value'"  @click="selectproduct" v-for="(iitem, iindex) of item.specificationLists" :key="iindex" :data-index="iindex" :data-name-id="iitem.name" :data-sername-id="iitem.serName">{{iitem.name}}</div> -->
                                <div class="value" :class="{'unexist-value':iitem.checked=='noexist','selected':iitem.checked==true}"  @click="selectproduct" v-for="(iitem, iindex) of item.specificationLists" :key="iindex" :data-index="iindex" :data-name-id="iitem.name" :data-sername-id="iitem.serName">{{iitem.name}}</div>
                            </div>
                        </div>
                        <div class="spec-item">
                            <div class="name">{{goodsDetail.financeSpecificationList[0].name}}</div>
                            <div class="values">
                                <div :class="item2.checked ? 'selected value' : 'value'"  @click="selectRentTime" v-for="(item2, index2) of goodsDetail.financeSpecificationList[0].goodsFinanceSpecificationLists" :key="index2" :data-index="index2" :data-name-id="item2.name">{{item2.name}}</div>
                            </div>
                        </div>
                    </div>
                    <div v-if="goodsDetail.finaceList.length>0" class="yiwao-container">
                        <div>意外保障<span class="sub">什么是意外保障？</span>
                            <a class="fa-qa" href="/pages/finaceques/index" >
                                <img class="img" src="../assets/images/question.png" background-size="cover" />
                            </a>
                        </div>
                        <div class="yiwai-select">
                            <div @click="finaceSelect(0)" :class="goodsDetail.finaceList[0].checked ? 'selected value first' : 'value first'">一次性支付&nbsp&nbsp|&nbsp&nbsp¥{{goodsDetail.finaceList[0].amount}}</div>
                            <div class="unexist-value value" v-if="goodsDetail.finaceList.length>1&&fenqiSelectFlag==false">分期信息选择规格后显示</div>
                            <div @click="finaceSelect(1)" :class="goodsDetail.finaceList[1].checked ? 'selected value' : 'value'" v-if="goodsDetail.finaceList.length>1&&fenqiSelectFlag==true">分{{finace}}期&nbsp&nbsp|&nbsp&nbsp每期¥{{goodsDetail.finaceList[1].amount}}</div>
                        </div>
                    </div>
                </div>
                <div class="bottom-btn-container">
                    <div @click="placeOrder" class="startOrder">
                        确认
                    </div>
                </div>
            </div>
        </div>
  </div>
</template>

<script>
import mixins from '../mixins'
import {axiosHeaders} from "@/assets/api" 
import { swiper, swiperSlide } from "vue-awesome-swiper";
import LoginDialog from '../components/loginDialog.vue';
export default {
  name: 'goodsDetail',
  mixins: [mixins], 

  components: {
    swiper,
    swiperSlide,
    LoginDialog
  },

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
        divStyle: ''
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
    toast(str) {
        let instance = Toast(str);
        setTimeout(() => {
          instance.close();
        }, 2000);
    },
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
          let result = res.data.result;
          result.rentPrice = result.rentPrice.toFixed(2)
          result.retailPrice = result.retailPrice.toFixed(2)
          for (let it in result.specificationList) {
              let specificationLists = []
              result.specificationList[it].specificationLists = specificationLists
              for(let itt of result.specificationList[it].specificationList) {
                  result.specificationList[it].specificationLists.push({
                      'name': itt,
                      'serName': it,
                      'checked': false
                  })
              }
          }
          for (let it of result.financeSpecificationList) {
              let goodsFinanceSpecificationLists = []
              it.goodsFinanceSpecificationLists = goodsFinanceSpecificationLists
              for(let itt of it.goodsFinanceSpecificationList) {
                  it.goodsFinanceSpecificationLists.push({
                      'name': itt,
                      'checked': false
                  })
              }
          }
          for (let it of result.finaceList) {
              it.checked = false
          }
          let reg = /[1-9][0-9]*/g;
          if (result.finaceList.length>1) {
              let dt = []
              result.finaceList[1].dataList = dt
              for (let t of result.financeSpecificationList[0].goodsFinanceSpecificationList) {
                  result.finaceList[1].dataList.push(t.match(reg)[0])
              }
          }
          this.goodsDetail = result
          this.selectGoods.rentPrice = this.goodsDetail.rentPrice
          this.selectGoods.goodsPrice = this.goodsDetail.retailPrice
          this.buildResult()
        })
    },
    powerset(arr) {
        var ps = [[]];
        for (var i=0; i < arr.length; i++) {
            for (var j = 0, len = ps.length; j < len; j++) {
                ps.push(ps[j].concat(arr[i]));
            }
        }
        return ps;
    },

    // 规格选择
    selectproduct(e) {
        //1.点击改变样式
        //2.检查是否有货
        let checkedValues = [];
        let _specificationList = this.goodsDetail.specificationList;
        let specNameId = e.currentTarget.dataset.index;
        let specSernameId = e.currentTarget.dataset.sernameId;
        if (_specificationList[specSernameId].specificationLists[specNameId].checked === 'noexist') {
            return
        }
        if (_specificationList[specSernameId].specificationLists[specNameId].checked === true) {
            _specificationList[specSernameId].specificationLists[specNameId].checked = false
        } else {
            for (let i of _specificationList[specSernameId].specificationLists) {
                if (i.checked !== 'noexist')
                    i.checked = false
            }
            _specificationList[specSernameId].specificationLists[specNameId].checked = true
        }
        this.goodsDetail.specificationList = _specificationList;
        this.changeSpecInfo()
        this.changeAll()
    },
    getSelectProduct(id) {
        for (let i of this.goodsDetail.productList) {
            if(i.id == id) {
                return i
            }
        }
    },
    powerset(arr) {
        var ps = [[]];
        for (var i=0; i < arr.length; i++) {
            for (var j = 0, len = ps.length; j < len; j++) {
                ps.push(ps[j].concat(arr[i]));
            }
        }
        return ps;
    },
    buildResult() {
      // this.allResultArr
      let res = []
      let proList = this.goodsDetail.productList
      for (let i of proList) {
          if (i.number <= 0) continue
          let set = this.powerset(i.specifications)
          for (let j of set) {
              let key = j.join('+')
              if (res[key]) {
                  res[key].skus.push(i.id)
              } else {
                  res[key] ={
                      skus: [i.id]
                  }
              }
          }
      }
      this.allResultArr = res
    },
    getSelectItem () {
        if(this.goodsDetail.specificationList == null) {
            return false
        }
        let _specificationListTemp = this.goodsDetail.specificationList;
        let selectItem = []
        for (let i of _specificationListTemp) {
            let hasAdd = false
            for (let j of i.specificationLists) {
                if(j.checked === true) {
                    selectItem.push(j.name)
                    hasAdd = true
                }
            }
            if (!hasAdd) {
                selectItem.push('')
            }
        }
        return selectItem
    },
    trimSpliter(arr) {
        let ret = ''
        for (let k of arr){
            if(k !== '') {
                ret = ret + '+' + k
            }
        }
        if (ret[0] === '+') {
            ret = ret.substr(1)
        }
        return ret
    },
    changeSpecInfo () {
        let select = this.getSelectItem ()
        let _specificationListTemp = this.goodsDetail.specificationList;
        for (let i in _specificationListTemp) {
            let copy = this.getSelectItem ()
            let data1 = _specificationListTemp[i]
            for (let j in data1.specificationLists) {
                let item = data1.specificationLists[j].name
                if(select[i] === item) {
                    continue
                }
                copy[i] = item
                let curr = this.trimSpliter(copy)
                if(this.allResultArr[curr]) {
                    data1.specificationLists[j].checked = false
                } else {
                    data1.specificationLists[j].checked = 'noexist'
                }
            }  
        }
    },
    
    // 判断规格是否选择完整(每一种至少选择一项)，加入购物车前进行判断
    isCheckedAllSpec () {
        let selectItem = this.getSelectItem()
        if(selectItem === false) {
            return false
        }
        for (let j of selectItem) {
            if (j === '') {
                return false
            }
        }
        let curr = selectItem.join('+')
        return this.allResultArr[curr].skus[0]
    },
    selectRentTime(e) {
        //1.点击改变样式
        //2.改变价格
        //3.改变保障价格
        let rentId = e.currentTarget.dataset.index;
        let rentList = this.goodsDetail.financeSpecificationList[0].goodsFinanceSpecificationLists
        if(!rentList[rentId].checked) {
            for(let j of rentList) {
                j.checked = false
            }
            rentList[rentId].checked = true
            this.hasRentSelected = rentId
        }
        this.changeAll()
    },
    changeAll() {
        if (this.hasRentSelected!==false && this.isCheckedAllSpec()) {
            let sp = this.getSelectProduct(this.isCheckedAllSpec())
            this.selectGoods.rentPrice = sp.financeRespDTOList[this.hasRentSelected].price.toFixed(2)
            this.fenqiSelectFlag = true
            this.selectGoods.goodsPrice = sp.price.toFixed(2)
            if(this.goodsDetail.finaceList[1])
                this.finace = this.goodsDetail.finaceList[1].dataList[this.hasRentSelected]
        } else if (this.isCheckedAllSpec()) {
            let sp = this.getSelectProduct(this.isCheckedAllSpec())
            this.selectGoods.goodsPrice = sp.price.toFixed(2)
        }
    },
    finaceSelect(id) {
        let list = this.goodsDetail.finaceList
        if(list[id].checked === true) {
            list[id].checked = false
        } else {
            for (let i of list) {
                i.checked = false
            }
            list[id].checked = true
        }
    },
    switchTabBySwiper (e) {
        this.activeItem = e.detail.current
    },
    switchTabBySwiper (e) {
        console.log('e: ', e)
        this.activeItem = e.detail.current
    },
    switchTab(index){
        console.log('index: ', index);
        this.activeItem = index
    },
    placeOrder() {
        if(!this.goodsDetail.finaceList) {
            return
        }
        let finaceList = this.goodsDetail.finaceList
        let finaceSelected = false
        let proGuige = this.isCheckedAllSpec()
        for (let i in finaceList) {
            if (finaceList[i].checked) {
                finaceSelected = i
            }
        }
        
        if (proGuige === false) {
            this.toast('请选择规格')
            return
        }
        if(this.fenqiSelectFlag === false) {
            this.toast('请选择租期')
            return
        }
        if(finaceSelected === false) {
            this.toast('请选择意外保障')
            return
        }
        if(!this.checkLogin()){
            this.showLogin=true
            return
        }
        this.$axios.post('/user/getSimpleInfo',
          '',
          axiosHeaders
        ).then(res => {
          console.log('res: ', res);          
        })
        // this.POST('userBase/getSimpleInfo', '', res => {
        //     let result = res.data.result;
        //     if(result.isIdCardFront===true) {
        //     // if(true){
        //         if(this.$mp.platform === 'alipay') {
        //             my.navigateTo({
        //                 url: `/pages/placeOrder/index?id=${this.$mp.query.id}&guige=${proGuige}&rentTime=${this.hasRentSelected}&finace=${finaceSelected}`
        //             })
        //         } else {
        //             wx.navigateTo({
        //                 url: `/pages/placeOrder/index?id=${this.$mp.query.id}&guige=${proGuige}&rentTime=${this.hasRentSelected}&finace=${finaceSelected}`
        //             })
        //         }
        //         // this.POST('userBase/checkBankBind', '', res => {
        //         //     if(!res.data.result) {
        //         //         if(this.$mp.platform === 'alipay') {
        //         //             my.navigateTo({
        //         //                 url: `/pages/bindcard/index?id=${this.$mp.query.id}&guige=${proGuige}&rentTime=${this.hasRentSelected}&finace=${finaceSelected}`
        //         //             })
        //         //         } else {
        //         //             wx.navigateTo({
        //         //             url: `/pages/bindcard/index?id=${this.$mp.query.id}&guige=${proGuige}&rentTime=${this.hasRentSelected}&finace=${finaceSelected}`
        //         //             })
        //         //         }                                    
        //         //     } else {
        //         //         if(this.$mp.platform === 'alipay') {
        //         //             my.navigateTo({
        //         //                 url: `/pages/placeOrder/index?id=${this.$mp.query.id}&guige=${proGuige}&rentTime=${this.hasRentSelected}&finace=${finaceSelected}`
        //         //             })
        //         //         } else {
        //         //             wx.navigateTo({
        //         //                 url: `/pages/placeOrder/index?id=${this.$mp.query.id}&guige=${proGuige}&rentTime=${this.hasRentSelected}&finace=${finaceSelected}`
        //         //             })
        //         //         }
        //         //     }
        //         // },'user')
        //     } else {
        //         if(this.$mp.platform === 'alipay') {
        //             my.navigateTo({
        //                 url: `/pages/realName/index?id=${this.$mp.query.id}&guige=${proGuige}&rentTime=${this.hasRentSelected}&finace=${finaceSelected}`
        //             })
        //         } else {
        //             wx.navigateTo({
        //                 url: `/pages/realName/index?id=${this.$mp.query.id}&guige=${proGuige}&rentTime=${this.hasRentSelected}&finace=${finaceSelected}`
        //             })
        //         }
        //     }
        // },'user');
    },
    checkLogin() {
        return true
    },
    call() {
        window.location.href = 'tel://0571-86507022'
    },
    collect() {
        if(!this.checkLogin()){
            this.showLogin=true
            return
        }
        let dto = {
            "type": 0,
            "valueId": this.$route.query.id
        }
        console.log('this.goodsDetail.isCollect: ', this.goodsDetail.isCollect)
        if(this.goodsDetail.isCollect) {
            this.$axios.post('/mall/api/mallCollect/delete',
                dto,
                axiosHeaders
            ).then(res => {
                let instance = Toast('取消收藏成功');
                setTimeout(() => {
                    instance.close();
                }, 2000);
                this.coloctIcon = "../assets/images/icon_collect_normal.png"
                this.goodsDetail.isCollect = false
            })
        } else {
            this.$axios.post('/mall/api/mallCollect/add',
                dto,
                axiosHeaders
            ).then(res => {
                let instance = Toast('收藏成功');
                setTimeout(() => {
                    instance.close();
                }, 2000);
                this.goodsDetail.isCollect = true
                this.coloctIcon = "../assets/images/icon_collect_current.png"
            })
        }
    },    
    showDialog(e) {
        this.openAttr = false;
        this.canScroll = false;
        this.divStyle = 'top:0rpx;left:0px;width:100%;height:100%;overflow:hidden;position:fixed;'
    },
    closeAttr () {
        this.canScroll = true
        this.openAttr = true;
        this.divStyle = ''
    },
    // 规格选择
    selectproduct(e) {
        //1.点击改变样式
        //2.检查是否有货
        let checkedValues = [];
        let _specificationList = this.goodsDetail.specificationList;
        let specNameId = e.currentTarget.dataset.index;
        let specSernameId = e.currentTarget.dataset.sernameId;
        if (_specificationList[specSernameId].specificationLists[specNameId].checked === 'noexist') {
            return
        }
        if (_specificationList[specSernameId].specificationLists[specNameId].checked === true) {
            _specificationList[specSernameId].specificationLists[specNameId].checked = false
        } else {
            for (let i of _specificationList[specSernameId].specificationLists) {
                if (i.checked !== 'noexist')
                    i.checked = false
            }
            _specificationList[specSernameId].specificationLists[specNameId].checked = true
        }
        this.goodsDetail.specificationList = _specificationList;
        this.changeSpecInfo()
        this.changeAll()
    },
    selectRentTime(e) {
        //1.点击改变样式
        //2.改变价格
        //3.改变保障价格
        let rentId = e.currentTarget.dataset.index;
        let rentList = this.goodsDetail.financeSpecificationList[0].goodsFinanceSpecificationLists
        if(!rentList[rentId].checked) {
            for(let j of rentList) {
                j.checked = false
            }
            rentList[rentId].checked = true
            this.hasRentSelected = rentId
        }
        this.changeAll()
    }
}
}

</script>
<style lang='scss' scoped>
    .zuling-box{
        text-align: left;
    }
    .container {
        background-color: #ffffff;
        font-family:microsoft yahei;
    }
    .tab-list {
        display: flex;
        height: 45px;
        justify-content: space-around;
        align-items: center;
        width: 346px;
        margin-left: 14px;
    }
    .tab-list .ta-li {
        font-size: 14px;
        line-height: 25px;
        color: #a8a8a8;
        border-radius: 12px;
        width: 80px;
        text-align:center;
        // border: 1rpx solid #FFFFFF;
    }
    .tab-list .active {
      border: 1px solid #f6f6f6;
      box-shadow: 2px 2px 10px #cccccc;
      color:#1b1b1b;
    }
    .swiper-container{
        margin-bottom: 20px;
    }
    .header {
        width: 90%;
        background-color: #ffffff;
        // height: 700rpx;
        margin: 10px auto;
        padding-bottom: 30px;
        border: 1px solid #FAFAFA;
        border-radius: 10px;
        box-shadow: 1px 1px 25px #cccccc;
    }
    .goodsimgs {
        width:225px;
        height: 225px;
        margin-left: 60px;
        margin-top: 10px;
        overflow: hidden;
    }
    .goodsimgs .image{
        width: 225px;
        height: 225px;
        // height: 100%;
    }
    .goods-title {
        font-weight: 700;
        margin-left: 15px;
        margin-right: 15px;
        height: 20px;
        line-height: 20px;
        margin-top: 10px;
        font-size: 14px;
        text-align: left;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space:nowrap; /*不换行 */
    }
    .goods-price-container {
        display: flex;
        // margin-top: 10px;
        justify-content: space-between;
        padding: 0 15px;
    }
    .rent-price {
        font-size: 12px;
        color:#FF6900;
        // line-height: 15px;
    }
    .rent-price .big-price {
        font-size: 25px;
    }
    .rent-price .normal-font {
        color: #a8a8a8;
    }
    .total-price {
        font-size: 12px;
        color: #a8a8a8;
        margin-top: 20px;
        // line-height: 45rpx;
    }
    // --ww
    // .total-price {
    //     font-size: 12px;
    //     color: #a8a8a8;
    //     margin-top: 15px;
    //     // line-height: 45rpx;
    // }
    .zuling-header {
        font-size: 14px;
        font-weight: 700;
        margin-left: 14px;
        margin-top: 20px;
    }
    .zuling-subheader {
        font-size: 13px;
        font-weight: 400;
        margin-left: 14px;
        margin-top: 20px;
    }
    .zuling-content {
        font-size: 13px;
        margin-left: 14px;
        margin-right: 14px;
        margin-top: 12px;
        color: #a8a8a8;
        line-height: 25px;
    }
    .bottom-btn {
        width: 100%;
        height: 50px;
        position: fixed;
        bottom: 0;
        background-color: #FFFFFF;
        border-top:1px solid #F5f5f5;
        display: flex;
        justify-content: space-between;
    }
    .l-collect {
        height: 50px; 
        width: 27px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 20px;
    }
    .l-collect2{
        margin-right: 20px;
    }
    .l-collect .icon {
        width: 27px;
        height: 26px;
    }
    .select-guige {
        background-color: #FF7000;
        color:#ffffff;
        text-align: center;
        height: 40px;
        border-radius: 20px;
        width: 297px;
        margin-top: 5px;
        line-height: 40px;
        font-size: 13px;
        margin-right: 15rpx;
    }
    .img-container {
        margin-top: 10px;
        width: 100%;
        font-size: 0;
    }
    .desc-image {
        width: 375px;
        // height: auto;
        // margin-top:-8rpx;
        // height: 900rpx;
    }
    .comment-container {
        width: 90%;
        min-height: 82vh;
        margin-left: auto;
        margin-right: auto;
        border: 1px solid #FAFAFA;
        border-radius: 10px;
        margin-top: 10px;
        box-shadow: 1px 1px 25px #cccccc;
    }
    .no-comment-container {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        color: #a8a8a8;
    }
    .attr-pop-box {
        position: fixed;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, .5);
        z-index: 8;
        bottom: 0;
    }
    .attr-pop {
        width: 374px;
        left: 50%;
        margin-left: -187px;
        border-radius: 25px 25px 0 0;
        height: auto;
        max-height: 980rpx;
        // padding: 15px;
        background: #fff;
        position: fixed;
        z-index: 9;
        bottom: 0;
        overflow-y: auto;
    }
    .img-info {
        position: fixed;
        width: 374px;
        height: 150px;
        background-color: #FFF6EF;
        display: flex;
        flex-direction: row;
        z-index: 12;
    }
    .img-info .img {
        margin: 30px 0 0 30px;
        width: 140px;
        height: 140px;
        z-index: 888;
    }
    .img-info .info {
        flex: 1;
        text-align: left;
        line-height: 20px;
        color: #FF6F00;
        margin-top: 80px;
        margin-left: 10px;
        margin-right: 10px;
        font-weight: 700;
        font-size: 16px;
    }
    .attr-pop .close {
        position: absolute;
        width: 24px;
        height: 24px;
        right: 40px;
        top: 10px;
    }

    .attr-pop .close .icon {
        width: 24px;
        height: 24px;
    }
    .center-container {
        margin-top: 230px;
        margin-bottom: 70px;
    }
    .price-container {
        position: fixed;
        width: 375px;
        background-color: #ffffff;
        margin-top: 150px;
        display: flex;
        height: 80px;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        z-index: 10;
    }
    .price-container .p {
        font-weight: 700;
        font-size: 20px;
    }
    .price-container .a {
        font-weight: 400;
        font-size: 12px;
        color: #999999;
        margin-top: 5px;
    }
    .spec-con {
        width: 346px;
        margin-left: 14px;
        display: flex;
        flex-direction: column;
        font-size: 13px;
        margin-top: -10px;
        padding-bottom: 25px;
    }
    .spec-con .spec-item {
        display: flex;
        flex-direction: row;
    }
    .spec-con .spec-item .name{
        flex: 85px;
        margin-top: 15px;
    }
    .spec-con .spec-item .values{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        flex: 261px;
    }
    .spec-con .spec-item .values .value{
        border: 1px solid #999999;
        height: 27px;
        line-height: 27px;
        padding: 0 10px;
        max-width: 80px;
        white-space:nowrap;
        text-overflow: ellipsis;
        overflow:hidden;
        border-radius: 5px;
        margin-left: 15px;
        margin-top: 15px;
    }
    .yiwao-container {
        width: 346px;
        margin-left: 14px;
        border-top: 1px solid #e7e7e7;
        padding-top: 15px;
        font-size: 13px;
        div{
            text-align: left;
        }
    }
    .fa-qa {
        width: 16px;
        height: 16px;
        position: absolute;
        right: 16px;
        // bottom: 0;
        display:inline-block;

    }
    .fa-qa .img{
        width: 16px;
        height: 16px;
    }
    .yiwao-container .sub {
        color:#959595;
        font-size: 11px;
        margin-left: 7px;
    }
    .yiwao-container .yiwai-select{
        display: flex;
        flex-direction: row;
    }
    .yiwao-container .yiwai-select .value {
        border: 1px solid #9A9A9A;
        height: 27px;
        line-height: 27px;
        padding: 0 10px;
        border-radius: 5px;
        margin-top: 15px;
    }
    .yiwao-container .yiwai-select .first {
        margin-right: 15px;
    }
    .unexist-value {
        border: 1px dashed #cacaca !important;
        color: #9a9a9a !important;
    }
    .selected {
        border: 1px solid #ff6f00 !important;
        color: #ff6f00 !important;
    }
    .bottom-btn-container {
        background-color: #ffffff;
        width: 375px;
        height: 70px;
        position: fixed;
        bottom: 0;
    }
    .startOrder{
        color: #fff;
        background-color: #FF6F00;
        height: 40px;
        border-radius: 20px;
        text-align: center;
        width: 346px;
        margin-left: 14px;
        line-height: 40px;
        font-weight: 400;
        font-size: 15px;
        // margin-bottom: 15px;
        margin-top: 15px;
    }
</style>
