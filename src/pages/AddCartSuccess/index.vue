<template>
  <div class="cart-complete-wrap">
    <div class="cart-complete">
      <div class="location">
        <h3>商品已成功加入购物车</h3>
        <div class="goods">
          <div class="good">
            <div class="good-pic">
              <img :src="skuInfo.skuDefaultImg">
            </div>
            <div class="good-info">
              <p class="number">数量：{{$route.query.skuNum}} 价格：{{skuInfo.price}}</p>
              <p class="title">{{skuInfo.skuName}}</p>
              <p class="attr">{{skuInfo.skuDesc}}</p>
            </div>
          </div>
        </div>
        <div class="gocart">
          <router-link class="sui-btn btn-xlarge" :to="`/detail/${skuInfo.id}`">查看商品详情</router-link>
          <router-link to="/shopcart">去购物车结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'AddCartSuccess',
    computed: {
      skuInfo() {
        return JSON.parse(sessionStorage.getItem('SKUINFO'))
      }
    }
  }
</script>

<style lang="less" scoped>
  .cart-complete-wrap {
    padding-bottom: 10px;

    .cart-complete {
      width: 1200px;
      margin: 0 auto;

      .location {
        width: 800px;
        // border: 1px solid red;
        margin: 0 auto;
        text-align: center;
      }

      h3 {
        font-weight: 600;
        font-size: 16px;
        padding-top: 15px;
        padding-bottom: 15px;
        margin: 0;
      }

      .goods {
        overflow: hidden;
        padding: 10px 0;

        .good {

          .good-pic {
            width: 200px;
            border: 1px solid #dfdfdf;
            margin: 0 auto;

            img {
              width: 100%;
              height: 100%;
              vertical-align: bottom;
            }
          }

          .good-info {
            margin-top: 10px;

            .number {
              font-weight: 700;
              font-size: 14px;
            }

            .title {
              width: 100%;
              line-height: 28px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              font-size: 14px;

              span {
                font-weight: 700;
              }
            }

            .attr {
              color: #aaa;
            }
          }
        }
      }

      .gocart {

        a {
          margin-bottom: 5px;
          padding: 7px;
          font-size: 15px;
          line-height: 22px;
          color: #fff;
          background-color: skyblue;
          text-decoration: none;
          box-sizing: border-box;
          border: 1px solid #e1e1e1;
        }
      }
    }
  }
</style>