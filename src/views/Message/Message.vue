<template>
  <div class="message-main">
    <van-tabs v-model="activeBar">
      <van-tab title="回复" name="reply">
        <div class="wrap">
          <ReplyItem v-for="item in listData" :key="item._id" :item="item" />
        </div>
      </van-tab>
      <van-tab title="点赞" name="nice">
        <div class="wrap">
          <ReplyItem />
        </div>
      </van-tab>
    </van-tabs>
    <!-- 底部导航 -->
    <TabBar />
  </div>
</template>

<script>
/**
 * 消息
 */
import { getNoReadComment } from '@/api/comment'
export default {
  name: 'Message',
  components: {
    ReplyItem: () => import('./ReplyItem')
  },
  data() {
    return {
      activeBar: 'reply',
      pageNum: 1,
      pageSize: 20,
      total: 0,
      // 列表数据
      listData: []
    }
  },
  mounted() {
    this.getNoReadCommentRequst()
  },
  methods: {
    // 获取未读消息
    getNoReadCommentRequst() {
      getNoReadComment({
        pageSize: this.pageSize,
        pageNum: this.pageNum
      }).then(res => {
        this.listData = res.data.records
        this.total = res.data.total
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.message-main{
  .wrap{
    padding: 30px;
  }
}
</style>
