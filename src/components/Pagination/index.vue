<template>
  <div class="pagination">
    <!-- 测试使用 -->
    <!-- <h1>{{startNumAndEndNum}}---当前页码{{pageNo}}</h1> -->
    <button :disabled="pageNo === 1" @click="$emit('getPageNo', pageNo - 1)">上一页</button>
    <!-- 分页器上面部分 -->
    <button v-show="startNumAndEndNum.start > 1" @click="$emit('getPageNo', 1)">1</button>
    <button v-show="startNumAndEndNum.start > 2">···</button>

    <!-- 分页器中间部分 -->
    <!-- v-for 遍历数字 -->
    <button v-for="(page, index) in startNumAndEndNum.end" :key="index" v-show="page >= startNumAndEndNum.start" @click="$emit('getPageNo', page)" :class="{active: pageNo === page}">{{page}}</button>

    <!-- 分页器下面部分 -->
    <button v-show="startNumAndEndNum.end < pageTotal - 1">···</button>
    <button v-show="startNumAndEndNum.end < pageTotal" @click="$emit('getPageNo', pageTotal)">{{pageTotal}}</button>
    <button :disabled="pageNo === pageTotal" @click="$emit('getPageNo', pageNo + 1)">下一页</button>

    <button style="margin-left: 30px">共 {{total}} 条</button>
  </div>
</template>

<script>
  export default {
    name: 'Pagination',
    props: ['pageNo', 'pageSize', 'total', 'continues'],
    computed: {
      // 计算出总共多少页
      pageTotal() {
        // Math.ceil() 向上取整
        return Math.ceil(this.total / this.pageSize)
      },
      // 计算出连续页码的起始数字和结束数字
      startNumAndEndNum() {
        // 定义两个变量存储起始数字与结束数字
        let start = 0, end = 0
        // 如果总页数小于连续页码数
        if (this.pageTotal < this.continues) {
          start = 1
          end = this.pageTotal
        } else {
          // 如果总页数大于连续页码数
          start = this.pageNo - parseInt(this.continues / 2)
          end = this.pageNo + parseInt(this.continues / 2)
          // 不正常的现象（start 不能等于 0 和 负数）
          if (start < 1) {
            start = 1
            end = this.continues
          }
          // 不正常的现象（end 不能大于 pageTotal）
          if (end > this.pageTotal) {
            start = this.pageTotal - this.continues + 1
            end = this.pageTotal
          }
        }
        return { start, end }
      }
    }
  }
</script>

<style scoped lang="less">
  .pagination {
    text-align: center;
    button {
      margin: 0 5px;
      background-color: #f4f4f5;
      color: #606266;
      outline: none;
      border-radius: 2px;
      padding: 0 4px;
      vertical-align: top;
      display: inline-block;
      font-size: 13px;
      min-width: 35.5px;
      height: 28px;
      line-height: 28px;
      cursor: pointer;
      box-sizing: border-box;
      text-align: center;
      border: 0;

      &[disabled] {
        color: #c0c4cc;
        cursor: not-allowed;
      }

      &.active {
        cursor: not-allowed;
        background-color: skyblue;
        color: #fff;
      }
    }
  }

  .active {
    background-color: skyblue;
  }
</style>