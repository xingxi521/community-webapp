import axios from 'axios'
import { notifiyError } from '@/utils/public'
import configUrl from '@/config'
import store from '@/store'
import router from '@/router'
// const CancelToken = axios.CancelToken
class HttpRequest {
  constructor (baseUrl) {
    this.baseUrl = baseUrl
    // 请求等待队列
    this.pendding = {}
  }

  // 获取config配置
  getConfig () {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': store.state.user.token ? 'bearer ' + store.state.user.token : ''
      },
      timeout: 10000
    }
    return config
  }
  // 移除请求等待队列数据
  removePending(key, isRepeat) {
    // 如果key存在证明已经发起了请求还没响应回来，因为响应回来会把key移除掉
    if (this.pendding[key] && isRepeat) {
      this.pendding[key]('取消重复的请求')
    }
    delete this.pendding[key]
  }
  // 拦截器
  interceptors (instance) {
    instance.interceptors.request.use(config => {
      // 请求的接口看是否开启mock状态
      if (config.mock || (configUrl.isMock && process.env.NODE_ENV === 'development')) {
        config.baseURL = configUrl.baseUrl.mock
      }
      if (store.state.token && !store.state.wsc) {
        // 初始化socket
        store.commit('INIT_SOCKET', {})
      }
      // const key = `${config.url}&${config.method}`
      // this.removePending(key, true)
      // config.cancelToken = new CancelToken((c) => {
      //   // 可以key理解为setInternal的创建成功返回的句柄
      //   this.pendding[key] = c
      // })
      return config
    }, error => {
      return Promise.reject(error)
    })
    // 设置请求成功后的拦截器
    const errorHandler = (status, msg) => {
      switch (status) {
        case 400:
          notifiyError('请求语法有问题，服务器无法识别')
          break
        case 401:
          notifiyError('客户端未授权该请求。缺乏有效的身份认证凭证')
          router.push({ name: 'Login' })
          store.commit('user/SET_USERINFO', {})
          store.commit('user/SET_LOGIN', false)
          store.commit('user/SET_TOKEN', '')
          break
        case 403:
          notifiyError('服务器拒绝响应。权限不足')
          break
        case 404:
          notifiyError('URL无效或者URL有效但是没有资源')
          break
        case 500:
          notifiyError(msg.msg)
          break
        default:
          notifiyError(msg)
          break
      }
    }
    instance.interceptors.response.use(res => {
      // const key = `${res.config.url}&${res.config.method}`
      // this.removePending(key)
      if (res.status === 200) {
        return Promise.resolve(res.data)
      } else {
        return Promise.reject(res)
      }
    }, error => {
      const { response } = error
      if (response) {
        errorHandler(response.status, response.data)
        return Promise.reject(error)
      } else {
        notifiyError('服务器异常，请联系技术人员！')
        return Promise.reject(error)
      }
    })
  }

  // 创建axios实例
  request (options) {
    const instance = axios.create()
    const newOptions = Object.assign(this.getConfig(), options)
    // 设置拦截器
    this.interceptors(instance)
    // 返回axios实例
    return instance(newOptions)
  }
}

export default HttpRequest
