<template>
  <div class="view" v-show="show">
    <!--<Header :title="'视频'" :show="false" :bg="true" :border="true"></Header>-->
    <div class="bd">
      <!--<p>用户信息:{{JSON.stringify(userInfo)}}</p>-->
      <div>
        <cube-slide ref="slide" :data="banner_items" @change="changePage">
          <cube-slide-item v-for="(item, index) in banner_items" :key="index" @click.native="clickHandler(item, index)">
            <a :href="item.url">
              <img :src="item.image">
            </a>
          </cube-slide-item>
        </cube-slide>
      </div>
      <cube-scroll
              ref="scroll"
              :data="items"
              :options="options"
              @pulling-down="onPullingDown"
              @pulling-up="onPullingUp">
        <ul class="foods-wrapper">
          <li v-for="food in items" class="food-item border-1px">
            <div class="icon">
              <img width="57" height="57" :src="food.icon">
            </div>
            <div class="food-content">
              <h2 class="name">{{food.name}}</h2>
              <p class="description">{{food.description}}</p>
              <div class="extra">
                <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
              </div>
              <div class="price">
                <span class="now">￥{{food.price}}</span>
                <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
              </div>
            </div>
          </li>
        </ul>
        <template v-if="customPullDown" slot="pulldown" slot-scope="props">
          <div
                  v-if="props.pullDownRefresh"
                  class="cube-pulldown-wrapper"
                  :style="props.pullDownStyle">
            <div
                    v-show="props.beforePullDown"
                    class="before-trigger"
                    :style="{paddingTop: props.bubbleY + 'px'}">
              <span :class="{rotate: props.bubbleY > pullDownRefreshThreshold - 40}">↓</span>
            </div>
            <div class="after-trigger" v-show="!props.beforePullDown">
              <div v-show="props.isPullingDown" class="loading">
                <cube-loading></cube-loading>
              </div>
              <div v-show="!props.isPullingDown" class="text"><span class="refresh-text">Refresh success</span></div>
            </div>
          </div>
        </template>
      </cube-scroll>
    </div>
    <!-- <scroller
       :scrollingY="true"
       :data="items">
       <div class='mvlist'>
         <div class='list' v-for="(item,index) in items" :key="index">
           <div class='detail' @click='goDetail(index+1,`MV`)'>
             <img class='img' :src="defaultImg">
             <div class="title-box">
               <div class='title'>vue-app-effect MV {{index+1}}</div>
             </div>
             <div class='date'>播放: {{index+1}}.99 万</div>
           </div>
         </div>
       </div>
     </scroller>-->
  </div>
</template>

