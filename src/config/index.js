export default {
  // 请求地址设置
  baseUrl: {
    dev: 'http://192.168.0.105:3000/',
    prod: 'http://82.157.55.15:3000/',
    mock: 'https://www.fastmock.site/mock/2f572a6975b9cc96b054aba2fa94c30f/api/'
  },
  // 是否开启全局mock状态
  isMock: false,
  // 本地存储命名空间
  stroageSpace: 'community-webapp',
  // webSocket链接地址设置
  socketUrl: {
    dev: 'ws://127.0.0.1:3001',
    prod: 'ws://82.157.55.15:3001'
  }
}
