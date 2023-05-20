<template>
  <div class="list-container">
    <div class="sortList clearfix">
      <div class="center">
        <!--banner轮播-->
        <div class="swiper-container" ref="mySwiper">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="carousel in bannerList" :key="carousel.id">
              <img :src="carousel.imgUrl" />
            </div>
          </div>
          <!-- 如果需要分页器 -->
          <div class="swiper-pagination"></div>

          <!-- 如果需要导航按钮 -->
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
        </div>
      </div>
      <div class="right">
        <div class="news">
          <h4>
            <em class="fl">消息资讯</em>
            <span class="fr tip">更多 ></span>
          </h4>
          <div class="clearix"></div>
          <ul class="news-list unstyled">
            <li><span class="bold">[公告]</span>暑假来临 商品限时七折</li>
            <li><span class="bold">[特惠]</span>备战开学季 全民半价购数码</li>
            <li><span class="bold">[热销]</span>一加Ace新品 一加手机 不将就</li>
            <li><span class="bold">[返场]</span>38节狂欢返场 精彩礼品不容错过</li>
            <li><span class="bold">[热销]</span>华硕笔记本 让你在游戏中勇往直前</li>
          </ul>
        </div>
        <div class="ads">
          <img src="./images/ad1.jpg" />
        </div>
        <ul class="lifeservices">
          <li class="life-item">
            <i class="list-item"><span class="iconfont icon-huafei"></span></i>
            <span class="service-intro">话费</span>
          </li>
          <li class="life-item">
            <i class="list-item"><span class="iconfont icon-jipiao"></span></i>
            <span class="service-intro">机票</span>
          </li>
          <li class="life-item">
            <i class="list-item"><span class="iconfont icon-youxi"></span></i>
            <span class="service-intro">游戏</span>
          </li>
          <li class="life-item">
            <i class="list-item"><span class="iconfont icon-dianyingpiao"></span></i>
            <span class="service-intro">电影票</span>
          </li>
          <li class="life-item">
            <i class="list-item"><span class="iconfont icon-caipiao"></span></i>
            <span class="service-intro">彩票</span>
          </li>
          <li class="life-item">
            <i class="list-item"><span class="iconfont icon-jiayouzhan"></span></i>
            <span class="service-intro">加油站</span>
          </li>
          <li class="life-item">
            <i class="list-item"><span class="iconfont icon-huochepiaomianxing"></span></i>
            <span class="service-intro">火车票</span>
          </li>
          <li class="life-item">
            <i class="list-item"><span class="iconfont icon-jiudian"></span></i>
            <span class="service-intro">酒店</span>
          </li>
          <li class="life-item">
            <i class="list-item"><span class="iconfont icon-tubiao_dianzhuzhongchou-zhongchoupiaoju"></span></i>
            <span class="service-intro">众筹</span>
          </li>
          <li class="life-item">
            <i class="list-item"><span class="iconfont icon-lipinka"></span></i>
            <span class="service-intro">礼品卡</span>
          </li>
          <li class="life-item">
            <i class="list-item"><span class="iconfont icon-licai"></span></i>
            <span class="service-intro">理财</span>
          </li>
          <li class="life-item">
            <i class="list-item"><span class="iconfont icon-baitiao"></span></i>
            <span class="service-intro">白条</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  // 引入 swiper 包
  import Swiper from 'swiper'

  export default {
    mounted() {
      // 派发 action ，通知 vuex 发送请求，获取数据，存储在仓库中
      this.$store.dispatch('getBannerList')
    },
    computed: {
      ...mapState({
        bannerList: (state) => {
          return state.home.bannerList
        }
      })
    },
    watch: {
      // 监听 bannerList 数据的变化：因为这条数据发生过变化，由空数组变为数组里面由四个元素
      // 对象写法
      bannerList: {
        // 如果执行 handler 方法，代表组件实例身上 bannerList 数据发生了变化
        // 当这个函数执行，只能保证 bannerList 数据已经有了，但不能保证 v-for 已经执行结束了
        // v-for 执行完毕，页面中的轮播图才会有结构
        handler(newVale, oldVale) {
          // nextTick：在下次 DOM 更新（数据变化更新 DOM）、循环结束（v-for）之后执行延迟回调。
          this.$nextTick(() => {
            // 执行这个回调的时候，数据已经发生变化，v-for 已经执行完毕，此时页面中轮播图已经有结构
            new Swiper (this.$refs.mySwiper, {
              loop: true, // 循环模式选项
              autoplay: true, // 自动切换图片
              
              // 如果需要分页器
              pagination: {
                el: '.swiper-pagination',
                clickable: true // 点击分页器的指示点分页器会控制Swiper切换
              },
              
              // 如果需要前进后退按钮
              navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              },
            })
          })
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .list-container {
    width: 1200px;
    margin: 0 auto;

    .sortList {
      height: 464px;
      padding-left: 210px;

      .center {
        box-sizing: border-box;
        width: 740px;
        height: 100%;
        padding: 5px;
        float: left;
      }

      .right {
        float: left;
        width: 250px;

        .news {
          border: 1px solid #e4e4e4;
          margin-top: 5px;

          h4 {
            border-bottom: 1px solid #e4e4e4;
            padding: 5px 10px;
            margin: 5px 5px 0;
            line-height: 22px;
            overflow: hidden;
            font-size: 14px;

            .fl {
              float: left;
            }

            .fr {
              float: right;
              font-size: 12px;
              font-weight: 400;
            }
          }

          .news-list {
            padding: 5px 15px;
            line-height: 26px;

            .bold {
              font-weight: 700;
            }
          }
        }

        .lifeservices {
          border-right: 1px solid #e4e4e4;
          border-top: 1px solid #e4e4e4;
          overflow: hidden;
          display: flex;
          flex-wrap: wrap;

          .life-item {
            border-left: 1px solid #e4e4e4;
            border-bottom: 1px solid #e4e4e4;
            margin-right: -1px;
            height: 64px;
            text-align: center;
            position: relative;
            cursor: pointer;
            width: 25%;

            .list-item {
              width: 61px;
              height: 40px;
              display: block;
            }

            .service-intro {
              line-height: 22px;
              width: 60px;
              display: block;
            }
          }
        }

        .ads {
          margin-top: 4px;

          img {
            opacity: 0.8;
            transition: all 400ms;

            &:hover {
              opacity: 1;
            }
          }
        }
      }
    }
  }
</style>