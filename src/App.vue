<template>
  <div id="app">
      <button type="button" class="menu-btn" v-on:click="open=!open">
      <i class="fa fa-bars" aria-hidden="true"></i>
    </button>
    <div class="menu" v-bind:class="{'is-active' : open }">
      <div class="menu__item"><router-link to="/HOME">HOME</router-link></div>
      <div class="menu__item">ABOUT</div>
      <div class="menu__item">MESSASE</div>
    </div>
    
    <router-link to="/Home">Home</router-link>

    <div>
      <img v-if="photoURL" :src="photoURL" />
    </div>
    <div>
      {{userName}}
    </div>

    <router-view/>

  </div>
</template>

<script lang="ts">
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      open: false
    }
  },

  computed: {
    ...mapGetters (["userName", "photoURL"])
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

/*----------------------------
* メニュー開閉ボタン
*----------------------------*/
.menu-btn{
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 3;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #333;
  color: #fff;
}

/*----------------------------
* メニュー本体
*----------------------------*/
.menu{
  position: fixed;
  top: 0;
  right: 0;
  z-index: 1;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #555;
}
.menu__item{
  width: 100%;
  height: auto;
  padding: .5em 1em;
  text-align: center;
  color: #fff;
  box-sizing: border-box;
}

/*----------------------------
* アニメーション部分
*----------------------------*/

/* アニメーション前のメニューの状態 */
.menu{
  transform: translateX(100%);
  transition: all .3s linear;
}
/* アニメーション後のメニューの状態 */
.menu.is-active{
  transform: translateX(0);
}

</style>
