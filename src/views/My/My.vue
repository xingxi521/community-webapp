<template>
  <div class="my-main">
    <div class="bg" />
    <div class="card">
      <div class="card-wrap">
        <div class="card-top">
          <img v-show="userData.pic" :src="env === 'development' ? config.baseUrl.dev + userData.pic : config.baseUrl.prod + userData.pic" alt="">
          <div class="user-info">
            <div style="margin-bottom:5px;">{{ userData.nickName }}</div>
            <div class="fav"><SvgIcon icon="fav2" />积分{{ userData.favs }}</div>
          </div>
          <span class="user-center" @click="goToCenter">个人主页></span>
        </div>
        <div class="card-bottom">
          <div class="my-post">
            <div>0</div>
            <div>我的帖子</div>
          </div>
          <div class="my-collect">
            <div>0</div>
            <div>我的收藏</div>
          </div>
          <div class="my-recently">
            <div>0</div>
            <div>最近浏览</div>
          </div>
        </div>
      </div>
    </div>
    <div class="center-wrap">
      <ul class="item-list">
        <li v-for="item in itemList" :key="item.icon" @click="jumpHandler(item)">
          <i :class="item.icon" />
          <span>{{ item.title }}</span>
        </li>
      </ul>
    </div>
    <!-- 底部导航 -->
    <TabBar />
  </div>
</template>

<script>
import { getUserInfo } from '@/api/center'
import config from '@/config'
export default {
  name: 'My',
  data() {
    return {
      config,
      env: process.env.NODE_ENV,
      // 功能icon列表
      itemList: [
        {
          title: '我的帖子',
          icon: 'icon-teizi'
        },
        {
          title: '修改设置',
          icon: 'icon-setting',
          name: 'Setting'
        },
        {
          title: '修改密码',
          icon: 'icon-lock2',
          name: 'ChangePassWord'
        },
        {
          title: '签到中心',
          icon: 'icon-qiandao',
          name: 'Sign'
        }
      ],
      // 用户数据
      userData: {}
    }
  },
  mounted() {
    this.getUserInfo()
  },
  methods: {
    // 获取用户信息
    getUserInfo() {
      getUserInfo().then(res => {
        this.userData = res.data
      })
    },
    // 跳转个人主页
    goToCenter() {
      this.$router.push({
        name: 'Center'
      })
    },
    // 跳转事件
    jumpHandler(item) {
      this.$router.push({
        name: item.name
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.my-main{
  .bg{
    background-image: url('../../assets/images/my_bg@2x.png');
    background-repeat: no-repeat;
    background-size: contain;
    width: 100%;
    height: 280px;
    background-position: 0 0;
    z-index: 100;
  }
  .card{
    padding: 30px;
    width: 100%;
    height: 280px;
    position: absolute;
    left: 0;
    top: 0;
    box-sizing: border-box;
    z-index: 100;
    .card-wrap{
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
      background: #fff;
      border-radius: 10px;
      padding: 30px;
      .card-top{
        display: flex;
        align-items: center;
        img{
          width: 100px;
          height: 100px;
          border-radius: 50%;
        }
        .user-info{
          flex: 1;
          padding-left: 30px;
          .fav{
            background: rgba(2,209,153,.16);
            display: inline-block;
            padding: 10px 10px;
            border-radius: 8px;
            color: #02d199;
            font-size: 16px;
            svg{
              font-size: 23px;
              margin-right: 5px;
            }
          }
        }
        .user-center{
          color: #999;
          font-size: 20px;
        }
      }
      .card-bottom{
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin: 50px 0 30px 0;
        .my-post,.my-collect,.my-recently{
          text-align: center;
          color: #999;
          position: relative;
          &::after{
            content: '';
            position: absolute;
            right: -38px;
            top: 10px;
            height: 60px;
            width: 1px;
            background: #ddd;
          }
        }
        .my-recently{
          &::after{
            content: '';
            width: 0;
          }
        }
      }
    }
  }
  .center-wrap{
    background: #f6f5f8;
    width: 100%;
    height: 100%;
    position: fixed;
    .item-list{
      background: #fff;
      display: flex;
      flex-flow: wrap;
      padding-top: 100px;
      li{
        width: 25%;
        text-align: center;
        margin-bottom: 30px;
        span{
          font-size: 26px;
        }
        i{
          display: block;
          margin: 0 auto;
          font-size: 30px;
          width: 60px;
          height: 60px;
          margin-bottom: 20px;
          color: #888;
          background-size: contain;
        }
        .icon-teizi {
          background-image: url(~@/assets/images/teizi@2x.png);
        }
        .icon-setting {
          background-image: url(~@/assets/images/setting@2x.png);
        }
        .icon-lock2 {
          background-image: url(~@/assets/images/lock2@2x.png);
        }
        .icon-qiandao {
          background-image: url(~@/assets/images/qiandao@2x.png);
        }
        .icon-record {
          background-image: url(~@/assets/images/record@2x.png);
        }
        .icon-jiangbei {
          background-image: url(~@/assets/images/jiangbei@2x.png);
        }
        .icon-question {
          background-image: url(~@/assets/images/question@2x.png);
        }
        .icon-share {
          background-image: url(~@/assets/images/share@2x.png);
        }
        .icon-taolun {
          background-image: url(~@/assets/images/taolun@2x.png);
        }
        .icon-advise {
          background-image: url(~@/assets/images/advice@2x.png);
        }
      }
    }
  }
}
</style>
