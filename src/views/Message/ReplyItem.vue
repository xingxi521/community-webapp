<template>
  <div class="reply-main">
    <div class="info-box">
      <div class="box-left">
        <img :src="env === 'development' ? config.baseUrl.dev + item.uid.pic : config.baseUrl.prod + item.uid.pic" alt="">
        <div class="user-info">
          <div class="title">{{ item.uid.nickName }}</div>
          <div class="time">8分钟前</div>
        </div>
      </div>
      <div class="box-right" @click="markHandler(item._id)">
        <SvgIcon icon="editor" />
        标记已读
      </div>
    </div>
    <div class="content" v-html="item.content" />
    <div class="reply-content">
      <div>{{ item.tid.title }}</div>
    </div>
  </div>
</template>

<script>
/**
 * 回复显示组件
 */
import config from '@/config'
import { markCommentRead } from '@/api/comment'
export default {
  name: 'ReplyItem',
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      config,
      env: process.env.NODE_ENV
    }
  },
  methods: {
    // 标记为已读消息
    markHandler(id) {
      markCommentRead({
        id
      }).then(res => {
        this.notifiySuccess(res.msg)
        this.$parent.$parent.$parent.$parent.getNoReadCommentRequst()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.reply-main{
  margin-bottom: 20px;
  .info-box{
    display: flex;
    justify-content: space-between;
    align-items: center;
    .box-left{
      display: flex;
      justify-content: flex-start;
      align-items: center;
      img{
        width: 80px;
        height: 80px;
        border-radius: 50%;
      }
      .user-info{
        margin-left: 20px;
        .title{
          font-weight: bold;
        }
        .time{
          color: #999;
          font-size: 28px;
        }
      }
    }
    .box-right{
      color: #999;
    }
  }
  .content{
    margin-top: 30px;
  }
  .reply-content{
    background: #f3f3f3;
    border-radius: 10px;
    padding: 20px;
    margin-top: 20px;
    font-size: 26px;
    .reply-post{
      color: #999;
      margin-top: 10px;
    }
  }
}
</style>
