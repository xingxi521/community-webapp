import { createEnum } from '@/utils/public'
// 文章类型 枚举
export const ARTICLE_TYPE = createEnum({
  ASK: ['ask', '提问'],
  SHARE: ['share', '分享'],
  DISSCUSS: ['disscussion', '讨论'],
  SUGGEST: ['suggest', '建议'],
  NOTICE: ['notice', '公告'],
  DYNMATIC: ['dynamic', '动态']
})

// 文章是否完结
export const END_TYPE = createEnum({
  OPEN: [0, '未结'],
  CLOSE: [1, '已结']
})
