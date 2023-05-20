<template>
  <div>
    <!-- 三级联动全局组件：已注册为全局组件，因此不需要再引入 -->
    <TypeNav />
    <!-- 局部组件 -->
    <ListContainer />
    <Brand />
    <!-- Floor 这个组件：自己在组件内部是没有发请求的，数据是 Home 父组件给的 -->
    <Floor v-for="floor in floorList" :key="floor.id" :list="floor" />
  </div>
</template>

<script>
  import ListContainer from "@/pages/Home/ListContainer"
  import Floor from "@/pages/Home/Floor"
  import Brand from "@/pages/Home/Brand"
  import { mapState } from 'vuex'

  export default {
    components: {
      ListContainer,
      Floor,
      Brand
    },
    mounted() {
      // 派发 action ，通知 vuex 发送请求，获取数据，存储在仓库中
      this.$store.dispatch('getFloorList')
    },
    computed: {
      ...mapState({
        floorList: (state) => {
          return state.home.floorList
        }
      })
    }
  }
</script>