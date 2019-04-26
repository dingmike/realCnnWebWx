<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png">
        <HelloWorld msg="Welcome to Your Vue.js App"/>
        <button @click="chooseImg">支付</button>
        <div>{{userDetail}}</div>
        <i class="iconfont icon-qiyeyunyingfenxi"></i>
    </div>
</template>

<script>
    // @ is an alias to /src
    import HelloWorld from '@/components/HelloWorld.vue'
    import {getUserInfo} from '../api/api'
    import { mapGetters } from "vuex";
    export default {
        name: 'home',
        data() {
            return {
                orderParams: {
                    user: 'mike',
                    phone: '13320558986',
                    userName: 'mike',
                    schedule: '23',
                    openid: '23',
                    pay_type: 'wx',
                    ticket_type: '3',
                    ticket: '32323',
                },
                userDetail: {},
              selectedLabelDefault: 'Vip'
            }
        },
        components: {
            HelloWorld
        },
        mounted() {
           // window.location.href = 'http://cnnapi.ngrok.tecfcs.com/web/wxapp/1'
            this.getUserInfo();
        },
        computed: {
            ...mapGetters(["userInfo"])
        },
        methods: {
            getUserInfo() {
                getUserInfo(this.userInfo.openid).then(res => {
                    debugger
                    console.log(res.data)
                    this.userDetail = res.data.nickname;
                })
            },
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
            }
        }
    }
</script>
