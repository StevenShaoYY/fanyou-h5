<template>
    <!-- <swiper class="slider" indicator-dots=true autoplay=true interval="5000" indicator-active-color="#b4282d"> -->
    <swiper class="slider" autoplay=true interval="5000">
        <block v-for="(item, index) in imageList" :key="index">
            <swiper-item>
            <image class="image" resize="cover" :src="item.url"/>
            </swiper-item>
        </block>
    </swiper>
</template>
<style scoped>
    .iconfont {
        font-family:iconfont;
    }
    .image {
        width: 691rpx;
        height: 365rpx;
        border-radius: 15rpx;
    }
    .slider {
        width: 691rpx;
        height: 365rpx;
        margin-left: 30rpx;
    }
    .frame {
        width: 691rpx;
        height: 365rpx;
        position: relative;
    }
</style>
<script>
    export default {
        props:["imageList"],
        data () {
            return {
            }
        },
        methods: {
            onchange (event) {
            }
        }
    }
</script>