<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <!-- 面包屑 -->
          <ul class="fl sui-tag">
            <li class="with-x" v-if="searchParams.categoryName">{{searchParams.categoryName}}<i @click="removeCategoryName">×</i></li>
            <li class="with-x" v-if="searchParams.keyword">{{searchParams.keyword}}<i @click="removeKeyword">×</i></li>
            <li class="with-x" v-if="searchParams.trademark">{{searchParams.trademark.split(':')[1]}}<i @click="removeTrademark">×</i></li>
            <li class="with-x" v-for="(prop, index) in searchParams.props" :key="index">{{prop.split(':')[1]}}<i @click="removeProp(index)">×</i></li>
          </ul>
        </div>
        <!--selector-->
        <!-- 自定义事件 -->
        <SelectorSearch @trademarkInfo="trademarkInfo" @attrInfo="attrInfo"/>
        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <!-- 排序的结构 -->
              <ul class="sui-nav">
                <li :class="{ active: isOne }" @click="changeOrder('1')">
                  <a>综合<span v-show="isOne" class="iconfont" :class="{ 'icon-paixushang': isAsc, 'icon-paixuxia': isDesc }"></span></a>
                </li>
                <li :class="{ active: isTwo }" @click="changeOrder('2')">
                  <a>价格<span v-show="isTwo" class="iconfont" :class="{ 'icon-paixushang': isAsc, 'icon-paixuxia': isDesc }"></span></a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 销售产品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="goods in goodsList" :key="goods.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <!-- 在路由跳转的时候切记不要忘记带 id（params 参数） -->
                    <router-link :to="`/detail/${goods.id}`">
                      <img v-lazy="goods.defaultImg"/>
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{goods.price}}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a href="javascript:void(0);" :title="goods.title">{{goods.title}}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="javascript:void(0);" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered btn-danger">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <Pagination
            :pageNo="searchParams.pageNo"
            :pageSize="searchParams.pageSize"
            :total="total"
            :continues="5"
            @getPageNo="getPageNo"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import SelectorSearch from './SelectorSearch'
  import { mapGetters, mapState } from 'vuex'

  export default {
    name: 'Search',
    components: { SelectorSearch },
    data() {
      return {
        searchParams: {
          // 一级分类的 id
          category1Id: '',
          // 二级分类的 id
          category2Id: '',
          // 三级分类的 id
          category3Id: '',
          // 分类名
          categoryName: '',
          // 关键字
          keyword: '',
          // 排序：初始状态是综合|降序
          order: '1:desc',
          // 分页器用的：代表的是当前是第几页
          pageNo: 1,
          // 代表的是每一页展示数据的个数
          pageSize: 5,
          // 平台售卖属性操作带的参数
          props: [],
          // 品牌
          trademark: ''
        }
      }
    },
    // 组件挂载完毕之前执行一次
    beforeMount() {   
      // 复杂的写法
      /* this.searchParams.category1Id = this.$route.query.category1Id
      this.searchParams.category2Id = this.$route.query.category2Id
      this.searchParams.category3Id = this.$route.query.category3Id
      this.searchParams.categoryName = this.$route.query.categoryName
      this.searchParams.keyword = this.$route.params.keyword */
      // 在发送请求之前，把接口需要传递的参数进行整理（在给服务器发请求之前，把参数整理好，服务器就会返回查询的数据）
      // Object.assign:ES6 新增语法，合并对象
      Object.assign(this.searchParams, this.$route.query, this.$route.params)
    },
    // 组件挂载完毕调用函数一次，即发送一次请求
    mounted() {
      this.getData()
    },
    computed: {
      // mapGetters 里面的写法：传递的数组，因为 getters 计算没有划分模块（home search）
      ...mapGetters(['goodsList']),
      isOne() {
        return this.searchParams.order.indexOf('1') !== -1
      },
      isTwo() {
        return this.searchParams.order.indexOf('2') !== -1
      },
      isAsc() {
        return this.searchParams.order.indexOf('asc') !== -1
      },
      isDesc() {
        return this.searchParams.order.indexOf('desc') !== -1
      },
      ...mapState({
        total: (state) => {
          return state.search.searchList.total
        }
      })
    },
    methods: {
      // 向服务器发请求获取 Search 模块的数据（根据参数不同返回不同的数据进行展示）
      // 把这次请求封装成一个函数，当需要发请求的时候调用即可
      getData() {
        // 派发 action ，通知 vuex 发送请求，获取数据
        this.$store.dispatch('getSearchList', this.searchParams)
      },
      // 删除分类名字的面包屑
      removeCategoryName() {
        // 将 searchParams.categoryName 置空，即 v-if = "false" ，将分类名字的面包屑从 DOM 中删除
        this.searchParams.categoryName = ''
        // 将分类 id 置空，这样将面包屑删除后返回不传参的数据
        this.searchParams.category1Id = ''
        this.searchParams.category2Id = ''
        this.searchParams.category3Id = ''
        this.getData()
        // 地址栏也需要改：进行路由跳转（跳转到自己 Search 模块）
        // 分类名字的面包屑删除后地址栏中应该删除 query 参数，如果路径当中出现 params 参数不应该删除，路由跳转的时候应该带着
        if (this.$route.params) {
          this.$router.push({ name: 'search', params: this.$route.params })
        }
      },
      // 删除关键字的面包屑
      removeKeyword() {
        // 将 searchParams.keyword 置空，即 v-if = "false" ，将关键字的面包屑从 DOM 中删除
        this.searchParams.keyword = ''
        // 再次发送请求
        this.getData()
        // 当关键字的面包屑删除后，需要清除兄弟组件（Header 组件）中的 keyword（这里用到全局事件总线）
        // 通知兄弟组价（Header 组件）清除 keyword
        this.$bus.$emit('clear')
        // 地址栏也需要改：进行路由跳转（跳转到自己 Search 模块）
        // 关键字的面包屑删除后地址栏中应该删除 params 参数，如果路径当中出现 query 参数不应该删除，路由跳转的时候应该带着
        if (this.$route.query) {
          this.$router.push({ name: 'search', query: this.$route.query})
        }
      },
      // 删除品牌的面包屑
      removeTrademark() {
        // 将 searchParams.trademark 置空，即 v-if = "false" ，将品牌的面包屑从 DOM 中删除
        this.searchParams.trademark = ''
        // 再次发送请求
        this.getData()
      },
      // 删除售卖属性的面包屑
      removeProp(index) {
        this.searchParams.props.splice(index, 1)
        // 再次发送请求
        this.getData()
      },
      // 自定义事件的回调
      trademarkInfo(trademark) {
        // 整理品牌字段的参数，品牌: "ID:品牌名称"
        this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}` // 模板字符串
        // 再次发送请求
        this.getData()
      },
      // 自定义事件的回调
      attrInfo(attr, attrValue) {
        // 整理参数格式 ["属性ID:属性值:属性名"]
        let prop = `${attr.attrId}:${attrValue}:${attr.attrName}`
        // 数组去重
        // if (this.searchParams.props.indexOf(prop) === -1) this.searchParams.props.push(prop)
        if (!this.searchParams.props.includes(prop)) this.searchParams.props.push(prop)
        // 再次发送请求
        this.getData()
      },
      // 排序的操作
      // flag：是一个标记，代表用户点击的是综合（1）还是价格（2），1、2 是用户点击的时候传递进来的
      changeOrder(flag) {
        // order 起始的状态
        let originOrder = this.searchParams.order
        let originFlag = originOrder.split(':')[0]
        let originSort = originOrder.split(':')[1]
        // 准备一个新的 order 属性值
        let newOrder = ''
        // 点击的是综合
        if (flag === originFlag) {
          newOrder = `${originFlag}:${originSort === 'desc' ? 'asc' : 'desc'}`
        } else {
          // 点击的是价格
          newOrder = `${flag}:${'desc'}`
        }
        // 将新的 order 赋予 searchParams
        this.searchParams.order = newOrder
        // 再次发送请求
        this.getData()
      },
      // 自定义事件的回调函数（获取当前第几页）
      getPageNo(pageNo) {
        // 整理带给服务器参数
        this.searchParams.pageNo = pageNo
        // 再次发送请求
        this.getData()
      }
    },
    // 数据监听：监听组件实例身上的属性的属性值变化
    watch: {
      // 监听路由的信息是否发生变化
      $route(newValue, oldValue) {
        // 每一次请求完毕，应该把相应的一、二、三级分类的 id 置空，让它接收下一次相应的一、二、三级分类的 id
        this.searchParams.category1Id = ''
        this.searchParams.category2Id = ''
        this.searchParams.category3Id = ''
        // 再次发送请求之前整理带给服务器的参数
        Object.assign(this.searchParams, this.$route.query, this.$route.params)
        // 再次发送请求
        this.getData()
      }
    }
  }
</script>

<style scoped lang="less">
  .main {
    margin: 10px 0;
    .py-container {
      width: 1200px;
      margin: 0 auto;
      .bread {
        margin-bottom: 5px;
        overflow: hidden;
        .sui-breadcrumb {
          padding: 3px 15px;
          margin: 0;
          font-weight: 400;
          border-radius: 3px;
          float: left;
          li {
            display: inline-block;
            line-height: 18px;
            a {
              color: #666;
              text-decoration: none;
              &:hover {
                color: #4cb9fc;
              }
            }
          }
        }
        .sui-tag {
          margin-top: -5px;
          list-style: none;
          font-size: 0;
          line-height: 0;
          padding: 5px 0 0;
          margin-bottom: 18px;
          float: left;
          .with-x {
            font-size: 12px;
            margin: 0 5px 5px 0;
            display: inline-block;
            overflow: hidden;
            color: #000;
            background: #f7f7f7;
            padding: 0 7px;
            height: 20px;
            line-height: 20px;
            border: 1px solid #dedede;
            white-space: nowrap;
            transition: color 400ms;
            cursor: pointer;
            i {
              margin-left: 10px;
              cursor: pointer;
              font: 400 14px tahoma;
              display: inline-block;
              height: 100%;
              vertical-align: middle;
            }
            &:hover {
              color: #28a3ef;
            }
          }
        }
      }
      .details {
        margin-bottom: 5px;
        .sui-navbar {
          overflow: visible;
          margin-bottom: 0;
          .filter {
            min-height: 40px;
            padding-right: 20px;
            background: #fbfbfb;
            border: 1px solid #e2e2e2;
            padding-left: 0;
            border-radius: 0;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);
            .sui-nav {
              position: relative;
              left: 0;
              display: block;
              float: left;
              margin: 0 10px 0 0;
              li {
                float: left;
                line-height: 18px;
                a {
                  display: block;
                  cursor: pointer;
                  padding: 11px 15px;
                  color: #777;
                  text-decoration: none;
                }
                &.active {
                  a {
                    background: skyblue;
                    color: #fff;
                  }
                }
              }
            }
          }
        }
        .goods-list {
          margin: 20px 0;
          ul {
            display: flex;
            flex-wrap: wrap;
            li {
              height: 100%;
              width: 20%;
              margin-top: 10px;
              line-height: 28px;
              .list-wrap {
                .p-img {
                  padding-left: 15px;
                  width: 215px;
                  height: 255px;
                  a {
                    color: #666;
                    img {
                      max-width: 100%;
                      height: auto;
                      vertical-align: middle;
                    }
                  }
                }
                .price {
                  padding-left: 15px;
                  font-size: 18px;
                  color: skyblue;
                  strong {
                    font-weight: 700;
                    i {
                      margin-left: -5px;
                    }
                  }
                }
                .attr {
                  padding-left: 15px;
                  width: 85%;
                  overflow: hidden;
                  margin-bottom: 8px;
                  min-height: 38px;
                  cursor: pointer;
                  line-height: 1.8;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;
                  a {
                    color: #333;
                    text-decoration: none;
                  }
                }
                .commit {
                  padding-left: 15px;
                  height: 22px;
                  font-size: 13px;
                  color: #a7a7a7;
                  span {
                    font-weight: 700;
                    color: #646fb0;
                  }
                }
                .operate {
                  padding: 12px 15px;
                  .sui-btn {
                    display: inline-block;
                    padding: 2px 14px;
                    box-sizing: border-box;
                    margin-bottom: 0;
                    font-size: 12px;
                    line-height: 18px;
                    text-align: center;
                    vertical-align: middle;
                    cursor: pointer;
                    border-radius: 0;
                    background-color: transparent;
                    margin-right: 15px;
                  }
                  .btn-bordered {
                    min-width: 85px;
                    background-color: transparent;
                    border: 1px solid #8c8c8c;
                    color: #8c8c8c;
                    &:hover {
                      text-decoration: none;
                    }
                  }
                  .btn-danger {
                    border: 1px solid skyblue;
                    color: #fff;
                    background-color: skyblue;
                    &:hover {
                      text-decoration: none;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
</style>