<template>
  <div class="list-main" @click="jumpToDetails">
    <div class="list-top">
      <span :class="`type type-${data.type}`">{{ ARTICLE_TYPE.getDescFromValue(data.type) }}</span>
      <span class="top-title">{{ data.title }}</span>
    </div>
    <div class="list-center">
      <img :src="env === 'development' ? config.baseUrl.dev + data.userInfo.pic : config.baseUrl.prod + data.userInfo.pic" alt="">
      <span class="author">{{ data.userInfo.nickName }}</span>
    </div>
    <div class="list-bottom">
      <span class="list-content" v-html="data.content">{{ data.content }}</span>
    </div>
  </div>
</template>

<script>
/**
 * 列表组件
 */
import { ARTICLE_TYPE } from '@/utils/const/home'
import config from '@/config'
export default {
  name: 'ListItem',
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      ARTICLE_TYPE,
      config,
      env: process.env.NODE_ENV
    }
  },
  methods: {
    // 跳转到详情页
    jumpToDetails() {
      this.$router.push({
        name: 'Details',
        params: {
          id: this.data._id
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.list-main{
  padding: 30px;
  margin-bottom: 20px;
  border-bottom: 1px solid #f5f5f5;
  .list-top{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 25px;
    .type{
      display: inline-block;
      height: 36px;
      width: 72px;
      min-width: 72px;
      text-align: center;
      line-height: 36px;
      white-space: nowrap;
      margin-right: 10px;
      font-size: 24px;
      border-radius: 18px;
      border-bottom-left-radius: 0;
      color: #fff;
    }
    .type-share {
      background-color: #feb21e;
    }
    .type-ask {
      background-color: #02d199;
    }
    .type-discuss {
      background-color: #fe1e1e;
    }
    .type-advise {
      background-color: #0166f8;
    }
    .top-title{
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      color: #333;
      font-weight: 700;
      font-size: 32px;
    }
  }
  .list-center{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 25px;
    img{
      width: 40px;
      height: 40px;
      border-radius: 100%;
      margin-right: 10px;
      vertical-align: middle;
      position: relative;
      top: -4px;
    }
  }
  .list-bottom{
    .list-content{
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      color: #666;
      ::v-deep{
        p{
          margin: 0;
        }
      }
    }
  }
}
</style>
