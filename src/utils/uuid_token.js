import { v4 as uuidv4 } from 'uuid'

// 要生成一个随机字符串，且每次执行不能发生变化，游客身份持久存储
export const getUUID = () => {
  // 先从本地存储获取 uuid ，看一下本地存储里是否有 uuid
  let uuid_token = localStorage.getItem('UUIDTOKEN')
  // 如果本地存储里面没有，返回 null => false
  if (!uuid_token) {
    // 生成游客临时身份 uuid
    uuid_token = uuidv4()
    // 将生成的 uuid 存储一次
    localStorage.setItem('UUIDTOKEN', uuid_token)
  }
  // 将生成的 uuid 返回到 detail 小仓库中，切记要有返回值，没有返回值返回的是 undefined
  return uuid_token
}