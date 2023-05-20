<template>
  <div class="paysuccess">
    <div class="success">
      <h3>
        <span class="iconfont icon-duihao2"></span>
        恭喜您，支付成功啦！
      </h3>
      <div class="paydetail">
        <p class="button">
          <router-link class="btn-look" to="/center">查看订单</router-link>
          <router-link class="btn-goshop" to="/home">继续购物</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'PaySuccess',
    // 组件内守卫
    /* beforeRouteEnter(to, from, next) {
      if (from.path == '/pay') {
        next()
      } else {
        next(false)
      }
    } */
  }
</script>

<style lang="less" scoped>
  .paysuccess {
    margin: 20px auto;
    padding: 25px;
    border: 1px solid rgb(211, 211, 211);
    width: 1200px;

    .success {
      width: 500px;
      margin: 0 auto;

      h3 {
        margin: 20px 0;
        font-size: 18px;
        text-align: center;
      }

      .paydetail {
        margin-left: 130px;

        .button {
          margin: 30px 0;
          line-height: 26px;

          a {
            display: inline-block;
            box-sizing: border-box;
            text-align: center;
            vertical-align: middle;
            cursor: pointer;
            border-radius: 2px;
            user-select: none;
            font-size: 18px;
            padding: 4px 20px;
            line-height: 22px;
            text-decoration: none;

            &.btn-look {
              margin-right: 13px;
              color: #fff;
              background-color: skyblue;
              border: 1px solid skyblue;
            }

            &.btn-goshop {
              color: #666;
              background-color: #eee;
              border: 1px solid #e1e1e1;
            }
          }
        }
      }
    }
  }
</style>