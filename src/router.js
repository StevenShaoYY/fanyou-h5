import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [{
            path: "/",
            name: "home",
            redirect: '/index',
            component: Home
        },
        {
            path: "/about",
            name: "about",
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import ( /* webpackChunkName: "about" */ "./views/About.vue")
        },
        {
            path: "/index",
            name: "index",
            component: () =>
                import ("./views/Index.vue"),
            meta: {
                title: '首页',
                showBottomTabBar: true
            }
        },
        {
            path: "/login",
            name: "login",
            component: () =>
                import ("./views/Login.vue")
        },
        {
            path: "/myCenter",
            name: "myCenter",
            component: () =>
                import ("./views/myCenter.vue"),
            meta: {
                title: '个人中心',
                showBottomTabBar: true
            }
        },
        {
            path: "/pages/category/index",
            name: "category",
            component: () =>
                import ("./views/category.vue"),
            meta: {
                title: '产品种类',
                showBottomTabBar: false
            }
        },
        {
            path: "/pages/goodsDetail/index",
            name: "goodsDetail",
            component: () =>
                import ("./views/goodsDetail.vue"),
            meta: {
                title: '产品详情',
                showBottomTabBar: false
            }
        },
        {
            path: "/help",
            name: "help",
            component: () =>
                import ("./views/help.vue"),
            meta: {
                title: '帮助中心',
                showBottomTabBar: false
            }
        },
        {
            path: "/placeOrder",
            name: "placeOrder",
            component: () =>
                import ("./views/placeOrder.vue"),
            meta: {
                title: '确认订单',
                showBottomTabBar: false
            }
        },
        {
            path: "/orderDetail",
            name: "orderDetail",
            component: () =>
                import ("./views/orderDetail.vue"),
            meta: {
                title: '订单详情',
                showBottomTabBar: false
            }
        },
        {
            path: "/addressManage",
            name: "addressManage",
            component: () =>
                import ("./views/addressManage.vue"),
            meta: {
                title: '地址管理',
                showBottomTabBar: false
            }
        },
        {
            path: "/finaceques",
            name: "finaceques",
            component: () =>
                import ("./views/finaceques.vue"),
            meta: {
                title: '租赁协议',
                showBottomTabBar: false
            }
        },
        {
            path: "/returnDevice",
            name: "returnDevice",
            component: () =>
                import ("./views/returnDevice.vue"),
            meta: {
                title: '设备归还',
                showBottomTabBar: false
            }
        },
        {
            path: "/realName",
            name: "realName",
            component: () =>
                import ("./views/realName.vue"),
            meta: {
                title: '实名认证',
                showBottomTabBar: false
            }
        },
        {
            path: "/returnDeviceConfirm",
            name: "returnDeviceConfirm",
            component: () =>
                import ("./views/returnDeviceConfirm.vue"),
            meta: {
                title: '设备归还确认',
                showBottomTabBar: false
            }
        },

        {
            path: "/identityAuth",
            name: "identityAuth",
            component: () =>
                import ("./views/identityAuth.vue"),
            meta: {
                title: '身份认证',
                showBottomTabBar: false
            }
        },
        {
            path: "/orderProduct",
            name: "orderProduct",
            component: () =>
                import ("./views/orderProduct.vue"),
            meta: {
                title: '订单',
                showBottomTabBar: false
            }
        },
        {
            path: "/aboutUs",
            name: "aboutUs",
            component: () =>
                import ("./views/aboutUs.vue"),
            meta: {
                title: '关于我们',
                showBottomTabBar: false
            }
        },
        {
            path: "/FAQ",
            name: "FAQ",
            component: () =>
                import ("./views/FAQ.vue"),
            meta: {
                title: '常见问题',
                showBottomTabBar: false
            }
        },
        {
            path: "/myCollect",
            name: "myCollect",
            component: () =>
                import ("./views/myCollect.vue"),
            meta: {
                title: '我的收藏',
                showBottomTabBar: false
            }
        },
        {
            path: "/myComment",
            name: "myComment",
            component: () =>
                import ("./views/myComment.vue"),
            meta: {
                title: '我的评论',
                showBottomTabBar: false
            }
        }

    ]
});