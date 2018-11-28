const state = {
  map: ''
}

// mutations
const mutations = {
  setMap (state, status) {
    state.map = status
  }
}

// getters
const getters = {
  map (state) {
    return state.map
  }
}

// actions
const actions = {
  setMap ({ commit }, obj) {
    commit('setMap', obj)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
