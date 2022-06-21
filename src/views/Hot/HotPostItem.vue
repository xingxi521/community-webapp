<template>
  <div class="item-main">
    <div class="sort" :class="{'first': idx === 1, 'second': idx === 2, 'third': idx === 3}">{{ idx > 9 ? idx : '0'+idx }}</div>
    <div class="right-box">
      <div class="title">{{ item.title }}</div>
      <div class="read">{{ item.answer }} 评论</div>
    </div>
  </div>
</template>

<script>
/**
 * 热门帖子项
 */
export default {
  name: 'HotPostItem',
  props: {
    item: {
      type: Object,
      default: () => {}
    },
    idx: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style lang="scss" scoped>
.item-main{
  display: flex;
  align-items: center;
  justify-content: flex-start;
  .sort{
    font-weight: bold;
    font-size: 40px;
    color: #999;
    &.first{
      color: #ed745e;
    }
    &.second{
      color: #e08435;
    }
    &.third{
      color: #f1ae37;
    }
  }
  .right-box{
    padding: 20px 20px;
    flex: 1;
    .title{
      font-weight: bold;
      color: #333;
      font-size: 32px;
    }
    .read{
      color: #999;
      font-size: 26px;
      margin-top: 10px;
    }
  }
}
</style>
