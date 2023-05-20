<template>
  <div class="trade-container">
    <h3 class="title">填写并核对订单信息</h3>
    <div class="content">
      <h5 class="receive">收件人信息</h5>
      <div class="address clearFix">
        收货人：<input type="text" placeholder="名字" v-model="consignee">
        手机号码：<input type="text" placeholder="手机号" v-model="phoneNum"><br>
        所在地区：
        <v-distpicker
          class="v-distpicker"
          :province="select_province || '河南省'"
          :city="select_city || '安阳市'"
          :area="select_county || '滑县'"
          @change="onSelected">
        </v-distpicker><br>
        详细地址：<textarea placeholder="小区楼栋/乡村名称" v-model="detailAddress"></textarea>
      </div>
      <div class="line"></div>
      <h5 class="pay">支付方式</h5>
      <div class="address clearFix">
        <span class="username"
          v-for="(payWay, index) in pay" :key="index"
          :class="{selected: payWay.isDefault === 1}"
          @click="changeDefault(payWay, pay)"
        >
          {{payWay.way}}
        </span>
      </div>
      <div class="line"></div>
      <h5 class="pay">送货清单</h5>
      <div class="detail">
        <h5>商品清单</h5>
        <ul class="list clearFix" v-for="order in orderInfo.detailArrayList" :key="order.skuId">
          <li>
            <img :src="order.imgUrl" alt="" style="width: 100px; height: 100px">
          </li>
          <li>
            <p>{{ order.skuName }}</p>
            <h4>7天无理由退货</h4>
          </li>
          <li>
            <h3>￥{{ order.orderPrice }}.00</h3>
          </li>
          <li>X{{ order.skuNum }}</li>
        </ul>
      </div>
      <div class="way">
        <h5>配送方式：</h5>
        <span>顺丰快递</span>
        <h5>配送时间：</h5>
        <span>预计8月10日（周三）09:00-15:00送达</span>
      </div>
      <div class="line"></div>
      <div class="bbs">
        <h5>买家留言：</h5>
        <textarea placeholder="选填，请和商家协商一致，付款后商家可见" class="remarks-cont" v-model="msg"></textarea>
      </div>

      <div class="trade">
        <div class="price"><span>{{ orderInfo.totalNum }}</span>件商品，应付金额:　<span>¥{{ orderInfo.totalAmount }}.00</span></div>
        <div class="receiveInfo">
          寄送至:<span>{{ fullAddress }}</span>
          收货人：<span>{{ consignee }}</span>
          手机号：<span>{{ phoneNum }}</span>
        </div>
      </div>
    </div>
    
    <div class="sub clearFix">
      <a class="subBtn" @click="submitOrder">提交订单</a>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import VDistpicker from 'v-distpicker'

  export default {
    components: { VDistpicker },
    data() {
      return {
        msg: '', // 买家留言
        orderId: '', // 订单号
        consignee: '', // 收货人名字
        phoneNum: '', // 手机号码
        select_province: '', // 省
        select_city: '', // 市
        select_county: '', // 区
        detailAddress: '', // 详细地址
        pay: [{way: '在线支付', isDefault: 1}, {way: '货到付款', isDefault: 0}] // 支付方式
      }
    },
    name: 'Trade',
    mounted() {
      this.$store.dispatch('getOrderInfo')
    },
    computed: {
      // 组件获取仓库中的数据
      ...mapState({
        orderInfo: state => state.trade.orderInfo
      }),
      // 完整收货地址
      fullAddress() {
        return this.select_province+this.select_city+this.select_county+this.detailAddress
      }
    },
    methods: {
      // 获取省市区
      onSelected(data) {
        this.select_province = data.province.value
        this.select_city = data.city.value
        this.select_county = data.area.value
      },
      // 修改支付方式
      changeDefault(payWay, pay) {
        pay.forEach(item => item.isDefault = 0)
        payWay.isDefault = 1
      },
      // 提交订单
      async submitOrder() {
        // 交易编码
        let { tradeNo } = this.orderInfo
        // 其余的六个参数
        let data = {
          consignee: this.consignee,
          consigneeTel: this.phoneNum,
          deliveryAddress: this.fullAddress,
          paymentWay: "ONLINE", // 支付方式
          orderComment: this.msg, // 买家留言
          orderDetailList: this.orderInfo.detailArrayList // 商品订单
        }
        // 提交订单时收货人名字、手机号码和详细地址不能为空
        if (this.consignee && this.phoneNum && this.detailAddress) {
          // 带参数发请求
          let result = await this.$API.reqSubmitOrder(tradeNo, data)
          // 提交订单成功
          if (result.code === 200) {
            // 服务器返回的订单号
            this.orderId = result.data
            // 路由跳转，路由传递参数
            this.$router.push('/pay' + '?orderId=' + this.orderId)
          } else {
            // 提交订单失败
            alert(result.data)
          }
        } else {
          this.$message({
            message: '收货人、手机号码和详细地址是必填的',
            type: 'error',
            center: true
          })
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  // 使用样式穿透修改城市选择框的样式
  // css：>>>   less: /deep/
  .v-distpicker /deep/ select {
    height: 32px;
    border-radius: 0;
    font-size: 12px;
    &:focus {
      outline: 1px solid skyblue;
      border: 1px solid white;
    }
  }

  .trade-container {
    .title {
      width: 1200px;
      margin: 0 auto;
      font-size: 14px;
      line-height: 21px;
    }

    .content {
      width: 1200px;
      margin: 10px auto 0;
      border: 1px solid rgb(221, 221, 221);
      padding: 25px;
      box-sizing: border-box;

      .receive,
      .pay {
        line-height: 36px;
        margin: 18px 0;
      }

      .address {
        padding-left: 20px;
        margin-bottom: 15px;

        .username {
          float: left;
          width: 100px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          border: 1px solid #ddd;
          position: relative;
          margin-right: 5px;
        }

        .username::after {
          content: "";
          display: none;
          width: 13px;
          height: 13px;
          position: absolute;
          left: 0;
          top: 0;
          background: url(./images/text.png) no-repeat;
          background-size: 13px 13px;
        }

        .username.selected {
          border-color: skyblue;
        }

        .username.selected::after {
          display: block;
        }

        input {
          width: 150px;
          height: 20px;
          margin-bottom: 10px;
          margin-right: 10px;
          border: 1px solid #ddd;
          &:focus {
            outline: 1px solid skyblue;
            border: 1px solid white;
          }
        }
      }

      .line {
        height: 1px;
        background-color: #ddd;
      }

      .way {
        width: 1080px;
        background-color: rgba(135, 206, 235, .1);
        padding: 15px;
        padding-top: 0;
        margin: 0 auto 18px;

        h5 {
          line-height: 50px;
        }
      }

      .detail {
        width: 1080px;
        background-color: rgba(135, 206, 235, .1);
        padding: 15px;
        margin: 0 auto 2px;

        h5 {
          line-height: 50px;
        }

        .list {
          display: flex;
          justify-content: space-between;

          li {
            line-height: 30px;

            p {
              margin-bottom: 20px;
            }

            h4 {
              font-weight: 400;
            }

            h3 {
              color: skyblue;
            }
          }
        }
      }

      .bbs {
        margin-bottom: 15px;

        h5 {
          line-height: 50px;
        }
      }

      textarea {
        width: 100%;
        height: 70px;
        line-height: 1.8;
        outline: none;
        resize: none;
        border: 1px solid #ddd;
        &:focus {
          border-color: skyblue;
        }
      }
    }

    .trade {
      box-sizing: border-box;
      padding: 10px;
      text-align: right;

      div {
        line-height: 30px;
      }

      .price span {
        color: skyblue;
        font-weight: 700;
        font-size: 14px;
      }

      .receiveInfo {
        color: #999;
      }
    }

    .sub {
      width: 1200px;
      margin: 10px auto;

      .subBtn {
        float: right;
        width: 164px;
        height: 56px;
        font: 700 18px "微软雅黑";
        line-height: 56px;
        text-align: center;
        color: #fff;
        background-color: skyblue;
        cursor: pointer;
      }
    }

  }
</style>