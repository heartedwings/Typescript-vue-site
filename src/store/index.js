import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase/app';
Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        login_user: null,
    },
    mutations: {
        setLoginUser(state, user) {
            state.login_user = user;
        },
        deleteLoginUser(state) {
            state.login_user = null;
        },
    },
    actions: {
        login() {
            const provider = new firebase.auth.GoogleAuthProvider();
            firebase
                .auth()
                .signInWithRedirect(provider);
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
    },
});
//# sourceMappingURL=index.js.map