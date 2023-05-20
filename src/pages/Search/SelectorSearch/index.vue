<template>
  <div class="clearfix selector">
    <div class="type-wrap logo">
      <div class="fl key brand">品牌</div>
      <div class="value logos">
        <!-- 品牌的地方 -->
        <ul class="logo-list">
          <li v-for="trademark in trademarkList" :key="trademark.tmId" @click="trademarkHandler(trademark)">{{trademark.tmName}}</li>
        </ul>
      </div>
    </div>
    <!-- 平台售卖属性的地方 -->
    <div class="type-wrap" v-for="attr in attrsList" :key="attr.attrId">
      <!-- 平台售卖属性的 key -->
      <div class="fl key">{{attr.attrName}}</div>
      <!-- 平台售卖属性的 value -->
      <div class="fl value">
        <ul class="type-list">
          <li v-for="(attrValue, index) in attr.attrValueList" :key="index" @click="attrInfo(attr, attrValue)">
            <a>{{attrValue}}</a>
          </li>
        </ul>
      </div>
      <div class="fl ext"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'SelectorSearch',
  computed: {
    ...mapGetters(['trademarkList', 'attrsList'])
  },
  methods: {
    // 品牌的事件处理函数
    // 点击了品牌，还是需要整理参数，向服务器发送请求获取相应的数据进行展示
    // 父组件中的 searchParams 参数是带给服务器参数，子组件把点击的品牌信息需要给父组件传递过去（这里用的自定义事件）
    trademarkHandler(trademark) {
      this.$emit('trademarkInfo', trademark)
    },
    // 平台售卖属性值的事件处理函数
    attrInfo(attr, attrValue) {
      // 父组件中的 searchParams 参数是带给服务器参数，子组件把点击的平台售卖属性信息需要给父组件传递过去（这里用的自定义事件
      //  ["属性ID:属性值:属性名"]
      this.$emit('attrInfo', attr, attrValue)
    }
  }
};
</script>

<style scoped lang="less">
.selector {
  border: 1px solid #ddd;
  margin-bottom: 5px;
  overflow: hidden;
  .logo {
    border-top: 0;
    margin: 0;
    position: relative;
    overflow: hidden;
    .key {
      padding-bottom: 87px !important;
    }
  }
  .type-wrap {
    margin: 0;
    position: relative;
    border-top: 1px solid #ddd;
    overflow: hidden;
    .key {
      width: 100px;
      background: #f1f1f1;
      line-height: 26px;
      text-align: right;
      padding: 10px 10px 0 15px;
      float: left;
    }
    .value {
      overflow: hidden;
      padding: 10px 0 0 15px;
      color: #333;
      margin-left: 120px;
      padding-right: 90px;
      .logo-list {
        li {
          float: left;
          border: 1px solid #e4e4e4;
          margin: -1px -1px 0 0;
          width: 105px;
          height: 52px;
          text-align: center;
          line-height: 52px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-weight: 700;
          color: skyblue;
          font-style: italic;
          font-size: 14px;
          img {
            max-width: 100%;
            vertical-align: middle;
          }
        }
      }
      .type-list {
        li {
          float: left;
          display: block;
          margin-right: 30px;
          line-height: 26px;
          a {
            text-decoration: none;
            color: #666;
          }
        }
      }
    }
  }
}
</style>