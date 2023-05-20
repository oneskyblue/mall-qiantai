<template>
  <div class="order-right">
    <div class="order-content">
      <div class="title">
        <h3>我的订单</h3>
      </div>
      <div class="chosetype">
        <table>
          <thead>
            <tr>
              <th width="29%">商品</th>
              <th width="32%">订单详情</th>
              <th width="13%">收货人</th>
              <th width="11%">金额</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
          </thead>
        </table>
      </div>
      <div class="orders">
        <!-- 每一笔订单 -->
        <table class="order-item" v-for="order in myOrder.records" :key="order.id">
          <thead>
            <tr>
              <th colspan="5">
                <span class="ordertitle">
                  {{ order.createTime }}　订单编号：{{ order.outTradeNo }}
                  <span class="pull-right delete"><img src="../images/delete.png" /></span>
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            <!-- 每一笔订单中商品详情 -->
            <tr v-for="(cart, index) in order.orderDetailList" :key="cart.id">
              <td width="60%">
                <div class="typographic">
                  <img :src="cart.imgUrl" style="width: 100px; height: 100px" />
                  <a href="javascript:void(0)">{{ cart.skuName }}</a>
                  <span>x{{ cart.skuNum }}</span>
                  <a href="javascript:void(0)">售后申请</a>
                </div>
              </td>
              <td :rowspan="order.orderDetailList.length" width="8%" class="center" v-if="index === 0">{{ order.consignee }}</td>
              <td :rowspan="order.orderDetailList.length" v-if="index === 0">
                <ul class="unstyled">
                  <li>总金额¥{{ order.totalAmount }}.00</li>
                  <li>在线支付</li>
                </ul>
              </td>
              <td :rowspan="order.orderDetailList.length" v-if="index === 0">
                <a href="javascript:void(0)">{{ order.orderStatusName }}</a>
              </td>
              <td :rowspan="order.orderDetailList.length" v-if="index === 0">
                <ul class="unstyled">
                  <li>
                    <a href="javascript:void(0)">评价|晒单</a>
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <!-- 分页器 -->
        <Pagination :pageNo="page" :pageSize="limit" :total="myOrder.total" :continues="5" @getPageNo="getPageNo" />
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "MyOrder",
    data() {
      return {
        // 初始化参数
        // 当前第几页
        page: 1,
        // 每页展示的数据个数
        limit: 3,
        // 存储订单数据
        myOrder: {}
      }
    },
    mounted() {
      // 调用方法
      this.getData()
    },
    methods: {
      // 获取个人中心订单数据的方法
      async getData() {
        let result = await this.$API.reqMyOrder(this.page, this.limit)
        if (result.code === 200) {
          this.myOrder = result.data
        }
      },
      // 获取当前点击哪一页
      getPageNo(page) {
        // 修改组件相应式数据 page
        this.page = page
        this.getData()
      }
    }
  }
</script>

<style lang="less" scoped>
  //右边
  .order-right {
    float: right;
    width: 83.33%;

    //订单部分
    .order-content {
      margin: 0 20px;
      color: #666;

      //标题
      .title {
        margin-bottom: 22px;
        border: 1px solid #ddd;

        h3 {
          padding: 12px 10px;
          font-size: 15px;
          background-color: #f1f1f1;
        }
      }

      //表头
      .chosetype {
        margin-bottom: 15px;
        color: #666;

        table {
          border: 1px solid #e6e6e6;
          border-collapse: separate;
          border-radius: 2px;
          width: 100%;
          max-width: 100%;
          border-spacing: 0;

          th {
            padding: 6px 8px;
            color: #666;
            font-weight: 700;
            vertical-align: bottom;
            background-color: #f4f4f4;
            line-height: 18px;
            border-bottom: 1px solid #e6e6e6;
            font-size: 12px;
            text-align: left;
          }
        }
      }

      // 表单内容
      .orders {
        font-size: 12px;

        a:hover {
          text-decoration: none;
        }

        table {
          border: 1px solid #e6e6e6;
          border-collapse: collapse;
          border-radius: 2px;
          width: 100%;
          margin-bottom: 18px;
          max-width: 100%;

          th {
            padding: 6px 8px;
            line-height: 18px;
            text-align: left;
            vertical-align: bottom;
            background-color: #f4f4f4;
            font-size: 12px;
            color: #666;

            .pull-right {
              float: right;
              cursor: pointer;

              img {
                margin-right: 10px;
                vertical-align: middle;
              }
            }
          }

          td {
            font-size: 12px;
            color: #666;
            padding: 6px 8px;
            line-height: 18px;
            text-align: left;
            vertical-align: middle;
            border: 1px solid #e6e6e6;

            &.center {
              text-align: center;
            }

            .typographic {
              img {
                float: left;
                margin-right: 10px;
              }

              a {
                float: left;
                min-width: 80px;
                max-width: 250px;
              }

              span {
                float: left;
                min-width: 80px;
                max-width: 250px;
                text-align: center;
              }
            }
          }
        }
      }
    }
  }
</style>