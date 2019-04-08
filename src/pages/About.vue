<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="chooseImg">Image</button>
    <button @click="createOrder">createOrder</button>
    <button @click="pay">pay</button>
  </div>
</template>
<script>
    import {createOrder, orderDoPay} from '../api/wechatAuth'
    export default {
        name: 'home',
        data() {
            return {
                orderParams: {
                    user: '5cab0cb17f0bd496c4bdd76c',
                    phone: '13320558986',
                    userName: 'mike',
                    schedule: '5cab046c5f9dff37ec594f62',
                    openid: 'oAfgA1QTrvWbYXZ4iU2sGKMLEs5g',
                    pay_type: 1,
                    ticket_type: '3',
                    ticket: '1',
                },
                payParams: {
                    orderId: '5cab0f2ce0921d3f08b9ed93',
                    openId: 'oAfgA1QTrvWbYXZ4iU2sGKMLEs5g'
                }
            }
        },
        components: {
        },
        mounted() {
            // window.location.href = 'http://cnnapi.ngrok.tecfcs.com/web/wxapp/1'
        },
        methods: {
            chooseImg() {
                wx.chooseImage({
                    count: 1, // 默认9
                    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                    success: function (res) {
                        alert(1)
                        var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                    }
                });
            },
            createOrder() {
                createOrder(this.orderParams).then(res => {
                    console.log(res)
                })
            },
            pay() {
                orderDoPay(this.payParams).then(res => {
                    alert(res.data.package)
                    wx.chooseWXPay({
                        timestamp: res.data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                        nonceStr: res.data.nonceStr, // 支付签名随机串，不长于 32 位
                        package: res.data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
                        signType: res.data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                        paySign: res.data.paySign, // 支付签名
                        success: function (res) {
                            // 支付成功后的回调函数
                            alert('success')
                        }
                    });
                })

            }
        }
    }
</script>