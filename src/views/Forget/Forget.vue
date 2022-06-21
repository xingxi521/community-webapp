<template>
  <div>
    <NavBar title="忘记密码" @clickLeft="clickLeftHandler" />
    <van-form @submit="onSubmit">
      <van-field
        v-model="form.userName"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        left-icon="manager"
        :rules="[{ required: true, message: '请填写用户名' }]"
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
        <span @click="goToRegister">注册</span>
      </div>
      <div style="margin: 16px;">
        <van-button block type="primary" size="small" native-type="submit">确定发送</van-button>
        <van-button block type="default" size="small" style="margin-top:10px;" @click="cancelHandler">取消</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
/**
 * 忘记密码
 */
import { forgetPassword } from '@/api/login'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'Forget',
  data() {
    return {
      form: {
        userName: '',
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
    // 取消按钮事件
    cancelHandler() {
      this.$router.push({
        name: 'Register'
      })
    },
    // 已有账号按钮事件
    hasAccount() {
      this.$router.push({
        name: 'Login'
      })
    },
    // 注册按钮事件
    goToRegister() {
      this.$router.push({
        name: 'Register'
      })
    },
    // 返回按钮事件
    clickLeftHandler() {
      this.$router.back()
    },
    // 确认发送按钮事件
    onSubmit() {
      forgetPassword({
        userName: this.form.userName,
        captcha: this.form.captcha,
        uid: this.uid
      }).then(res => {
        this.notifiySuccess(res.msg)
      })
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
