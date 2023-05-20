<template>
  <div class="detail">
    <!-- 商品分类导航 -->
    <TypeNav />

    <!-- 主要内容区域 -->
    <section class="con">
      <!-- 导航路径区域 -->
      <div class="conPoin">
        <span v-show="categoryView.category1Name">{{categoryView.category1Name}}</span>
        <span v-show="categoryView.category2Name">{{categoryView.category2Name}}</span>
        <span v-show="categoryView.category3Name">{{categoryView.category3Name}}</span>
      </div>
      <!-- 主要内容区域 -->
      <div class="mainCon">
        <!-- 左侧放大镜区域 -->
        <div class="previewWrap">
          <!--放大镜效果-->
          <Zoom :skuImageList="skuImageList"/>
          <!-- 小图列表 -->
          <ImageList :skuImageList="skuImageList" />
        </div>
        <!-- 右侧选择区域布局 -->
        <div class="InfoWrap">
          <div class="goodsDetail">
            <h3 class="InfoName">{{skuInfo.skuName}}</h3>
            <p class="news">{{skuInfo.skuDesc}}</p>
            <div class="priceArea">
              <div class="priceArea1">
                <div class="title">
                  价&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格
                </div>
                <div class="price">
                  <i>¥</i>
                  <em>{{skuInfo.price}}</em>
                </div>
              </div>
              <div class="priceArea2">
                <div class="title">
                  <i>促&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;销</i>
                </div>
                <div class="fixWidth">
                  <em class="t-gray">满999.00另加20.00元，或满1999.00另加30.00元，或满2999.00另加40.00元，即可在购物车换购热销商品</em>
                </div>
              </div>
            </div>
            <div class="support">
              <div class="supportArea">
                <div class="title">
                  支&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;持
                </div>
                <div class="fixWidth">以旧换新，闲置手机回收 4G套餐超值抢 礼品购</div>
              </div>
              <div class="supportArea">
                <div class="title">配&nbsp;送&nbsp;&nbsp;至</div>
                <div class="fixWidth">河南省 安阳市 滑县</div>
              </div>
            </div>
          </div>

          <div class="choose">
            <div class="chooseArea">
              <div class="choosed"></div>
              <dl v-for="spuSaleAttr in spuSaleAttrList" :key="spuSaleAttr.id">
                <dt class="title">{{spuSaleAttr.saleAttrName}}</dt>
                <dd
                  changepirce="0"
                  v-for="spuSaleAttrValue in spuSaleAttr.spuSaleAttrValueList"
                  :key="spuSaleAttrValue.id"
                  :class="{active: spuSaleAttrValue.isChecked == 1}"
                  @click="changeActive(spuSaleAttrValue, spuSaleAttr.spuSaleAttrValueList)">
                    {{spuSaleAttrValue.saleAttrValueName}}
                </dd>
              </dl>
            </div>
            <div class="cartWrap">
              <div class="controls">
                <input autocomplete="off" class="itxt" v-model="skuNum" @change="changeSkuNum" />
                <a href="javascript:void(0)" class="plus" @click="skuNum++">+</a>
                <a href="javascript:void(0)" class="mins" @click="skuNum > 1 ? skuNum-- : skuNum = 1">-</a>
              </div>
              <div class="add">
                <a href="javascript:void(0)" @click="addShopcar">加入购物车</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import ImageList from "./ImageList/ImageList";
  import Zoom from "./Zoom/Zoom";
  import { mapGetters } from 'vuex'

  export default {
    name: "Detail",
    components: { ImageList, Zoom },
    data() {
      return {
        skuNum: 1
      }
    },
    mounted() {
      // 派发action，通知vuex发送请求，获取产品详情的数据并存储在仓库中
      this.$store.dispatch('getGoodsInfo', this.$route.params.skuId)
    },
    computed: {
      // 获取仓库中的数据作为该组件的数据
      ...mapGetters(['categoryView', 'skuInfo', 'spuSaleAttrList']),
      // 给子组件的数据
      skuImageList() {
        // 如果服务器数据还没有返回，skuInfo 这个对象是空对象，则 skuInfo.skuImageList 为 undefined，那么传递给子组件的数据使用时控制台会出现假报错
        return this.skuInfo.skuImageList || []
      }
    },
    methods: {
      // 产品的售卖属性值切换高亮
      changeActive(spuSaleAttrValue, spuSaleAttrValueList) {
        // 遍历 spuSaleAttrValueList 使全部售卖属性值(spuSaleAttrValue)中 isChecked 为 0 ，这样全部没有高亮
        spuSaleAttrValueList.forEach(item => {
          item.isChecked = '0'
        })
        // 点击的那个售卖属性值(spuSaleAttrValue)中 isChecked 为 0 ，这样点击的那个就有高亮
        spuSaleAttrValue.isChecked = '1'
      },
      // 表单元素修改产品个数
      changeSkuNum(event) {
        // 用户输入的文本 * 1
        let value = event.target.value * 1
        // 如果用户输入非法，即用户输入的不是一个数字（NaN）或者小于 1
        if (isNaN(value) || value < 1) {
          // 如果非法 skuNum 默认为 1
          this.skuNum = 1
        } else {
          // 用户输入合法，即用户输入的是数字且大于 1 的整数 ，不能为小数，如果为小数取整
          this.skuNum = parseInt(value)
        }
      },
      // 加入购物车的回调函数
      async addShopcar() {
        // 1.发请求，将产品加入到数据库（通知服务器）
        // this.$store.dispatch('addOrUpdateShopCart')，其实就是在调用 vuex 仓库中的这个 addOrUpdateShopCart 函数
        // 2.需要知道这次请求是成功还是失败，如果成功进行路由跳转，如果失败，需要给用户提示
        try {
          // 成功
          await this.$store.dispatch('addOrUpdateShopCart', { skuId: this.$route.params.skuId, skuNum: this.skuNum })
          // 3.进行路由跳转
          // 4.在路由跳转的时候还需要将产品的信息带给要跳转到的路由组件（addcartsuccess）
          // 一些简单的数据(skuNum)，通过 query 形式给路由组件传递过去
          // 产品信息的数据(skuInfo)，比较复杂，通过会话存储（不持久化，会话结束数据会消失）
          // 本地存储和会话存储：一般存储的是JSON字符串
          this.$router.push({ name: 'addcartsuccess', query: { skuNum: this.skuNum } })
          sessionStorage.setItem('SKUINFO', JSON.stringify(this.skuInfo))
        } catch (error) {
          // 失败
          alert(error.message)
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .detail {
    .con {
      width: 1200px;
      margin: 15px auto 0;

      .conPoin {
        padding: 9px 15px 9px 0;

        & > span + span:before {
          content: "/\00a0";
          padding: 0 5px;
          color: #ccc;
        }
      }

      .mainCon {
        overflow: hidden;
        margin: 5px 0 15px;

        .previewWrap {
          float: left;
          width: 400px;
          position: relative;
        }

        .InfoWrap {
          width: 700px;
          float: right;

          .InfoName {
            font-size: 14px;
            line-height: 21px;
            margin-top: 15px;
          }

          .news {
            margin-top: 15px;
          }

          .priceArea {
            margin: 13px 0;

            .priceArea1 {
              overflow: hidden;
              line-height: 28px;
              margin-top: 10px;

              .title {
                float: left;
                margin-right: 15px;
              }

              .price {
                float: left;

                i {
                  font-size: 16px;
                  color: skyblue;
                }

                em {
                  font-size: 24px;
                  font-weight: 700;
                  color: skyblue;
                }
              }
            }

            .priceArea2 {
              overflow: hidden;
              line-height: 28px;
              margin-top: 10px;

              .title {
                margin-right: 15px;
                float: left;
              }

              .fixWidth {
                width: 520px;
                float: left;

                .t-gray {
                  color: #999;
                }
              }
            }
          }

          .support {

            .supportArea {
              overflow: hidden;
              line-height: 28px;
              margin-top: 10px;

              .title {
                margin-right: 15px;
                float: left;
              }

              .fixWidth {
                width: 520px;
                float: left;
                color: #999;
              }
            }
          }

          .choose {
            .chooseArea {
              overflow: hidden;
              line-height: 28px;
              margin-top: 10px;

              dl {
                overflow: hidden;
                margin: 13px 0;

                dt {
                  margin-right: 15px;
                  float: left;
                }

                dd {
                  float: left;
                  margin-right: 5px;
                  color: #666;
                  line-height: 24px;
                  padding: 2px 14px;
                  border-top: 1px solid #eee;
                  border-right: 1px solid #bbb;
                  border-bottom: 1px solid #bbb;
                  border-left: 1px solid #eee;

                  &.active {
                    color: skyblue;
                    border: 1px solid skyblue;
                  }
                }
              }
            }

            .cartWrap {
              .controls {
                width: 48px;
                position: relative;
                float: left;
                margin-right: 15px;

                .itxt {
                  width: 38px;
                  height: 37px;
                  border: 1px solid #ddd;
                  color: #555;
                  float: left;
                  border-right: 0;
                  text-align: center;
                  &:focus {
                    outline-color: skyblue;
                  }
                }

                .plus,
                .mins {
                  width: 15px;
                  text-align: center;
                  height: 17px;
                  line-height: 17px;
                  background: #f1f1f1;
                  color: #666;
                  position: absolute;
                  right: -8px;
                  border: 1px solid #ccc;
                  &:hover {
                    text-decoration: none;
                  }
                }

                .mins {
                  right: -8px;
                  top: 19px;
                  border-top: 0;
                }

                .plus {
                  right: -8px;
                }
              }

              .add {
                float: left;

                a {
                  background-color: skyblue;
                  padding: 0 25px;
                  font-size: 16px;
                  color: #fff;
                  height: 36px;
                  line-height: 36px;
                  display: block;
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
</style>