<template>
  <div class="home">
    <Layout>
      <van-search
        ref="search"
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
      />
      <van-tabs v-model="currentTab" type="line" border sticky @click="tabClick">
        <van-tab name="index" title="首页">
          <van-pull-refresh v-if="currentTab === 'index'" v-model="refreshing" @refresh="onRefresh">
            <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
            >
              <ListItem v-for="item in contentListData" :key="item._id" :data="item" />
            </van-list>
          </van-pull-refresh>
        </van-tab>
        <van-tab name="ask" title="提问">
          <van-pull-refresh v-if="currentTab === 'ask'" v-model="refreshing" @refresh="onRefresh">
            <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
            >
              <ListItem v-for="item in contentListData" :key="item._id" :data="item" />
            </van-list>
          </van-pull-refresh>
        </van-tab>
        <van-tab name="suggest" title="建议">
          <van-pull-refresh v-if="currentTab === 'suggest'" v-model="refreshing" @refresh="onRefresh">
            <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
            >
              <ListItem v-for="item in contentListData" :key="item._id" :data="item" />
            </van-list>
          </van-pull-refresh>
        </van-tab>
        <van-tab name="share" title="分享">
          <van-pull-refresh v-if="currentTab === 'share'" v-model="refreshing" @refresh="onRefresh">
            <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
            >
              <ListItem v-for="item in contentListData" :key="item._id" :data="item" />
            </van-list>
          </van-pull-refresh>
        </van-tab>
        <van-tab name="disscussion" title="讨论">
          <van-pull-refresh v-if="currentTab === 'disscussion'" v-model="refreshing" @refresh="onRefresh">
            <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
            >
              <ListItem v-for="item in contentListData" :key="item._id" :data="item" />
            </van-list>
          </van-pull-refresh>
        </van-tab>
      </van-tabs>
    </Layout>
  </div>
</template>

<script>
import { getArticleList } from '@/api/public'
import { forbidScroll } from '@/utils/forbidScroll'
export default {
  name: 'Home',
  data() {
    return {
      // 当前选中tab
      currentTab: '',
      // 搜索文本
      searchText: '',
      // 是否刷新中
      refreshing: false,
      // list是否加载中
      loading: false,
      // 是否加载完成
      finished: false,
      pageSize: 10,
      pageNum: 1,
      total: 0,
      // 列表数据
      contentListData: [],
      currentPage: 'index'
    }
  },
  mounted() {
    const ele = this.$refs.search
    forbidScroll(ele)
  },
  methods: {
    // 获取主列表文章分页数据
    getArticleListRequest() {
      this.loading = true
      getArticleList({
        type: this.currentPage,
        status: '',
        isTop: 0,
        tags: '',
        pageSize: this.pageSize,
        pageNum: this.pageNum
      }).then(res => {
        if (this.refreshing) { // 如果是已经拉到最底下 再下拉刷新
          this.contentListData = []
          this.refreshing = false
        }
        this.contentListData = [...this.contentListData, ...res.data.records]
        this.loading = false
        // 是否全部数据加载完了
        if (this.contentListData.length >= res.data.total) {
          this.finished = true
        }
        this.pageSize = res.data.pageSize
        this.pageNum = res.data.pageNum
        this.total = res.data.total
      }).catch(error => {
        this.loading = false
        console.log(error)
      })
    },
    // 搜索按钮事件
    onSearch() {
    },
    // 搜索取消按钮事件
    onCancel() {

    },
    // 下拉刷新方法
    onRefresh() {
      this.finished = false
      this.loading = true
      this.onLoad()
    },
    // 下拉加载方法
    onLoad() {
      this.getArticleListRequest()
    },
    // tabs点击事件
    tabClick(name) {
      this.refreshing = true
      this.currentPage = name
      this.getArticleListRequest()
    }
  }
}
</script>
<style lang="scss" scoped>
// .home{
//   background: #F3F6F8;
// }
</style>
