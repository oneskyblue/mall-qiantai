<template>
  <div class="pay-main">
    <div class="pay-container">
      <div class="checkout-tit">
        <h4 class="tit-txt">
          <span class="iconfont icon-duihao2"></span>
          <span class="success-info">订单提交成功</span>
        </h4>
      </div>
      
      <div class="checkout-steps">
        <div class="paymark">
          <div class="step-tit">
            <h5>订单信息</h5>
          </div>
          <div class="step-info">
            <span>订单号：<em>{{ orderId }}</em></span>
            <span>应付金额：<em class="orange money">￥{{ payInfo.totalFee }}</em></span>
          </div>
        </div>
        <div class="hr"></div>
        <div class="notes">
          <div class="step-tit">
            <h5>注意事项</h5>
          </div>
          <div class="step-cont">
            <ol>
              <li>订单提交成功，请您及时付款，以便尽快为您发货。</li>
              <li>请您在提交订单<em class="orange">24小时</em>之内完成支付，超时订单会自动取消。</li>
            </ol>
          </div>
        </div>
        <div class="hr"></div>
        <div class="step-tit">
          <h5>支付平台</h5>
        </div>
        <div class="step-cont">
          <ul class="payType">
            <li><img src="./images/pay2.jpg"></li>
            <li><img src="./images/pay3.jpg"></li>
          </ul>
        </div>
        <div class="hr"></div>
        <div class="payshipInfo">
          <div class="step-tit">
            <h5>支付网银</h5>
          </div>
          <div class="step-cont">
            <ul class="payType">
              <li><img src="./images/pay10.jpg"></li>
              <li><img src="./images/pay11.jpg"></li>
              <li><img src="./images/pay12.jpg"></li>
              <li><img src="./images/pay13.jpg"></li>
              <li><img src="./images/pay14.jpg"></li>
              <li><img src="./images/pay15.jpg"></li>
              <li><img src="./images/pay16.jpg"></li>
              <li><img src="./images/pay17.jpg"></li>
              <li><img src="./images/pay18.jpg"></li>
              <li><img src="./images/pay19.jpg"></li>
              <li><img src="./images/pay20.jpg"></li>
              <li><img src="./images/pay21.jpg"></li>
              <li><img src="./images/pay22.jpg"></li>
            </ul>
          </div>
        </div>
        <div class="submit">
          <a class="btn" @click="open">立即支付</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // 引入 qrcode 二维码
  import QRCode from 'qrcode'

  export default {
    data() {
      return {
        // 支付信息，里面有应付金额
        payInfo: {},
        // 支付状态码
        code: ''
      }
    },
    name: 'Pay',
    computed: {
      orderId() {
        return this.$route.query.orderId
      }
    },
    // 工作中尽量不要在生命周期函数中使用 await|async
    mounted() {
      this.getPayInfo()
    },
    methods: {
      // 获取支付信息
      async getPayInfo() {
        // 发请求
        let result = await this.$API.reqPayInfo(this.orderId)
        // 如果成功，组件当中存储支付信息
        if (result.code === 200) {
          this.payInfo = result.data
        }
      },
      // 弹出框
      async open() {
        // 使用 qrcode 生成二维码图片地址
        // let url = await QRCode.toDataURL(this.payInfo.codeUrl)
        let url = await QRCode.toDataURL('wxp://f2f1D6yACP8cgceVzuseLd65TtfKDOzXnKT8hOb0XLPv56gqesPAhVa2JGISt1BM2jgw')
        console.log(url)
        // 弹出框相关设置
        this.$alert(`<img src=${url} />`, '微信支付', {
          dangerouslyUseHTMLString: true,
          // MessageBox 是否显示右上角关闭按钮
          showClose: false,
          // 是否居中布局
          center: true,
          // 是否显示取消按钮
          showCancelButton: true,
          // 取消按钮的文本内容
          cancelButtonText: '支付遇见问题',
          // 确定按钮的文本内容
          confirmButtonText: '已完成支付',
          // MessageBox 关闭前的回调
          beforeClose: (action, instance, done) => {
            // action:action 的值为'confirm', 'cancel'或'close'
            // instance:instance 为 MessageBox 实例，可以通过它访问实例上的属性和方法
            // done:done 用于关闭 MessageBox 实例
            if (action === 'cancel') {
              // 点击的是取消（支付遇见问题）
              alert('请联系客服')
              // 清除定时器
              clearInterval(timer)
              // 关闭弹出框
              done()
            } else {
              // 点击的是确认（支付已完成）
              if (this.code === 200) {
                // 清除定时器
                clearInterval(timer)
                // 关闭弹出框
                done()
                // 路由跳转，跳转到 paysuccess 路由
                this.$router.push('/paysuccess')
              }
            }
          }
        }).catch(() => {})
        let timer = setInterval(async () => {
          // 发请求，服务器会返回订单支付状态，从而获取用户支付状态
          let result = await this.$API.reqPayStatus(this.orderId)
          console.log(result)
          // 如果 code = 200，支付成功
          if (result.code === 200) {
            // 清除定时器
            clearInterval(timer)
            // 保存状态码 code
            this.code = result.code
            // 关闭弹出框，因为弹出框的 z-index 很大，跳转到 paysuccess 路由时也会出现
            this.$msgbox.close()
            // 跳转到 paysuccess 路由
            this.$router.push('/paysuccess')
          }
        }, 1000)
      }
    }
  }
</script>

<style lang="less" scoped>
  .pay-main {
    margin-bottom: 20px;

    .pay-container {
      margin: 0 auto;
      width: 1200px;

      a:hover {
        color: #4cb9fc;
      }

      .orange {
        color: skyblue;
      }

      .money {
        font-size: 18px;
      }

      .checkout-tit {
        padding: 10px;

        .tit-txt {
          font-size: 14px;
          line-height: 21px;

          .success-info {
            padding: 0 8px;
            line-height: 30px;
            vertical-align: top;
          }
        }
      }

      .checkout-steps {
        border: 1px solid #ddd;
        padding: 0 25px;

        .hr {
          height: 1px;
          background-color: #ddd;
        }

        .step-tit {
          line-height: 36px;
          margin: 14px 0;
        }

        .step-info {
          margin: 0 10px 11px 20px;

          span {
            font-size: 13px;
            line-height: 25px;
            margin-right: 20px
          }
        }

        .step-cont {
          margin: 0 10px 10px 20px;

          ul {
            font-size: 0;

            li {
              margin: 1px;
              display: inline-block;
              padding: 8px 5px;
              border: 1px solid #ddd;
              cursor: pointer;
            }
          }

          ol {
            list-style: circle;

            li {
              font-size: 13px;
              line-height: 25px;
            }
          }
        }
      }

      .submit {
        text-align: center;

        .btn {
          display: inline-block;
          padding: 15px 45px;
          margin: 15px 0 10px;
          font: 18px "微软雅黑";
          font-weight: 700;
          border-radius: 0;
          background-color: skyblue;
          border: 1px solid skyblue;
          color: #fff;
          text-align: center;
          vertical-align: middle;
          cursor: pointer;
          user-select: none;
          text-decoration: none;
        }
      }
    }
  }
</style>