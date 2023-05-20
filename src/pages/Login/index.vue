<template>
  <div class="login-container">
    <!-- 登录 -->
    <div class="login-wrap">
      <div class="login">
        <h3>
          用户登录
          <span class="go">
            没有账号，去
            <router-link to="/register">注册</router-link>
          </span>
        </h3>
        <div class="loginform">
          <ul class="tab clearFix">
            <li><a href="#" class="current">账户登录</a></li>
          </ul>

          <div class="content">
            <form>
              <div class="input-text clearFix">
                <span class="iconfont icon-yonghu1"></span>
                <input type="text" placeholder="请输入手机号" v-model="phone">
              </div>
              <div class="input-text clearFix">
                <span class="iconfont icon-mima"></span>
                <input type="password" placeholder="请输入密码" v-model="password">
              </div>
              <div class="setting clearFix">
                <label class="checkbox inline">
                  <input name="m1" type="checkbox" value="2" checked="">
                  自动登录
                </label>
                <span class="forget">忘记密码？</span>
              </div>
              <button class="btn" @click.prevent="userLogin">登&nbsp;&nbsp;录</button>
            </form>

            <span>其他登录方式：</span>
            <div class="call clearFix">
              <ul>
                <li><a href="javascript:void(0)"><span class="iconfont icon-qqdenglu"></span></a></li>
                <li><a href="javascript:void(0)"><span class="iconfont icon-weixindenglu"></span></a></li>
                <li><a href="javascript:void(0)"><span class="iconfont icon-zhifubao"></span></a></li>
                <li><a href="javascript:void(0)"><span class="iconfont icon-weibo"></span></a></li>
              </ul>
              <router-link class="register" to="/register">立即注册</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
      </ul>
      <div class="address">地址：河南省安阳市滑县</div>
      <div class="beian">豫ICP备111111111号</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Login',
    data() {
      return {
        // 收集表单数据
        phone: '', // 手机号
        password: '' // 密码
      }
    },
    methods: {
      // 登录的回调函数
      async userLogin() {
        try {
          const { phone, password } = this
          if (phone && password) {
            await this.$store.dispatch('userLogin', { phone, password })
            // 登录成功跳转路由
            // 保存query参数中的字段redirect
            let toPath = this.$route.query.redirect
            // 如果有字段redirect
            if (toPath) {
              // 跳转到对应的路由
              this.$router.push(toPath)
            } else {
              // 如果没有跳转到home首页
              this.$router.push('/home')
            }
          } else if (phone) {
            this.$message({
              message: '密码不能为空',
              center: true
            })
          } else if (password) {
            this.$message({
              message: '手机号不能为空',
              center: true
            })
          } else {
            this.$message({
              message: '手机号和密码不能为空',
              center: true
            })
          }
        } catch (error) {
          // alert(error.message)
          this.$message({
            message: '手机号或密码不正确',
            type: 'error',
            center: true
          })
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .login-container {
    .login-wrap {
      height: 445px;
      background-color: #fff;

      .login {
        width: 1200px;
        height: 445px;
        margin: 0 auto;
        border: 1px solid #dfdfdf;

        h3 {
          background: #ececec;
          margin: 0;
          padding: 6px 15px;
          color: #333;
          border-bottom: 1px solid #dfdfdf;
          font-size: 20.04px;
          line-height: 30.06px;

          span {
            font-size: 14px;
            float: right;

            a {
              color: skyblue;
            }
          }
        }
      }

      .loginform {
        width: 420px;
        height: 400px;
        box-sizing: border-box;
        background: #fff;
        margin: 0 auto;
        position: relative;
        padding: 20px;

        .tab {

          li {
            text-align: center;

            a {
              width: 100%;
              display: block;
              height: 50px;
              line-height: 50px;
              font-size: 20px;
              font-weight: 700;
              color: #333;
              border: 1px solid #ddd;
              box-sizing: border-box;
              text-decoration: none;
            }

            .current {
              border-bottom: none;
            }
          }
        }

        .content {
          width: 380px;
          height: 316px;
          box-sizing: border-box;
          border: 1px solid #ddd;
          border-top: none;
          padding: 18px;

          form {
            margin: 15px 0 18px 0;
            font-size: 12px;
            line-height: 18px;

            .input-text {
              margin-bottom: 16px;

              span {
                float: left;
                width: 37px;
                height: 32px;
                line-height: 32px;
                padding-left: 7px;
                border: 1px solid #ccc;
                box-sizing: border-box;
                border-radius: 2px 0 0 2px;
              }

              input {
                width: 302px;
                height: 32px;
                box-sizing: border-box;
                border: 1px solid #ccc;
                border-left: none;
                float: left;
                padding-top: 6px;
                padding-bottom: 6px;
                font-size: 14px;
                line-height: 22px;
                padding-right: 8px;
                padding-left: 8px;
                border-radius: 0 2px 2px 0;
                outline: none;
              }
            }

            .setting {
              label {
                float: left;
              }

              .forget {
                float: right;
              }
            }

            .btn {
              background-color: skyblue;
              padding: 6px;
              border-radius: 0;
              font-size: 16px;
              font-family: 微软雅黑;
              word-spacing: 4px;
              border: 1px solid skyblue;
              color: #fff;
              width: 100%;
              height: 36px;
              margin-top: 25px;
              outline: none;
            }
          }

          .call {
            margin-top: 30px;

            ul {
              float: left;

              li {
                float: left;
                margin-right: 5px;
                
                a {
                  text-decoration: none;
                }
              }
            }

            .register {
              float: right;
              font-size: 12px;
              line-height: 38px;
            }

            .register:hover {
              color: skyblue;
              text-decoration: none;
            }
          }

        }
      }
    }

    .copyright {
      width: 1200px;
      margin: 0 auto;
      text-align: center;
      line-height: 24px;

      ul {
        li {
          display: inline-block;
          border-right: 1px solid #e4e4e4;
          padding: 0 20px;
          margin: 15px 0;
        }
      }
    }

  }
</style>