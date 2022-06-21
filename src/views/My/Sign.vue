<template>
  <div class="sign-main">
    <NavBar
      title="签到中心"
      @clickLeft="onClickLeft"
    />
    <div class="bg">
      <div class="able-fav"><SvgIcon icon="fav2" class-name="svg-bg" />可用积分125</div>
    </div>
    <div class="card">
      <div class="card-wrap">
        <div class="sign-text">已经连续签到 0天</div>
        <ul class="sign-bar">
          <li class="bar-item">
            <i>+10</i>
            <span>周日</span>
          </li>
          <li class="bar-item">
            <i>+10</i>
            <span>周一</span>
          </li>
          <li class="bar-item">
            <i>+10</i>
            <span>周二</span>
          </li>
          <li class="bar-item">
            <i>+10</i>
            <SvgIcon icon="check" class-name="svg-icon" />
            <span>周三</span>
            <div class="line" />
          </li>
          <li class="bar-item">
            <i>+10</i>
            <span>周四</span>
          </li>
          <li class="bar-item">
            <i>+10</i>
            <span>周五</span>
          </li>
          <li class="bar-item">
            <i>+10</i>
            <span>周六</span>
          </li>
        </ul>
        <van-button type="primary" block style="margin-top:30px;">签到</van-button>
      </div>
      <div class="card-wrap">
        <div class="sign-rule">签到规则</div>
        <p>1.“签到”可获得的社区积分。规则如下:</p>
        <table>
          <thead>
            <tr>
              <td>连续签到天数</td>
              <td>每天活动积分</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in rule" :key="item.count">
              <td>{{ item.count }}</td>
              <td>{{ item.fav }}</td>
            </tr>
          </tbody>
        </table>
        <p>2.中间若有间隔，则连续天数重新计算。</p>
        <p>3.不可复用程序自动签到，否则积分清零。</p>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 签到中心
 */
export default {
  name: 'Sign',
  data() {
    return {
      rule: [
        {
          count: '小于5天',
          fav: '5积分'
        },
        {
          count: '大于或等于5天',
          fav: '10积分'
        },
        {
          count: '大于或等于15天',
          fav: '15积分'
        },
        {
          count: '大于或等于30天',
          fav: '20积分'
        },
        {
          count: '大于或等于100天',
          fav: '30积分'
        },
        {
          count: '大于或等于365天',
          fav: '50积分'
        }
      ]
    }
  },
  methods: {
    onClickLeft() {
      this.$router.back()
    }
  }
}
</script>

<style lang="scss" scoped>
.sign-main{
  .bg{
    background-image: url('../../assets/images/my_bg@2x.png');
    background-repeat: no-repeat;
    background-size: contain;
    width: 100%;
    height: 280px;
    background-position: 0 0;
    z-index: 100;
    .able-fav{
      color: #fff;
      font-weight: bold;
      font-size: 32px;
      text-align: center;
      padding-top: 40px;
    }
    .svg-bg{
      color: #f5f794;
      font-size: 4.53333vw;
      z-index: 80;
    }
  }
  .card{
    margin: 180px auto 0 auto;
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
      position: relative;
      .sign-text{
        color: #333;
        font-weight: bold;
        font-size: 32px;
        margin-bottom: 30px;
      }
      .sign-bar{
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        .bar-item{
          display: flex;
          flex-flow: column nowrap;
          align-items: center;
          justify-content: center;
          position: relative;
          &:not(:last-child):before{
            content: "";
            position: absolute;
            width: 60px;
            height: 5px;
            background: #d4f8ee;
            left: 60px;
            top: 30px;
          }
          i{
            display: flex;
            flex-flow: column nowrap;
            justify-content: center;
            align-items: center;
            color: #02d199;
            font-size: 24px;
            font-style: normal;
            border-radius: 50%;
            width: 60px;
            height: 60px;
            background: #d4f8ee;
            position: relative;
            z-index: 0;
          }
          span{
            color: #777;
            font-size: 24px;
            margin-top: 15px;
          }
          .svg-icon{
            color: #02d199;
            position: absolute;
            font-size: 45px;
            top: 8px;
            z-index: 60;
          }
          .line{
            position: absolute;
            width: 60px;
            height: 5px;
            background: #02d199;
            right: 45px;
            top: 30px;
            z-index: 80;
          }
        }
      }
      .sign-rule{
        text-align: center;
        font-weight: bold;
        font-size: 32px;
      }
      table{
        width: 100%;
        line-height: 80px;
        border-collapse: collapse;
        border: 1px solid #e6e6e6;
        color: #666;
        thead{
          background: #f6f6f6;
        }
        td{
          width: 50%;
          text-align: center;
        }
      }
    }
  }
}
</style>
