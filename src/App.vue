<template>
  <div id="app">
    <transition :name="transitionName">
      <component :is="layout">
        <keep-alive v-if="$route.meta.keepAlive">
          <router-view class="router" />
        </keep-alive>
        <router-view v-else class="router" />
      </component>
    </transition>
  </div>
</template>
<script>
import defaultSetting from './settings'
export default {
  name: 'App',
  data() {
    return {
      default_layout: 'default'
    }
  },
  computed: {
    transitionName() {
      if (defaultSetting.needPageTrans) {
        return this.$store.state.direction
      }
      return ''
    },
    layout() {
      return (this.$route.meta.layout || this.default_layout) + '-layout'
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  position: relative;
}

.router {
  width: 100%;
  height: 100%;
  position: absolute;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  // background-color: #fff;
}

.dis {
  display: flex;
  width: 200px;
  height: 200px;
}
</style>
