import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase/app';
import createPersistedState from 'vuex-persistedstate';
// import gasApi from '../api/gasApi'


Vue.use(Vuex);

// interface RootState {
//   login_user : {
//     displayName:string | null,
//     photoURL:string | null,
//   };
// }

interface itemData {
  title: string,
  category: string,
  amount: number,
  amountI: number,
  amountO: number,
  incomeItems: number,
  outgoItems: number,
  memo: string,
  tMoney: number,
}




export default new Vuex.Store({
  state: {
    login_user: null as firebase.User | null,
    datas: [] as itemData[],
    username: '',
    loggedIn: false,
    //  /** 家計簿データ */
    // Data: {},
    // /** ローディング状態 */
    // loading: {
    //   fetch: false,
    //   add: false,
    //   update: false,
    //   delete: false
    // },
    // /** エラーメッセージ */
    // errorMessage: '',
    // /** 設定 */
    // settings: {
    // /** ～ 省略 ～ */
    // },

  },

  mutations: {
    setLoginUser(state, user) {
      state.login_user = user
    },
    deleteLoginUser(state) {
      state.login_user = null
    },

    addAction (state, item) {
      state.datas.push(item)
    },

    deleteAction (state, i) {
      console.log(i);
      state.datas.splice( i, 1 )
    },


  //   /** ローディング状態をセットします */
  // setLoading (state, { type, v }) {
  //   state.loading[type] = v
  // },

  // /** エラーメッセージをセットします */
  // setErrorMessage (state, { message }) {
  //   state.errorMessage = message
  // },

  // /** 設定を保存します */
  // saveSettings (state, { settings }) {
  //   state.settings = { ...settings }
  //   const { appName, apiUrl, authToken } = state.settings
  //   document.title = appName
  //   gasApi.setUrl(apiUrl)
  //   gasApi.setAuthToken(authToken)
  //   // 家計簿データを初期化
  //   state.Data = {}

  //   localStorage.setItem('settings', JSON.stringify(settings))
  // },

  // /** 設定を読み込みます */
  // loadSettings (state) {
  //   const settings = JSON.parse(localStorage.getItem('settings'))
  //   if (settings) {
  //     state.settings = Object.assign(state.settings, settings)
  //   }
  //   const { appName, apiUrl, authToken } = state.settings
  //   document.title = appName
  //   gasApi.setUrl(apiUrl)
  //   gasApi.setAuthToken(authToken)
  // },


  },

  actions: {
    login() {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase
      .auth()
      .signInWithRedirect(provider)
    },

    logout() {
      firebase
      .auth()
      .signOut();
    },

    setLoginUser({ commit }, user) {
      commit("setLoginUser", user);
    },
    deleteLoginUser({ commit }) {
      commit("deleteLoginUser");
    },

    addAction ({ commit }, item) {
      commit ("addAction", item)
    },

    deleteAction ({ commit }, item) {
      commit ("deleteAction", item)
    },


    // async fetchData ({ commit }, { yearMonth }) {
    //   const type = 'fetch'
    //   commit('setLoading', { type, v: true })
    //   try {
    //     const res = await gasApi.fetch(yearMonth)
    //     commit('setData', { yearMonth, list: res.data })
    //   } catch (e) {
    //     commit('setErrorMessage', { message: e })
    //     commit('setData', { yearMonth, list: [] })
    //   } finally {
    //     commit('setLoading', { type, v: false })
    //   }
    // },
  },
  
  getters: {
    userName: state => state.login_user ? state.login_user.displayName : '',
    photoURL: state=>state.login_user? state.login_user.photoURL : '',
  },


  plugins: [createPersistedState(
    { // ストレージのキーを指定。デフォルトではvuex
      key:
      'dataList',
      // 'anyGreatApp',

      // 管理対象のステートを指定。pathsを書かない時は`modules`に書いたモジュールに含まれるステート全て。`[]`の時はどれも保存されない
      // pathsは保存したいstateを指定
      paths: [
        'datas'
        // 'auth.isLoggedIn',
        // 'master.dataSelected'
      ],

      // ストレージの種類を指定する。デフォルトではローカルストレージ
      // storage: window.sessionStorage
      storage: window.localStorage as Storage
    }
  )],
});


