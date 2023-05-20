<template>
  <div class="floor">
    <div class="py-container">
      <!-- 导航区 -->
      <div class="title clearfix">
        <h3 class="fl">{{list.name}}</h3>
        <div class="fr">
          <ul class="nav-tabs clearfix">
            <li class="active" v-for="(nav, index) in list.navList" :key="index">
              <a href="javascript:void(0);" data-toggle="tab">{{nav.text}}</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="tab-content">
        <div class="tab-pane">
          <div class="floor-1">
            <!-- 轮播图左边 -->
            <div class="blockgary">
              <ul class="jd-list">
                <li v-for="(keyword, index) in list.keywords" :key="index">{{keyword}}</li>
              </ul>
              <div><img :src="list.imgUrl" /></div>
            </div>
            <!-- 轮播图的地方 -->
            <div class="floorBanner">
              <div class="swiper-container" ref="mySwiper">
                <div class="swiper-wrapper">
                  <div class="swiper-slide" v-for="carousel in list.carouselList" :key="carousel.id">
                    <img style="width:329px;height:360px" :src="carousel.imgUrl" />
                  </div>
                </div>
                <!-- 如果需要分页器 -->
                <div class="swiper-pagination"></div>

                <!-- 如果需要导航按钮 -->
                <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div>
              </div>
            </div>
            <!-- 轮播图右边 -->
            <div class="split">
              <span class="floor-x-line"></span>
              <div class="floor-conver-pit">
                <img :src="list.recommendList[0]" />
              </div>
              <div class="floor-conver-pit">
                <img  :src="list.recommendList[1]" />
              </div>
            </div>
            <div class="split center">
              <img style="width:220px;height:359px" :src="list.bigImg" />
            </div>
            <div class="split">
              <span class="floor-x-line"></span>
              <div class="floor-conver-pit">
                <img :src="list.recommendList[2]" />
              </div>
              <div class="floor-conver-pit">
                <img :src="list.recommendList[3]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Swiper from 'swiper'
  
  export default {
    // 接收父组件 Home 传递过来的数据
    props: ['list'],
    mounted() {
      // 第一次书写 Swiper 的时候，在 mounted 当中书写是不可以的，但是为什么现在这里可以了？
      // 第一次书写轮播图的时候，是在当前组件内部发送请求，动态渲染结构（前台至少服务器数据需要回来），因此第一次的写法在这里不行
      // 现在的写法为什么可以？
      // 因为请求是父组件发的，父组件通过 props 传递过来的，而且结构都已经有的情况下执行 mounted
      var mySwiper = new Swiper (this.$refs.mySwiper, {
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
          prevEl: '.swiper-button-prev'
        },
      })
    }
  }
</script>

<style scoped lang="less">
  .floor {
    margin-top: 15px;
    margin-bottom: 15px;

    .py-container {
      width: 1200px;
      margin: 0 auto;

      .title {
        .fl {
          float: left;
          font-size: 20px;
          line-height: 30px;
          margin: 9px 0;
          font-weight: 700;
        }

        .fr {
          float: right;

          .nav-tabs {
            margin: 10px 0 0;
            display: inline-block;

            li {
              float: left;
              line-height: 18px;

              a {
                padding-top: 1px;
                font-weight: 400;

                &::after {
                  content: "|";
                  padding: 0 10px;
                }
              }

              a:hover {
                text-decoration: none;
                color: skyblue
              }

              &:nth-child(7) {
                a {
                  &::after {
                    content: "";
                  }
                }
              }
            }
          }
        }
      }

      .tab-content {
        border-top: 2px solid skyblue;
        border-bottom: 1px solid #e4e4e4;

        .tab-pane {
          .floor-1 {
            height: 360px;
            display: flex;

            .blockgary {
              width: 210px;
              height: 100%;
              background: #f7f7f7;

              .jd-list {
                padding: 15px 0;
                overflow: hidden;

                li {
                  list-style-type: none;
                  float: left;
                  width: 40%;
                  margin: 0 10px;
                  border-bottom: 1px solid #e4e4e4;
                  text-align: center;
                  line-height: 26px;
                }
              }

              div {
                margin-left: 2px;
              }

              img {
                width: 207px;
                height: 249px;
              }
            }

            .floorBanner {
              width: 330px;
              height: 100%;
            }

            .split {
              width: 220px;
              height: 100%;
              position: relative;

              .floor-x-line {
                position: absolute;
                background: #e4e4e4;
                width: 220px;
                height: 1px;
                top: 180px;
              }

              .floor-conver-pit {
                width: 100%;
                height: 50%;

                img {
                  width: 100%;
                  height: 100%;
                  transition: all 400ms;

                  &:hover {
                    opacity: 0.8;
                  }
                }
              }
            }

            .center {
              border: 1px solid #e4e4e4;
            }
          }
        }
      }
    }
  }
</style>