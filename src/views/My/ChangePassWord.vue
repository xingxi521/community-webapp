<template>
  <div>
    <NavBar
      title="修改密码"
      @clickLeft="onClickLeft"
    />
    <van-form @submit="onSubmit">
      <van-field
        v-model="form.passWord"
        name="旧密码"
        label="旧密码"
        placeholder="旧密码"
        :rules="[{ required: true, message: '请填写旧密码' }]"
      />
      <van-field
        v-model="form.newPassword"
        type="password"
        name="新密码"
        label="新密码"
        placeholder="新密码"
        :rules="[{ required: true, message: '请填写新密码' }]"
      />
      <van-field
        v-model="form.confirmPassword"
        type="password"
        name="确认密码"
        label="确认密码"
        placeholder="确认密码"
        :rules="[{ required: true, message: '请填写确认密码' }]"
      />
      <div style="margin: 16px;">
        <van-button block type="primary" size="small" native-type="submit">确定修改</van-button>
        <van-button block type="default" size="small" style="margin-top:10px;" @click="onClickLeft">取消</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
/**
 * 修改密码
 */
import { updatePassWord } from '@/api/center'
export default {
  name: 'ChangePassWord',
  data() {
    return {
      form: {
        passWord: '',
        newPassword: '',
        confirmPassword: ''
      }
    }
  },
  methods: {
    onSubmit() {
      if (this.form.newPassword !== this.form.confirmPassword) {
        this.notifiyWarning('您输入的两次新密码不一致，请重新输入！')
        return
      }
      updatePassWord(this.form).then(res => {
        this.notifiySuccess(res.msg)
        this.form.passWord = ''
        this.form.newPassword = ''
        this.form.confirmPassword = ''
      })
    },
    // 左边点击按钮事件
    onClickLeft() {
      this.$router.back()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
