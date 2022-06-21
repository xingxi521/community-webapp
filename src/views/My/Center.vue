<template>
  <div class="center-main">
    <div class="bg" />
    <div class="card">
      <div class="card-wrap">
        <img src="https://toimc-public.obs.cn-east-3.myhuaweicloud.com/123@qq.com/2022-02-20/d469c871-e38b-4421-accb-322e9f85e299-QQ%E6%88%AA%E5%9B%BE20220220185522.png" alt="">
        <div class="circle" />
        <div class="nick-name">CoderX</div>
        <div class="desc">这家伙很懒，什么也没有留下。</div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 个人主页
 */
export default {
  name: 'Center'
}
</script>

<style lang="scss" scoped>
.center-main{
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
    margin: 100px auto 0 auto;
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
      padding: 60px 0;
      position: relative;
      img{
        width: 100px;
        height: 100px;
        border-radius: 50%;
        position: absolute;
        left: 43%;
        top: -50px;
        // &::after{
        //   content: "";
        //   position: absolute;
        //   width: 110px;
        //   height: 110px;
        //   background: #fff;
        //   border-radius: 50%;
        //   top: 43%;
        //   left: -50%;
        //   z-index: -1;
        // }
      }
      .circle{
        width: 120px;
        height: 120px;
        border-radius: 50%;
        position: absolute;
        left: 41.5%;
        top: -56px;
        background: #fff;
        z-index: -1;
      }
      .nick-name{
        text-align: center;
        color: #333;
        font-weight: bold;
        font-size: 32px;
        margin-bottom: 30px;
      }
      .desc{
        color: #999;
        text-align: center;
        font-size: 26px;
      }
    }
  }
}
</style>
