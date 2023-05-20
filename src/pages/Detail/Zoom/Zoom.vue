<template>
  <div class="spec-preview">
    <img :src="imgObj.imgUrl" />
    <div class="event" @mousemove="handler"></div>
    <!-- 放大图 -->
    <div class="big">
      <img :src="imgObj.imgUrl" ref="big" />
    </div>
    <!-- 遮罩层 -->
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
  export default {
    name: "Zoom",
    props: ['skuImageList'],
    data() {
      return {
        currentIndex: 0
      }
    },
    computed: {
      imgObj() {
        return this.skuImageList[this.currentIndex] || {}
      }
    },
    // 因为事件绑定过一次，用户触发就会执行，所以在 mounted 中书写全局事件总线代码
    mounted() {
      // 全局事件总线：获取兄弟组件（ImageList 组件）传递过来的 index
      this.$bus.$on('getIndex', (index) => {
        this.currentIndex = index
      })
    },
    methods: {
      handler(event) {
        let mask = this.$refs.mask
        let big = this.$refs.big
        let left = event.offsetX - mask.offsetWidth / 2
        let top = event.offsetY - mask.offsetHeight / 2
        // 约束 mask 的范围
        // mask 向左移动，left 不能小于 0 ，否则会超出左边界
        if (left < 0) left = 0
        // mask 向右移动，left 不能大于一个蒙版层的宽度，否则会超出右边界
        if (left > mask.offsetWidth) left = mask.offsetWidth
        // mask 向上的移动，top 不能小于 0 ，否则会超出上边界
        if (top < 0) top = 0
        // mask 向下移动，top 不能大于一个蒙版层的高度，否则会超出下边界
        if (top > mask.offsetHeight) top = mask.offsetHeight
        // 修改 mask 的 left 和 top
        mask.style.left = left + 'px'
        mask.style.top = top + 'px'
        // 修改 img 的 left 和 top
        big.style.left = -2 * left + 'px'
        big.style.top = -2 * top + 'px'
      }
    }
  }
</script>

<style lang="less">
  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 998;
    }

    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(137, 207, 235, .3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 100%;
      border: 1px solid #aaa;
      overflow: hidden;
      z-index: 998;
      display: none;
      background: white;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .event:hover~.mask,
    .event:hover~.big {
      display: block;
    }
  }
</style>