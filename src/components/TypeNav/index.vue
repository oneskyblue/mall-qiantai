<template>
  <div class="type-nav">
    <div class="container">
      <!-- 事件委派 -->
      <div @mouseleave="leaveShow" @mouseenter="enterShow">
        <h2 class="all">商品分类</h2>
        <!-- 过渡动画 -->
        <transition name="sort">
          <!-- 三级联动 -->
          <div class="sort" v-show="show">
            <!-- 利用事件委派 + 编程式导航实现路由跳转与传递参数 -->
            <div class="all-sort-list2" @click="goSearch">
              <div class="item" v-for="(c1, index) in categoryList" :key="c1.categoryId" :class="{ cur: currentIndex === index }">
                <!-- 一级分类 -->
                <h3 @mouseenter="changeIndex(index)">
                  <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{ c1.categoryName }}</a>
                </h3>
                <!-- 二级、三级分类 -->
                <div class="item-list clearfix" :style="{ display: currentIndex === index ? 'block' : 'none' }">
                  <div class="subitem" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                    <dl class="fore">
                      <dt>
                        <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{ c2.categoryName }}</a>
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{ c3.categoryName }}</a>
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="javascript:void(0);">推荐</a>
        <a href="javascript:void(0);">七折抢购</a>
        <a href="javascript:void(0);">男装</a>
        <a href="javascript:void(0);">女装</a>
        <a href="javascript:void(0);">美妆</a>
        <a href="javascript:void(0);">电器</a>
        <a href="javascript:void(0);">新品</a>
        <a href="javascript:void(0);">特卖</a>
        <a href="javascript:void(0);">团购</a>
      </nav>
    </div>
  </div>
</template>

<script>
  import { mapState } from "vuex"
  // 按需引入 lodash 中的节流函数
  import throttle from "lodash/throttle";

  export default {
    name: "TypeNav",
    data() {
      return {
        currentIndex: -1,
        show: true
      }
    },
    // 组件挂载完毕
    mounted() {
      // 当组件挂载完毕，如果不是 Home 路由组件，让 show 属性变为 false ，将 TypeNav 隐藏
      if (this.$route.path !== "/home") {
        this.show = false
      }
    },
    computed: {
      ...mapState({
        // 对象写法：右侧需要的是一个函数，当使用这个计算属性的时候，右侧函数会立即执行一次
        // 注入一个参数 state ，其实即为大仓库中的数据
        categoryList: (state) => {
          return state.home.categoryList
        }
      })
    },
    methods: {
      // 正常情况（用户慢慢的操作）：鼠标进入，每一个一级分类 h3 ，都会触发鼠标进入事件
      // 非正常情况下（用户操作很快）：本身全部的一级分类都应该触发鼠标进入事件，但是经过测试，只有部分 h3 触发了
      // 就是由于用户行为过快，导致浏览器反应不过来。如果当前回调函数中有一些大量业务，有可能出现卡顿现象
      /* changeIndex(index) {
        this.currentIndex = index
        console.log('鼠标进入' + index)
      }, */
      // 节流：在规定的间隔时间范围内不会重复触发回调，只有大于这个时间间隔才会触发回调，把频繁触发变为少量触发
      changeIndex: throttle(function (index) {
        this.currentIndex = index
        // console.log('鼠标进入' + index)
      }, 50),
      // 进行路由跳转的方法
      goSearch(event) {
        // 最好的解决办法：编程式导航 + 事件委派
        // 利用事件委派存在一些问题：事件委派是把全部的子节点（h3、a、dt、dl）的事件委派给父亲节点，怎么确定点击的是 a 标签
        // 存在的另一个问题：即使能确定点击的是 a 标签，如何区分是一级、二级、三级分类的 a 标签

        // 第一个问题：把子节点当中的 a 标签，加上自定义属性 data-categoryName，其余的子节点是没有的
        // 第二个问题：把一级、二级、三级分类的 a 标签，分别加上自定义属性 data-category1Id data-category2Id data-category3Id
        let element = event.target
        // 节点有一个属性 dataset 属性，可以获取节点的自定义属性和属性值
        let { categoryname, category1id, category2id, category3id } = element.dataset
        // 如果标签身上拥有 categoryName 一定是 a 标签
        if (categoryname) {
          // 整理路由跳转的参数
          let location = { name: "search" }
          let query = { categoryName: categoryname }
          // 一级、二级、三级分类的 a 标签
          if (category1id) {
            query.category1Id = category1id
          } else if (category2id) {
            query.category2Id = category2id
          } else if (category3id) {
            query.category3Id = category3id
          }
          // 整理参数 location = { name: 'search', query }
          location.query = query // 此时 location = { name: 'search', query }
          // 跳转到 Search 路由如果带有 params 参数，将 params 参数也传递给 Search 路由（合并参数）
          if (this.$route.params) {
            location.params = this.$route.params // 此时 location = { name: 'search', query, params }
          }
          this.$router.push(location)
        }
      },
      // 鼠标移入全部商品分类显示列表
      enterShow() {
        // 判断如果是 Search 路由组件才会执行
        if (this.$route.path !== "/home") {
          this.show = true
        }
      },
      // 鼠标移出全部商品分类隐藏列表
      leaveShow() {
        this.currentIndex = -1;
        // 判断如果是 Search 路由组件才会执行
        if (this.$route.path !== "/home") {
          this.show = false;
        }
      },
    },
  }
