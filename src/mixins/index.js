export default {
    methods: {
        shareMessage(pathUrl) {
            return {
                title: '凡有e租',
                desc: '凡有e租是一个专业的租赁服务平台,为用户提供专业的租赁一站式服务。用户在凡有e租完成风控认证即可获得免押金租赁的机会。[租金月付]用户只需完成相关绑定,即可享有租金每月按期支付。[免押金]:完成身份认证即可拥有免押金额度。我们致力于把市面上最好看最好玩的商品带给用户。不求所有但求所用的生活态度是我们所倡导以及努力的方向。',
                path: pathUrl
            };
        },
        jump(to) {
            if (this.$mp.platform === 'alipay') {
                my.navigateTo({
                    url: to
                })
            } else {
                wx.navigateTo({
                    url: to
                })
            }
        },
        toast(str) {
            if (this.$mp.platform === 'alipay') {
                my.showToast({
                    type: 'none',
                    content: str,
                    duration: 1500,
                    success: () => {},
                });
            } else {
                wx.showToast({
                    title: str,
                    icon: 'none',
                    duration: 2000
                })
            }
        },
        back() {
            if (this.$mp.platform === 'alipay') {
                my.navigateBack({
                    delta: 1
                });
            } else {
                wx.navigateBack({
                    delta: 1
                })
            }
        },
        backPage(cen) {
            if (this.$mp.platform === 'alipay') {
                my.navigateBack({
                    delta: cen
                });
            } else {
                wx.navigateBack({
                    delta: cen
                })
            }
        },
        POST(api, data, callback, type) {
            var appInstance = getApp()
            let globalData = appInstance.globalData;
            let accToken = globalData.accessToken
            let {
                platform
            } = this.$mp || {},
                request = () => {}
            let url = ''
            switch (platform) {
                case 'wechat':
                    request = wx && wx.request
                    break;
                case 'alipay':
                    request = my && my.httpRequest
                    break;
                case 'swan':
                    request = swan && swan.request
                    break;
                default:
                    break;
            }
            //生产环境
            // let baseUrl = 'https://fanyou.rank-tech.com:7002'
            //开发环境
            // let baseUrl = 'https://prod2.fanyoutech.com:7003'
            // 测试环境
            // let baseUrl = 'https://prod.fanyoutech.com:7003'
            let baseUrl = 'https://test.fanyoutech.com:7002'
                //31环境
                // let baseUrl = 'https://prod1.fanyoutech.com:7003'

            if (type === 'user') {
                url = `${baseUrl}/user/${api}`
            } else {
                url = `${baseUrl}/mall/${api}`
            }
            request && request({
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'ACCESS_TOKEN': accToken
                },
                header: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'ACCESS_TOKEN': accToken
                },
                url,
                success: (res) => {
                    if (res.data.ok) {
                        callback(res)
                    } else {
                        this.toast(res.data.msg)
                        callback(res)
                    }
                },
                fail: (cb) => {
                    if (cb.status == '401') {
                        if (this.$mp.platform == 'alipay') {
                            my.getAuthCode({
                                scopes: 'auth_base',
                                success: (res) => {
                                    getApp().globalData.authCode = res.authCode
                                    getApp().globalData.accessToken = ''
                                    this.POST('userBase/alipayLogin', { "authCode": res.authCode }, res => {
                                        let result = res.data.result;
                                        if (result.accessToken && result.accessToken !== '') {
                                            getApp().globalData.accessToken = result.accessToken
                                        }
                                        this.toast('您的登录状态过期，即将去往首页......')
                                        setTimeout(() => {
                                            this.jump('/pages/index/index')
                                        }, 1000)
                                    }, 'user');
                                },
                            });
                        }
                    } else {
                        this.toast('网络请求失败！')
                    }
                },
                data: JSON.stringify(data)
            })
        },
        uploadFile(api, fileType, fileName, filePath, formData, callback, type) {
            var appInstance = getApp()
            let globalData = appInstance.globalData;
            let accToken = globalData.accessToken
            let {
                platform
            } = this.$mp || {},
                request = () => {}
            let url = ''
            switch (platform) {
                case 'wechat':
                    request = wx && wx.uploadFile
                    break;
                case 'alipay':
                    request = my && my.uploadFile
                    break;
                case 'swan':
                    request = swan && swan.uploadFile
                    break;
                default:
                    break;
            }
            //生产环境
            // let baseUrl = 'https://fanyou.rank-tech.com:7002'
            //开发环境
            // let baseUrl = 'https://prod2.fanyoutech.com:7003'
            // 测试环境
            let baseUrl = 'https://test.fanyoutech.com:7002'
                //31环境
                // let baseUrl = 'https://prod1.fanyoutech.com:7003'
            if (type === 'user') {
                url = `${baseUrl}/user/${api}`
            } else {
                url = `${baseUrl}/mall/${api}`
            }
            request && request({
                header: {
                    'ACCESS_TOKEN': accToken,
                    'Content-Type': 'multipart/form-data'
                },
                url,
                filePath,
                fileType,
                fileName,
                success: callback,
                fail: (cb) => {
                    if (this.$mp.platform === 'alipay') {
                        my.showToast({
                            type: 'none',
                            content: '网络请求失败！',
                            duration: 3000,
                            success: () => {},
                        });
                    } else {
                        wx.showToast({
                            title: '网络请求失败！',
                            icon: 'none',
                            duration: 2000
                        })
                    }
                }
            })
        }

    }
}