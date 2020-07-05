<template>
  <div>
    <div class="default-header">default layout header</div>
    <transition :name="transitionName">
      <keep-alive v-if="$route.meta.keepAlive">
        <router-view class="router" />
      </keep-alive>
      <router-view v-else class="router" />
    </transition>
    <div class="default-footer">default layout footer</div>
  </div>
</template>

<script>
import defaultSetting from '../settings'
export default {
  name: 'DefaultLayout',
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
  .default-header {
    position: absolute;
    /* z-index: 999; */
  }
</style>
