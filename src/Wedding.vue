<template>
  <div class="wedding">
    <img class="dot" src="./images/musicdot.png" @click="handlePlayOrPause"> 
    <div class="homepage pages page0" style="transform: translate(0%, 0%)">
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
    <div class="pages page1" style="transform: translate(0%, 100%)">
      <img class="banner" src="./images/logo.png"> 
      <img src="./images/wedding/mm.jpg" />
    </div>
    <div class="pages page2" style="transform: translate(0%, 200%)">
      <img class="banner" src="./images/logo.png"> 
      <img src="./images/wedding/mm.jpg" />
    </div>
    <div class="pages page3" style="transform: translate(0%, 300%)">
      <img class="banner" src="./images/logo.png"> 
      <img src="./images/wedding/mm.jpg" />
    </div>
    <div class="pages page4" style="transform: translate(0%, 400%)">
      <img class="banner" src="./images/logo.png"> 
      <img src="./images/wedding/mm.jpg" />
    </div>
    <invitation :canOpen="canOpen" @onClose="canOpen = false, hasClosed = true" />
    <audio src="./music/cnm.mp3" id="player" loop autoplay preload />
  </div>
</template>

<script>
  import { swipeInit } from "./utils/swipe"
  import Invitation from './components/Invitation'

  export default {
    props: [],
    components: {
      Invitation
    },
    data () {
      return {
        canOpen: false,
        hasClick: false,
        crtPage: 0,
        pageNum: 5,
        playing: false
      }      
    },
    methods: {
      handleOpenPack () {
        this.canOpen = true;
      },
      handlePlayOrPause() {
        let $audio = document.getElementById('player');
        if(this.playing) {
          $audio.pause();
        } else {
          $audio.play();
        }
      }
    },
    mounted() {
      swipeInit(function(direction) {
        let crt = this.crtPage;
        let num = this.pageNum;        
        let next;
        if(direction === 'up' && (crt + 1) < num) {          
          next = crt + 1;          
        } else if(direction === 'down' && (crt - 1) >= 0){
          next = crt - 1;
        } else {
          return ;
        }
        this.crtPage = next;
        for(let i = 0; i < num; i++) {
          document.querySelector(`.page${i}`).style.transform = `translate(0, ${100 * (i - next)}%)`
        }
      }.bind(this));
      const player = document.querySelector('#player');
      document.addEventListener("WeixinJSBridgeReady", function () { 
        this.hasClick = true;
        player.play(); 
        
      }, false);
      document.body.addEventListener('click', e => {
        if(!this.hasClick) {
          this.hasClick = true;
          player.play();
        }       
      });
      let $audio = document.getElementById('player');
      $audio.addEventListener("playing", function() {
        document.querySelector(`.dot`).className = "dot spin";
        this.playing = true;
      }.bind(this));
      $audio.addEventListener("pause", function() {
        document.querySelector(`.dot`).className = "dot";
        this.playing = false;
      }.bind(this));
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
@keyframes dot_ani {
  0% {
    -webkit-transform: rotate(0deg)
  }
  100% {
    -webkit-transform: rotate(360deg)
  } 
}
@keyframes banner_ani{
  0%, 10%, 20%, 30%, 40%, 50%, 60%, 70%, 80%, 90%, 100% {
    -webkit-transform: scale(1.1);
  } 
  5%, 15%, 25%, 35%, 45%, 55%, 65%, 75%, 85%, 95% { 
    -webkit-transform: scale(1);
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
.wedding{
  position: relative;
  max-width: 568px!important;
  height: 100%;
  min-height: 100%;
  margin: 0 auto;
  perspective: 500px;
  .dot {
    position: absolute;
    right: 15px;
    top: 15px;
    width: 35px;
    height: 35px;    
    z-index: 999;
  }
  .spin {
    -webkit-animation: dot_ani 1s linear infinite;
    animation: dot_ani 1s linear infinite;
  }
  .pages {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    transition: all .8s;
    .banner {
      width: 180px;
      height: 185px;
      margin-top: 50px;
      -webkit-animation: banner_ani 7s infinite;
      animation: banner_ani 7s infinite;
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
