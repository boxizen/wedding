<template>
  <div class="wedding">
    <div class="homepage pages">
      <img class="banner" src="./images/logo.png"> 
      <div class="content">
        <div class="person-girl">
          <img class="lego" src="./images/girl_bat.png">
          <img class="sunflower" src="./images/sunflower.png">
          <i class="eye eye-left" />
          <i class="eye eye-right" />
        </div>
        <div class="person-boy">
          <div class="bubble">
            左胸口袋有一份请帖，快打开看看吧!
            <i style="width: 16px; height: 16px; color: #FFF; border-width: 0px 10px 0px 0px; border-style: dashed; border-color: #FFF; position: absolute; bottom: -14px; left: 12px; border-radius: 0px 0px 32px;"></i>
          </div>
          <img class="lego" src="./images/boy_bat.png">
          <img class="ebow" src="./images/ebow.png">
          <img class="mouse" src="./images/mouse.png">
          <img class="redpack" src="./images/pack.png" @click="handleOpenPack">
          <img class="cao" src="./images/plant.png">
        </div>
      </div>
      <div class="logo">        
        <img style="width: 120px;" src="./images/wedding.png" />
      </div>
      <div class="timewrap">
        <img style="width: 220px;" src="./images/titlewrap.png" />
        <h3 class="datetime">2020.03.17</h3>
      </div>      
      <div class="bottom">
        <img class="plant plant1" src="./images/plant1.png" />
        <img class="plant plant2" src="./images/plant2.png" />
        <img class="plant plant3" src="./images/plant3.png" />
        <img class="plant plant4" src="./images/plant4.png" />
        <img class="plant plant5" src="./images/plant5.png" />
      </div>
    </div>
    <!-- <div class="pages">
      <img class="banner" src="./images/logo.png"> 
      <img src="./images/wedding/fuckhorse3.jpg" />
    </div> -->
    <invitation :canOpen="canOpen" @onClose="canOpen = false, hasClosed = true" />
  </div>
</template>

<script>
  // import Editor from "./components/Editor.vue"
  import Invitation from './components/Invitation'

  export default {
    props: [],
    components: {
      Invitation
    },
    data () {
      return {
        canOpen: false
      }      
    },
    methods: {
      handleOpenPack () {
        this.canOpen = true;
      }
    },
    name: 'Wedding'
  }

</script>

<style lang="less">
@import './assets/base.less';
@import './assets/bg.less';
@import './assets/lego.less';
@import './assets/plant.less';
html,
body{
  height: 100%;
  overflow: hidden;
}
.wedding{
  position: relative;
  max-width: 568px!important;
  height: 100%;
  min-height: 100%;
  margin: 0 auto;
  perspective: 500px;
  .pages {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    .banner {
      width: 180px;
      height: 185px;
      margin-top: 50px;
    }
    .content {
      transform: scale(0.65);
      position: relative;
      width: 275px;
      height: 180px;
    }
    .timewrap {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      .datetime {
        position: absolute;
        color: #586371;
        font-weight: bold;
        font-size: 14px;
        margin-top: 40px;
        font-family: fantasy, monospace, serif;
        top: -10px;
      }
    }    
    @keyframes bubble_ani{
      0%, 100% {
        -webkit-transform: scale(0);
      } 
      10%, 80% { 
        -webkit-transform: scale(1);
      }
    }
    .bubble {
      position: absolute;
      width: 170px;
      top: -90px;
      right: -25px;
      // background: #586371;
      background: #FFF;
      padding: 15px;
      // font-weight: bold;
      border-radius: 8px;
      // color: #FFF;
      color: #000;
      // border: 1px dashed #586371;
      font-size: 16px;
      // opacity: 0.75;
      transform-origin: 0% 100%;
      -webkit-animation: bubble_ani 3s infinite;
      animation: bubble_ani 3s infinite;
    }
  }
}
</style>