</script>

<style scoped lang="less">
  .type-nav {
    border-bottom: 2px solid skyblue;

    .container {
      width: 1200px;
      margin: 0 auto;
      display: flex;
      position: relative;

      .all {
        width: 210px;
        height: 45px;
        background-color: skyblue;
        line-height: 45px;
        text-align: center;
        color: #fff;
        font-size: 14px;
        font-weight: bold;
      }

      .nav {
        a {
          height: 45px;
          margin: 0 22px;
          line-height: 45px;
          font-size: 16px;
          color: #333;
          &:hover {
            text-decoration: none;
          }
        }
      }

      .sort {
        position: absolute;
        left: 0;
        top: 45px;
        width: 210px;
        height: 461px;
        position: absolute;
        background: #fafafa;
        z-index: 999;

        .all-sort-list2 {
          height: 461px;
          overflow: hidden;

          .item {
            h3 {
              line-height: 30px;
              font-size: 14px;
              font-weight: 400;
              overflow: hidden;
              padding: 0 20px;
              margin: 0;

              a {
                color: #333;
              }
            }

            .item-list {
              display: none;
              position: absolute;
              width: 734px;
              min-height: 460px;
              background: #f7f7f7;
              left: 210px;
              border: 1px solid #ddd;
              top: 0;
              z-index: 9999 !important;

              .subitem {
                float: left;
                width: 650px;
                padding: 0 4px 0 8px;

                dl {
                  border-top: 1px solid #eee;
                  padding: 6px 0;
                  overflow: hidden;
                  zoom: 1;

                  &.fore {
                    border-top: 0;
                  }

                  dt {
                    float: left;
                    width: 54px;
                    line-height: 22px;
                    text-align: right;
                    padding: 3px 6px 0 0;
                    font-weight: 700;
                  }

                  dd {
                    float: left;
                    width: 415px;
                    padding: 3px 0 0;
                    overflow: hidden;

                    em {
                      float: left;
                      height: 14px;
                      line-height: 14px;
                      padding: 0 8px;
                      margin-top: 5px;
                      border-left: 1px solid #ccc;
                    }
                  }
                }
              }
            }
          }

          .cur {
            background-color: skyblue;
          }
        }
      }

      // 过渡动画的样式
      // 过渡动画开始状态（进入和移出）
      .sort-enter {
        height: 0;
      }
      // 过渡动画结束状态（进入和移出）
      .sort-enter-to {
        height: 461px;
      }
      // 定义动画时间、速率
      .sort-enter-active {
        transition: all 0.2s linear;
      }
    }
  }
</style>