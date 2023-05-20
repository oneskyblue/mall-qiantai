// 引入 mockjs 模块
import Mock from 'mockjs'
// 把 json 格式数据引入进来
// json 格式数据没有对外暴露，但是可以引入，因为 webpack 默认对外暴露：图片、json 格式数据
import banner from './banner.json'
import floor from './floor.json'

// mock 方法：第一个参数为请求地址，第二个参数为请求数据
Mock.mock("/mock/banner", { code: 200, data: banner })
Mock.mock("/mock/floor", { code: 200, data: floor })