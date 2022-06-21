<template>
  <div class="register-main">
    <NavBar title="注册" @clickLeft="clickLeftHandler" />
    <van-form @submit="onSubmit">
      <van-field
        v-model="form.userName"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        left-icon="manager"
        :rules="[
          { required: true, message: '请填写用户名' },
          { pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/ , message: '请填写正确的邮箱格式' }
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
        v-model="form.nickName"
        name="昵称"
        label="昵称"
        placeholder="昵称"
        left-icon="smile"
        :rules="[{ required: true, message: '请填写昵称' }]"
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
        <span @click="hasAccount">已有账号</span>
        <span>忘记密码</span>
      </div>
      <div style="margin: 16px;">
        <van-button block type="primary" size="small" native-type="submit">注册</van-button>
        <van-button block type="default" size="small" style="margin-top:10px;" @click="cancelHandler">取消</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
/**
 * 注册页面
 */
import { register } from '@/api/login'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'Register',
  data() {
    return {
      form: {
        userName: '',
        passWord: '',
        captcha: ''
      },
      captchaSvg: ''
    }
  },
  computed: {
    ...mapState('user', ['uid'])
  },
  mounted() {
    this.getCaptchaRequest()
  },
  methods: {
    ...mapActions('user', ['getCaptcha']),
    // 获取验证码
    getCaptchaRequest() {
      this.getCaptcha().then(res => {
        this.captchaSvg = res
      })
    },
    // 提交按钮事件
    onSubmit() {
      register({
        userName: this.form.userName,
        passWord: this.form.passWord,
        nickName: this.form.nickName,
        captcha: this.form.captcha,
        uid: this.uid
      }).then(res => {
        this.notifiySuccess(res.msg)
        this.$router.push({
          name: 'Login'
        })
      })
    },
    // 取消按钮事件
    cancelHandler() {
      this.$router.push({
        name: 'Login'
      })
    },
    // 已有账号按钮事件
    hasAccount() {
      this.$router.push({
        name: 'Login'
      })
    },
    // 返回按钮事件
    clickLeftHandler() {
      this.$router.back()
    }
  }
}
</script>

<style lang="scss" scoped>
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
      width: 280px;
    }
  }
}
</style>
