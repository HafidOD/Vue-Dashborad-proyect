import Vue from 'vue'
import Vuex from 'vuex'

import  createPersistedState  from  'vuex-persistedstate'

Vue.use(Vuex)

// const initialState = () => ({
//   count: 0,
//   Authenticated: false,
//   User: '',
//   })

export default new Vuex.Store({

  state: {
    count: 0,
    Authenticated: false,
    User: ''
  },
  mutations: {
    increment (state) {
      state.count++
    },
    setAuthTrue (state) {
      state.Authenticated = true
    },
    setAuthFalse (state) {
      state.Authenticated = false
    },
    setUser (state, user){
      state.User = user
    },
    userLog(state) {
      state.User = ''
    },
    resetState (state) {
      const initial = initialState()
      Object.keys(initial).forEach(key => { state[key] = initial[key] })
      },
  },
  actions: {
  },
  modules: {
  },
  /* persistir estado de la intancia vuex*/
  plugins: [createPersistedState()]
})
