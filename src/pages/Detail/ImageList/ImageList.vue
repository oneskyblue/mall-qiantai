<template>
  <div class="swiper-container" ref="mySwiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(slide, index) in skuImageList" :key="slide.id">
        <img :src="slide.imgUrl" :class="{active: currentIndex === index}" @click="changeCurrentIndex(index)" />
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
  import Swiper from "swiper";
  
  export default {
    name: "ImageList",
    props: ["skuImageList"],
    data() {
      return {
        currentIndex: 0
      }
    },
    watch: {
      // 监听数据：可以保证数据返回过来，但是不能保证 v-for 遍历结构是否完成
      skuImageList(newVale, oldVale) {
        // nextTick：在下次 DOM 更新（数据变化更新 DOM）、循环结束（v-for）之后执行延迟回调
        this.$nextTick(() => {
          new Swiper(this.$refs.mySwiper, {
            // swiper 容器显示图片的数量
            slidesPerView: 3,

            // 每一次切换图片的数量
            slidesPerGroup: 2,

            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
        });
      },
    },
    methods: {
      changeCurrentIndex(index) {
        this.currentIndex = index
        // 全局事件总线：将 index 传递给兄弟组件（Zoom 组件）
        this.$bus.$emit('getIndex', index)
      }
    }
  }
</script>

<style lang="less" scoped>
  .swiper-container {
    height: 56px;
    width: 412px;
    box-sizing: border-box;
    padding: 0 12px;

    .swiper-slide {
      width: 56px;
      height: 56px;

      img {
        width: 100%;
        height: 100%;
        border: 1px solid #ccc;
        padding: 2px;
        width: 50px;
        height: 50px;
        display: block;

        &.active {
          border: 2px solid skyblue;
          padding: 1px;
        }
      }
    }

    .swiper-button-next {
      left: auto;
      right: 0;
    }

    .swiper-button-prev {
      left: 0;
      right: auto;
    }

    .swiper-button-next,
    .swiper-button-prev {
      box-sizing: border-box;
      width: 12px;
      height: 56px;
      background: rgb(235, 235, 235);
      border: 1px solid rgb(204, 204, 204);
      top: 0;
      margin-top: 0;
      &::after {
        font-size: 12px;
      }
    }
  }
</style>