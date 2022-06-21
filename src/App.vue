<template>
  <div id="app">
    <transition :name="direction">
      <router-view />
    </transition>
  </div>
</template>
<script>
export default {
  data () {
    return {
      direction: ''
    }
  },
  watch: {
    $route (to, from) {
      // 如果前端页面进行刷新，则无需加入transition动画
      if (from.name === null) {
        return
      }
      if (to.meta.index < from.meta.index) {
        this.direction = 'slide-right'
      } else {
        if (!to.meta.index) {
          this.direction = ''
          return
        }
        this.direction = 'slide-left'
      }
    }
  }
}
</script>
<style lang="scss">
@import "@/assets/styles/global.scss";
.slide-right-enter-active,
.slide-left-enter-active,
.slide-right-leave-active,
.slide-left-leave-active {
  transition: all 0.5s;
  will-change: transform;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
}
.slide-right-enter {
  transform: translateX(-100%);
}
.slide-right-leave-active,
.slide-right-leave-to {
  transform: translateX(100%);
}
.slide-right-enter-to,
.slide-right-leave {
  transform: translateX(0);
}
.slide-left-enter {
  transform: translateX(100%);
}
.slide-left-leave-active,
.slide-left-leave-to {
  transform: translateX(-100%);
}
.slide-left-enter-to,
.slide-left-leave {
  transform: translateX(0);
}
</style>
