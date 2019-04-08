<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="chooseImg">支付</button>
  </div>
</template>
<script>

    export default {
        name: 'home',
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
            }
        }
    }
</script>