<template>
  <van-nav-bar
    :title="title"
    :left-text="leftText"
    left-arrow
    fixed
    placeholder
    z-index="500"
    @click-left="onClickLeft"
  />
</template>

<script>
/**
 * 头部导航
 */
export default {
  name: 'NavBar',
  props: {
    // 标题
    title: {
      type: String,
      default: ''
    },
    // 左边按钮文字
    leftText: {
      type: String,
      default: '返回'
    },
    // 是否显示左边箭头
    leftArrow: {
      type: Boolean,
      default: true
    },
    // 是否固定在顶部
    fixed: {
      type: Boolean,
      default: true
    },
    // 固定在顶部时，是否在标签位置生成一个等高的占位元素
    placeholder: {
      type: Boolean,
      default: true
    },
    zIndex: {
      type: [String, Number],
      default: 1
    }
  },
  methods: {
    // 左边按钮事件
    onClickLeft() {
      this.$emit('clickLeft')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
