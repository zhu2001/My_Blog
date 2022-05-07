import { createStore } from 'vuex'

export default createStore({
  state: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    ifFetching: false,
    error: false
  },
  getters: {
    getTodoById: (state) => (id) => {
      return state.todos.find(todo => todo.id === id)
    }
  },
  mutations: {
    loginStart (state) {
      state.user = null
      state.isFetching = true
      state.error = false
    },
    loginSuccess (state, typeArr) {
      state.user = typeArr.payload
      state.isFetching = true
      state.error = false
    },
    loginFailure (state) {
      state.user = null
      state.isFetching = false
      state.error = true
    },
    updateStart (state) {
      return {
        ...state,
        isFetching: true
      }
    },
    updateSuccess (state, typeArr) {
      state.user = typeArr.payload
      state.isFetching = false
      state.error = false
    },
    updateFailure (state) {
      state.user = state.user
      state.isFetching = false
      state.error = true
    },
    loginOut (state) {
      state.user = null
      state.isFetching = false
      state.error = false
    },
    deleteAccount (state) {
      state.user = null
      state.isFetching = false
      state.error = false
    }
  },
  actions: {
    loginStart (context, userCredentials) {
      context.commit('loginStart')
    },
    loginSuccess (context, user) {
      context.commit('loginSuccess', {
        payload: user
      })
    },
    loginFailure (context) {
      context.commit('loginFailure')
    },
    loginOut (context) {
      context.commit('loginOut')
    },
    updateStart (context, userCredentials) {
      context.commit('updateStart')
    },
    updateSuccess (context, user) {
      context.commit('updateSuccess', {
        payload: user
      })
    },
    updateFailure (context) {
      context.commit('updateFailure')
    },

  },
})
