<template>
  <div>
    <Header></Header>
    <!-- 路由组件出口的地方 -->
    <router-view></router-view>
    <!-- <Footer v-show="$route.path === '/home' || $route.path === '/search'"></Footer> -->
    <!-- 非路由组件 Footer 在路由组件 Home Search 显示，在路由组件 Login Register 隐藏 -->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
  import Header from './components/Header';
  import Footer from './components/Footer'

  export default {
    name: '',
    components: { Header, Footer },
    mounted() {
      // 派发 action ，通知 Vuex 发请求，获取数据，存储在仓库中
      this.$store.dispatch("getCategoryList")
    }
  }
</script>