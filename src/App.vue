<template>
 <!-- <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>-->
  <div id="app">
    <transition :name="Direction.transitionName" :css="!!Direction.type">
      <vnode-cache>
        <router-view id="router-view"></router-view>
      </vnode-cache>
    </transition>
    <TabBar v-show="Direction.isTabBar"></TabBar>
  </div>
</template>
<script>
  import TabBar from '@/components/ComponentsLayout/TabBar/index'
  export default {
    name: 'App',
    components: {
      TabBar
    },
    data () {
      return {
        Direction:{
          type: '',
          isTabBar: true,
          transitionName: ''
        }
      }
    },
    created () {
      this.$vueAppEffect.on('forward', (direction) => {
        this.Direction = direction
      })
      this.$vueAppEffect.on('reverse', (direction) => {
        this.Direction = direction
      })
    }
  }
</script>
<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
