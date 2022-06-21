<template>
  <div class="item-main">
    <div class="sort" :class="{'first': idx === 1, 'second': idx === 2, 'third': idx === 3}">{{ idx > 9 ? idx : '0'+idx }}</div>
    <img :src="env === 'development' ? `${type === 0 ? config.baseUrl.dev + item.pic : config.baseUrl.dev + item.uid.pic}` : `${type === 0 ? config.baseUrl.prod + item.pic : config.baseUrl.prod + item.uid.pic}`" alt="">
    <div class="right-box">
      <div class="title">{{ type === 0 ? item.nickName : item.uid.nickName }}</div>
      <div class="read">{{ type === 0 ? `已经连续签到 ${item.count}天` : `签到于 ${formatCreateTime(item.createTime)}` }}</div>
    </div>
  </div>
</template>

<script>
/**
 * 签到总榜和今日签到项
 */
import { formatCreateTime } from '@/utils/public'
import config from '@/config'
export default {
  name: 'HotSign',
  props: {
    item: {
      type: Object,
      default: () => {}
    },
    idx: {
      type: Number,
      default: 0
    },
    type: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      config,
      env: process.env.NODE_ENV
    }
  },
  methods: {
    formatCreateTime
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
  img{
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin: 0 0 0 20px;
  }
  .right-box{
    padding: 20px 20px;
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