<script>
  import Header from '@/components/ComponentsLayout/Header/index'
  // import CubeSlideItem from '@/components/slide-item.vue'
  import {mapGetters} from 'vuex'
  import goodsData from '@/data/goods-list.json'

  let _foods = []
  goodsData.goods.forEach(item => {
    _foods = _foods.concat(item.foods)
  })
  export default {
    name: 'home',
    components: {
      Header
    },
    computed: {
      ...mapGetters(['userInfo', 'token']),
      options() {
        return {
          pullDownRefresh: this.pullDownRefreshObj,
          pullUpLoad: this.pullUpLoadObj,
          scrollbar: true
        }
      },
      pullDownRefreshObj: function () {
        return this.pullDownRefresh ? {
          threshold: parseInt(this.pullDownRefreshThreshold),
          // Do not need to set stop value, but you can if you want
          // stop: parseInt(this.pullDownRefreshStop),
          txt: this.pullDownRefreshTxt
        } : false
      },
      pullUpLoadObj: function () {
        return this.pullUpLoad ? {
          threshold: parseInt(this.pullUpLoadThreshold),
          txt: {
            more: this.pullUpLoadMoreTxt,
            noMore: this.pullUpLoadNoMoreTxt
          }
        } : false
      }
    },
    data() {
      return {
        show: false,
        defaultImg: require('@/assets/images/mv.png'),
        items: _foods,
        banner_items: [
          {
            url: 'http://www.didichuxing.com/',
            image: '//webapp.didistatic.com/static/webapp/shield/cube-ui-examples-slide01.png'
          },
          {
            url: 'http://www.didichuxing.com/',
            image: '//webapp.didistatic.com/static/webapp/shield/cube-ui-examples-slide02.png'
          },
          {
            url: 'http://www.didichuxing.com/',
            image: '//webapp.didistatic.com/static/webapp/shield/cube-ui-examples-slide03.png'
          }
        ],
        pullDownRefresh: false,
        pullDownRefreshThreshold: 60,
        pullDownRefreshStop: 40,
        pullDownRefreshTxt: 'Refresh success',
        pullUpLoad: false,
        pullUpLoadThreshold: 0,
        pullUpLoadMoreTxt: 'Load more',
        pullUpLoadNoMoreTxt: 'No more data',
        customPullDown: false
      }
    },
    created() {
      setTimeout(() => {
        this.items = new Array(30)
      }, 500)
    },
    mounted() {
      this.show = true
    },
    methods: {
      changePage(current) {
        console.log('当前轮播图序号为:' + current)
      },
      clickHandler(item, index) {
        console.log(item, index)
      },
      onPullingDown() {
        // 模拟更新数据
        setTimeout(() => {
          if (Math.random() > 0.5) {
            // 如果有新数据
            this.items.unshift(_foods[1])
          } else {
            // 如果没有新数据
            this.$refs.scroll.forceUpdate()
          }
        }, 1000)
      },
      onPullingUp() {
        // 更新数据
        setTimeout(() => {
          if (Math.random() > 0.5) {
            // 如果有新数据
            let newPage = _foods.slice(0, 5)
            this.items = this.items.concat(newPage)
          } else {
            // 如果没有新数据
            this.$refs.scroll.forceUpdate()
          }
        }, 1000)
      },
      updatePullDownRefresh(val) {
        this.pullDownRefresh = val
      },
      updatePullDownRefreshThreshold(val) {
        this.pullDownRefreshThreshold = val
      },
      // updatePullDownRefreshStop(val) {
      //   this.pullDownRefreshStop = val
      // },
      updatePullDownRefreshTxt(val) {
        this.pullDownRefreshTxt = val
      },
      updatePullUpLoad(val) {
        this.pullUpLoad = val
      },
      updatePullUpLoadThreshold(val) {
        this.pullUpLoadThreshold = val
      },
      updatePullUpLoadMoreTxt(val) {
        this.pullUpLoadMoreTxt = val
      },
      updatePullUpLoadNoMoreTxt(val) {
        this.pullUpLoadNoMoreTxt = val
      },
      updateCustomPullDown(val) {
        this.customPullDown = val
      },
      rebuildScroll() {
        Vue.nextTick(() => {
          this.$refs.scroll.destroy()
          this.$refs.scroll.initScroll()
        })
      },
      goDetail(index, name) {
        this.$vueAppEffect.next({
          vm: this,
          path: `/home/${index}`,
          component: this.repeatComponents.MovieDetail,
          params: {id: index, name: name}
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../../../assets/css/mxin'
  .bd
    position absolute
    top 0px!important
  .mvlist
    color: rgba(255, 255, 255, 0.5)
    display flex
    padding 5px
    flex-wrap wrap
    .list
      flex 50% 0 0
      .detail
        padding 5px
        position relative
        .img
          width: 100%;
        .title-box
          height: 30px;
          position relative
          line-height: 30px;
        .title
          position absolute
          left 0
          right 0
          font-size: $fontS;
          color: #000
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          word-wrap: normal;
        .date
          font-size: $fontXS
          i
            font-size 20px;
            position relative;
            top -1px;

  .foods-wrapper
    .food-item
      display: flex
      padding: 18px
      border-bottom: 1px solid rgba(7, 17, 27, 0.1)

      &:last-child
        border-none()
        margin-bottom: 0
      .icon
        flex: 0 0 57px
        margin-right: 10px

      .food-content
        flex: 1
        .name
          margin: 2px 0 8px 0
          height: 14px
          line-height: 14px
          font-size: 14px
          color: rgb(7, 17, 27)
        .description, .extra
          line-height: 10px
          font-size: 10px
          color: rgb(147, 153, 159)
        .description
          line-height: 12px
          margin-bottom: 8px
        .extra
          .count
            margin-right: 12px
        .price
          font-weight: 700
          line-height: 24px
          .now
            margin-right: 8px
            font-size: 14px
            color: rgb(240, 20, 20)
          .old
            text-decoration: line-through
            font-size: 10px
            color: rgb(147, 153, 159)
        .cartcontrol-wrapper
          position: absolute
          right: 0
          bottom: 12px

  @media screen and (max-width: 480px)
    .img
      height 108px

  @media screen and (max-width: 375px)
    .img
      height 97px

  @media screen and (max-width: 320px)
    .img
      height 82px

</style>
