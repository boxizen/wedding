<template>
  <div class="wedding-editor" ref="editor">
    <header class="editor-header">
        <a href="javascript:;"></a>
        <a href="javascript:;" class="minimum"></a>
        <a href="javascript:;" class="maximum"></a>
    </header>
    <!-- 打开邀请函 -->
    <div
      class="editor-open"
      @click="canOpen = true"
    >
      <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="9" y1="3" x2="9" y2="21"></line>
      </svg>
    </div>

    <!-- <Executions :canExecute="canExecute" @onUpdating="scrollToBottom" @onFinish="canOpen = true"/> -->
    <invitation :canOpen="canOpen" @onClose="canOpen = false, hasClosed = true" @sendBarrage="onAfterSending"/>
    <!-- <Barrage :wish="wish" :canStart="canStart"/> -->
  </div>
</template>

<script>
  import Prism from 'prismjs'
  import 'prismjs/themes/prism-okaidia.css'
  import '../utils/raf'
  import data from '../mock/data'

  // import Executions from './Executions'
  import Invitation from './Invitation'
  // import Barrage from './Barrage'

  export default {
    name: 'Editor',
    components: { Invitation },
    data() {
      return {
        startDate: '',
        code: data.code,
        currentCode: '',
        isCursorVisible: 1,
        canExecute: false,
        canOpen: false,
        wish: '',
        hasClosed: false,
        canStart: false
      }
    },
    created() {
      this.startDate = (new Date()).toDateString()
    },
    methods: {
      // 发送弹幕之后
      onAfterSending(wish) {
        this.wish = wish
        this.canOpen = false
        setTimeout(() => {
          this.canStart = true
        }, 800)
      }
    }
  }
</script>

<style lang="less">
.wedding-editor{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 15px;
  padding-top: 50px;
  overflow-x: hidden;
  overflow-y: auto;
  z-index: 1;
  transform-origin: 0 0;
  -webkit-transform-origin: 0 0;
  transition: all 1.6s cubic-bezier(0.4, 0, 1, 1);
  -webkit-transition: all 1.6s cubic-bezier(0.4, 0, 1, 1);
  .editor-header{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    padding: 12px;
    overflow: hidden;
    background: #2B2B48;
    z-index: 3;
    >a{
      float: left;
      display: block;
      width: 16px;
      height: 16px;
      margin-right: 5px;
      border-radius: 8px;
      background: #FC615D;
      &.minimum{
        background: #FDBC40;
      }
      &.maximum{
        background: #34C84A;
      }
    }
  }
  p.code{
    margin: 0;
    color: #BBB;
    line-height: 1.2;
    font-family: 'Roboto Mono', 'Menlo', 'Monaco', Courier, monospace !important;
    font-weight: 500 !important;
    font-size: 16px!important;
  }
  pre{
    margin: 0;
    white-space: pre-wrap;
    code{
      white-space: pre-wrap;
      word-break: break-all;
      font-size: 16px!important;
      margin: 0;
      color: #BBB;
      line-height: 1.2;
      font-family: 'Roboto Mono', 'Menlo', 'Monaco', Courier, monospace !important;
      font-weight: 500 !important;
      background: transparent;
    }
  }
  .editor-open{
    position: fixed;
    right: 20px;
    bottom: 20px;
    width: 40px;
    height: 40px;
    padding: 6px;
    border-radius: 20px;
    text-align: center;
    line-height: 18px;
    border: 5px solid #ffd69b;
    color: #a9895d;
    background: #FFF1DE;
    z-index: 1000;
  }
}
</style>