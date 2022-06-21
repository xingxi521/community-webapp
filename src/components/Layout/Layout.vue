<template>
  <div class="layout-main">
    <slot />
    <TabBar />
  </div>
</template>

<script>
/**
 * 布局
 */
export default {
  name: 'Layout'
}
</script>

<style lang="scss" scoped>
.layout-main{
  padding-bottom: 80px;
}
</style>
