<template>
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>欢迎您！</p>
          <p v-if="!name">
            <router-link to="/login">登录</router-link>
            <router-link to="/register" class="register">注册</router-link>
          </p>
          <p v-else>
            <a>{{name}}</a>
            <a class="register" @click="logout">退出登录</a>
          </p>
        </div>
        <div class="typeList">
          <router-link to="/center/myorder">我的订单</router-link>
          <router-link to="/shopcart">我的购物车</router-link>
          <a href="javascript:void(0)">个人中心</a>
          <a href="javascript:void(0)">会员俱乐部</a>
          <a href="javascript:void(0)">企业采购</a>
          <a href="javascript:void(0)">免费开店</a>
          <a href="javascript:void(0)">合作招商</a>
          <a href="javascript:void(0)">商家服务</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link class="logo" title="购物商城" to="/home">
          <img src="./images/logo.png" alt="" />
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge"
            v-model="keyword"
          />
          <button
            class="sui-btn btn-xlarge btn-danger"
            type="button"
            @click="goSearch"
          >
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      keyword: '',
    };
  },
  methods: {
    // 搜索按钮的回调函数：需要向 search 路由进行跳转
    goSearch() {
      let location = { name: "search", params: { keyword: this.keyword || undefined } }
      // 跳转到 Search 路由如果带有 query 参数，将 query 参数也传递给 Search 路由（合并参数）
      if (this.$route.query) {
        location.query = this.$route.query // 此时 location = { name: "search", params: { keyword: this.keyword || undefined }, query }
      }
      this.$router.push(location);
    },
    // 退出登录
    async logout() {
      // 退出登录需要做的事情
      // 1.需要发请求通知服务器退出登录（清除一些数据:token）
      // 2.清除仓库当中的数据（token, userInfo）
      try {
        await this.$store.dispatch('userLogout')
        // 退出成功跳转到home首页
        this.$router.push('/home')
      } catch (error) {
        alert(error.message)
      }
    }
  },
  mounted() {
    // 通过全局事件总线清除关键字
    this.$bus.$on('clear', () => {
      this.keyword = ''
    })
  },
  computed: {
    // 计算出用户名
    name() {
      return this.$store.state.user.userInfo.name
    }
  }
};
</script>

<style scoped lang="less">
  .header {
    & > .top {
      background-color: #eaeaea;
      height: 30px;
      line-height: 30px;

      .container {
        width: 1200px;
        margin: 0 auto;
        overflow: hidden;

        .loginList {
          float: left;

          p {
            float: left;
            margin-right: 10px;

            .register {
              border-left: 1px solid #b3aeae;
              padding: 0 5px;
              margin-left: 5px;
            }
          }

          a:hover {
            text-decoration: none;
            color: skyblue;
          }
        }

        .typeList {
          float: right;

          a {
            padding: 0 10px;

            & + a {
              border-left: 1px solid #b3aeae;
            }
          }

          a:hover {
            text-decoration: none;
            color: skyblue;
          }
        }
      }
    }

    & > .bottom {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .logoArea {
        float: left;

        .logo {
          img {
            width: 175px;
            margin: 25px 45px;
          }
        }
      }

      .searchArea {
        float: right;
        margin-top: 35px;

        .searchForm {
          overflow: hidden;

          input {
            box-sizing: border-box;
            width: 490px;
            height: 32px;
            padding: 0px 4px;
            border: 2px solid skyblue;
            float: left;

            &:focus {
              outline: none;
            }
          }

          button {
            height: 32px;
            width: 68px;
            background-color: skyblue;
            border: none;
            color: #fff;
            float: left;
            cursor: pointer;

            &:focus {
              outline: none;
            }
          }
        }
      }
    }
  }
</style>