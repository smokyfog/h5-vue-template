<template>
  <div>
    <div class="login-header">login layout header</div>
    <transition :name="transitionName">
      <keep-alive v-if="$route.meta.keepAlive">
        <router-view class="router" />
      </keep-alive>
      <router-view v-else class="router" />
    </transition>
    <div class="login-footer">login layout footer</div>
  </div>
</template>

<script>
import defaultSetting from '../settings'
export default {
  name: 'LoginLayout',
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

<style>

</style>
