<template>
  <div class="hot-main">
    <van-tabs v-model="activeBar" @click="tabClick">
      <van-tab title="热门帖子" name="post">
        <ul class="ctrls">
          <li :class="{active: type === 0}" @click="setType(0)">3日内</li>
          <li :class="{active: type === 1}" @click="setType(1)">7日内</li>
          <li :class="{active: type === 2}" @click="setType(2)">30日内</li>
          <li :class="{active: type === 3}" @click="setType(3)">全部</li>
        </ul>
        <div class="wrap">
          <HotPostItem v-for="(item,idx) in list" :key="item._id" :item="item" :idx="idx + 1" />
        </div>
      </van-tab>
      <van-tab title="热门评论" name="comment">
        <ul class="ctrls">
          <li :class="{active: type === 0}" @click="setType(0)">热门评论</li>
          <li :class="{active: type === 1}" @click="setType(1)">最新评论</li>
        </ul>
        <div class="wrap">
          <HotComment v-for="(item,idx) in list" :key="item._id" :item="item" :idx="idx + 1" :type="type" />
        </div>
      </van-tab>
      <van-tab title="签到排行" name="sign">
        <ul class="ctrls">
          <li :class="{active: type === 0}" @click="setType(0)">总签到榜</li>
          <li :class="{active: type === 1}" @click="setType(1)">今日签到榜</li>
        </ul>
        <div class="wrap">
          <HotSign v-for="(item,idx) in list" :key="item._id" :item="item" :idx="idx + 1" :type="type" />
        </div>
      </van-tab>
    </van-tabs>
    <TabBar />
  </div>
</template>

<script>
/**
 * 热门
 */
import { getHotPostList, getHotComentList, getFaskSign, getTopSign } from '@/api/public'
export default {
  name: 'Hot',
  components: {
    HotPostItem: () => import('./HotPostItem'),
    HotComment: () => import('./HotComment'),
    HotSign: () => import('./HotSign')
  },
  data() {
    return {
      // 当前激活的bar
      activeBar: 'post',
      // 类型
      type: 0,
      // 各列表数据
      list: [],
      pageNum: 1,
      pageSize: 10,
      total: 0
    }
  },
  mounted() {
    this.dispatch()
  },
  methods: {
    // 获取热门贴子数据
    getHotPostListRequest() {
      getHotPostList({
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        type: this.type
      }).then(res => {
        this.list = res.data.records
        this.total = res.data.total
      })
    },
    // 获取热门评论
    getHotComentListRequest() {
      getHotComentList({
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        type: this.type
      }).then(res => {
        this.list = res.data.records
        this.total = res.data.total
      })
    },
    // 获取今日最快签到
    getFaskSignRequest() {
      getFaskSign().then(res => {
        this.list = res.data
      })
    },
    // 获取签到总榜
    getTopSignRequest() {
      getTopSign().then(res => {
        this.list = res.data
      })
    },
    // 分发事件
    dispatch() {
      const obj = {
        post: () => this.getHotPostListRequest(),
        comment: () => this.getHotComentListRequest(),
        sign: this.type === 0 ? () => this.getTopSignRequest() : () => this.getFaskSignRequest()
      }
      obj[this.activeBar]()
    },
    // 类型选中事件
    setType(type) {
      this.type = type
      this.list = []
      this.dispatch()
    },
    // tab点击事件
    tabClick() {
      this.list = []
      this.dispatch()
    }
  }
}
</script>

<style lang="scss" scoped>
.hot-main{
  .ctrls{
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-flow: row nowrap;
    li{
      background: #f3f3f3;
      color: #999;
      border-radius: 20px;
      height: 50px;
      line-height: 50px;
      padding: 0 40px;
      margin-right: 30px;
      margin-top: 20px;
      font-size: 26px;
      font-weight: bold;
      &.active{
        color: #02d199;
        background: rgba(2,209,153,.16);
      }
    }
  }
  .wrap{
    padding: 0 30px;
  }
}
</style>
