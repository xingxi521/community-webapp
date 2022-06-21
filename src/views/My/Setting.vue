<template>
  <div>
    <NavBar
      title="修改设置"
      @clickLeft="onClickLeft"
    />
    <van-form @submit="onSubmit">
      <van-field name="uploader" label="文件上传">
        <template #input>
          <van-uploader v-model="form.pic" max-count="1" :after-read="uploadComplete" />
        </template>
      </van-field>
      <van-field
        v-model="form.nickName"
        name="昵称"
        label="昵称"
        placeholder="昵称"
        :rules="[{ required: true, message: '请填写昵称' }]"
      />
      <van-field
        v-model="form.location"
        name="城市"
        label="城市"
        placeholder="城市"
      />
      <van-field
        v-model="form.gender"
        readonly
        clickable
        name="picker"
        label="性别"
        placeholder="点击选择性别"
        @click="showPicker = true"
      />
      <van-popup v-model="showPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="genderArr"
          @confirm="onGenderPick"
          @cancel="showPicker = false"
        />
      </van-popup>
      <van-field
        v-model="form.personSign"
        name="个性签名"
        label="个性签名"
        placeholder="个性签名"
      />
      <div style="margin: 16px;">
        <van-button block type="primary" size="small" native-type="submit">确定修改</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
/**
 * 修改设置
 */
import { uploadFile } from '@/api/public'
import { updateUserInfo, getUserInfo } from '@/api/center'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'Setting',
  data() {
    return {
      form: {},
      showPicker: false,
      // 选择器值
      genderArr: ['男', '女']
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  mounted() {
    this.getUserInfo()
  },
  methods: {
    ...mapMutations('user', ['SET_USERINFO']),
    // 左边点击按钮事件
    onClickLeft() {
      this.$router.back()
    },
    // 获取用户信息
    getUserInfo() {
      getUserInfo().then(res => {
        this.form = {
          ...res.data,
          gender: res.data.gender === 0 ? '男' : '女'
        }
      })
    },
    onSubmit() {
      const params = { ...this.form }
      delete params.pic
      if (params.gender === '女') {
        params.gender = 1
      } else {
        params.gender = 0
      }
      updateUserInfo(params).then(res => {
        this.notifiySuccess(res.msg)
        this.form = res.data
        this.SET_USERINFO({
          ...this.userInfo,
          ...res.data
        })
        this.getUserInfo()
      })
    },
    // 性别选择事件
    onGenderPick(value) {
      this.form.gender = value
      this.showPicker = false
    },
    // 上传文件
    async uploadComplete(e) {
      const file = e.file
      const form = new FormData()
      form.append('file', file)
      const res = await uploadFile(form)
      const updateRes = await updateUserInfo({ ...res.data })
      this.SET_USERINFO({
        ...this.userInfo,
        ...res.data
      })
      this.notifiySuccess(updateRes.msg)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
