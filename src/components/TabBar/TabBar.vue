<template>
  <van-tabbar v-model="activeTabbar" route active-color="#02d199" inactive-color="#000">
    <van-tabbar-item icon="home-o" name="home" to="/">首页</van-tabbar-item>
    <van-tabbar-item icon="comment-circle-o" name="message" to="/message">消息</van-tabbar-item>
    <van-tabbar-item icon="friends-o" name="hot" to="/hot">热门</van-tabbar-item>
    <van-tabbar-item icon="user-o" name="my" to="/my">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script>
/**
 * 底部导航
 */
export default {
  name: 'TabBar',
  data() {
    return {
      activeTabbar: ''
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
