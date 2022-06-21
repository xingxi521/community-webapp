<template>
  <div class="login-main">
    <NavBar title="登录" @clickLeft="clickLeftHandler" />
    <div class="logo">
      <img src="../../assets/images/logo.png" alt="">
    </div>
    <van-form label-width="50" @submit="onSubmit">
      <van-field
        v-model="form.userName"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        left-icon="manager"
        :rules="[
          { required: true, message: '请填写用户名(邮箱)' }
        ]"
      />
      <van-field
        v-model="form.passWord"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        left-icon="lock"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <van-field
        v-model="form.captcha"
        center
        clearable
        label="验证码"
        placeholder="请输入验证码"
        left-icon="photo"
        :rules="[{ required: true, message: '请填写验证码' }]"
      >
        <template #button>
          <div class="captcha" @click="getCaptchaRequest" v-html="captchaSvg" />
        </template>
      </van-field>
      <div class="action">
        <span @click="registerHandler">注册</span>
        <span @click="forgetHandler">忘记密码</span>
      </div>
      <div style="margin: 16px;">
        <van-button block type="primary" size="small" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
/**
 * 登录页面
 */
import { mapActions } from 'vuex'
export default {
  name: 'Login',
  data() {
    return {
      // 表单
      form: {
        userName: '',
        passWord: '',
        captcha: ''
      },
      captchaSvg: ''
    }
  },
  mounted() {
    this.getCaptchaRequest()
  },
  methods: {
    ...mapActions('user', ['login', 'getCaptcha']),
    // 获取验证码
    getCaptchaRequest() {
      this.getCaptcha().then(res => {
        this.captchaSvg = res
      })
    },
    // 导航左边点击事件
    clickLeftHandler() {
      this.$router.push({
        name: 'Home'
      })
    },
    // 表单提交事件
    onSubmit() {
      this.login(this.form).then(() => {
        this.$router.push({
          name: 'Home'
        })
      })
    },
    // 注册按钮事件
    registerHandler() {
      this.$router.push({
        name: 'Register'
      })
    },
    // 忘记密码按钮事件
    forgetHandler() {
      this.$router.push({
        name: 'Forget'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login-main{
  .logo{
   text-align: center;
   padding: 100px 0;
   img{
    margin-left: 60px;
   }
  }
  .action{
    display: flex;
    justify-content: space-between;
    padding: 0 30px;
    margin-top: 20px;
    span{
      color: #999;
      font-size: 26px;
    }
  }
  .captcha{
    height: 50px;
    ::v-deep{
      svg{
        position: relative;
        top: -30px;
      }
    }
  }
}
</style>
