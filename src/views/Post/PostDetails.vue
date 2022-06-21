<template>
  <div class="details-mian">
    <van-nav-bar
      :title="barTitle"
      left-text="返回"
      left-arrow
      fixed
      placeholder
      z-index="500"
      @click-left="onClickLeft"
    />
    <div class="details-head">{{ postData.title }}</div>
    <div class="details-info">
      <div v-if="postData && postData.userInfo" class="info-top">
        <img :src="env === 'development' ? config.baseUrl.dev + postData.userInfo.pic : config.baseUrl.prod + postData.userInfo.pic" alt="">
        <div class="top-right">
          <div class="name">{{ postData && postData.userInfo && postData.userInfo.nickName ? postData.userInfo.nickName : '' }}</div>
          <div class="time">{{ formatCreateTime(postData.createTime) }}</div>
        </div>
      </div>
      <div class="info-content" v-html="postData.content" />
      <div class="info-bottom">
        {{ postData.read }} 阅读
      </div>
    </div>
    <div class="details-comment">
      <CommentItem v-for="item in commentList" :key="item._id" :item="item" :post-data="postData" />
    </div>
    <!-- 评论操作区 -->
    <div class="details-bottom">
      <span class="bottom-input" @click="show = true">
        <SvgIcon icon="advice" class-name="advice-svg" />
        <span>写评论...</span>
      </span>
      <div class="bottom-right">
        <div class="comment-box" @click="collectHandler">
          <SvgIcon icon="shoucang" class-name="comment-icon" />
          <span>{{ postData.isCollect ? '取消收藏' : '收藏' }}</span>
        </div>
      </div>
      <van-popup v-model="show" position="bottom">
        <div style="padding: 10px;">
          <textarea v-model="commentContent" rows="2" placeholder="请输入评论留言" class="van-field__control comment-textarea" />
          <div style="text-align:right;"><van-button type="info" size="small" style="width: 100%;" @click="submitComment">提交评论</van-button></div>
        </div>
      </van-popup>
    </div>
  </div>
</template>

<script>
/**
 * 文章详情
 */
import { getPostDetails } from '@/api/public'
import { formatCreateTime } from '@/utils/public'
import { getCommentList, addComment } from '@/api/comment'
import { mapState } from 'vuex'
import { collectPost } from '@/api/post'
import config from '@/config'
export default {
  name: 'PostDetails',
  components: {
    CommentItem: () => import('@/components/CommentItem/CommentItem')
  },
  data() {
    return {
      config,
      env: process.env.NODE_ENV,
      // tabBar标题
      barTitle: '文章详情',
      // 文章详情
      postData: {},
      total: 0,
      pageNum: 1,
      pageSize: 10,
      // 评论数据
      commentList: [],
      show: false,
      // 评论内容
      commentContent: ''
    }
  },
  computed: {
    ...mapState('user', ['userInfo', 'isLogin'])
  },
  watch: {
    postData: {
      handler() {
        // 解决文章数据异步获取还没成功就先获取文章评论 导致评论取不到的问题
        this.getCommentListRequest()
      },
      deep: true
    }
  },
  mounted() {
    this.getPostDetailsRequest()
    this.getCommentListRequest()
  },
  methods: {
    // 获取文章评论数据
    getCommentListRequest() {
      // if (!this.postData._id) return
      getCommentList({
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        tid: this.postData._id
      }).then(res => {
        this.commentList = res.data.records
        this.total = res.data.total
      })
    },
    // 获取文章详情数据
    getPostDetailsRequest() {
      getPostDetails({
        tid: this.$route.params.id
      }).then(res => {
        this.postData = res.data
      })
    },
    formatCreateTime(time) {
      return formatCreateTime(time)
    },
    // 返回按钮事件
    onClickLeft() {
      this.$router.push({
        name: 'Home'
      })
    },
    // 提交评论事件
    submitComment() {
      if (!this.commentContent) {
        this.notifiyWarning('请先输入评论内容！')
      } else {
        addComment({
          content: this.commentContent,
          tid: this.postData._id,
          cuid: this.postData.userInfo._id
        }).then(res => {
          const result = res.data
          result.uid = {
            pic: this.userInfo.pic,
            role: this.userInfo.role,
            nickName: this.userInfo.nickName,
            vip: this.userInfo.vip,
            _id: this.userInfo._id
          }
          result.children = []
          this.commentList.unshift(result)
          this.commentContent = ''
          this.notifiySuccess('评论成功！')
        }).catch(error => {
          console.log('🚀 ~ file: PostDetails.vue ~ line 148 ~ submitComment ~ error', error)
        })
      }
    },
    // 收藏帖子按钮事件
    collectHandler() {
      if (!this.isLogin) {
        this.$pop('shake', '请先登录')
      } else {
        collectPost({
          tid: this.postData._id
        }).then(res => {
          this.notifiySuccess(res.msg)
          this.postData.isCollect = !this.postData.isCollect
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.details-mian{
  .details-head{
    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1);
    margin: 0 0 5px 0;
    font-size: 34px;
    color: #333;
    padding: 0 40px;
    line-height: 90px;
    z-index: 200;
    position: relative;
  }
  .details-info{
    padding: 20px 40px;
    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1);
    .info-top{
      display: flex;
      img{
        width: 64px;
        height: 64px;
        border-radius: 50%;
      }
      .top-right{
        margin-left: 20px;
        .name{
          font-size: 30px;
          color: #333;
          margin: 5px 0;
        }
        .time{
          color: #999;
          font-size: 20px;
        }
      }
    }
    .info-bottom{
      margin-top: 20px;
      color: #ccc;
      font-size: 26px;
    }
  }
  .details-comment{
    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1);
    margin: 10px 0 60px 0;
  }
  .details-bottom{
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 80px;
    line-height: 80px;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.2);
    z-index: 10;
    background: #fff;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .bottom-input{
      background-color: #f3f3f3;
      flex: 1;
      display: flex;
      align-items: center;
      border-radius: 40px;
      color: #ccc;
      font-size: 30px;
      height: 60px;
      margin: 0 0 0 20px;
      .advice-svg{
        margin: 0 20px;
      }
    }
    .bottom-right{
      width: 100px;
      .comment-box{
        display: flex;
        flex-direction: column;
        align-items: center;
        span{
          font-size: 16px;
          height: 40px;
          line-height: 40px;
        }
      }
    }
    .comment-textarea{
      border: 1px solid #f5f5f5;
      padding: 0 15px;
      background: #f9f9f9;
    }
  }
}
</style>
