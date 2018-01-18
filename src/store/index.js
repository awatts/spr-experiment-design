import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  alerts: [],
  experimentName: '',
  manipulations: [
    // e.g. {name: 'foo', items: ['bar', 'baz']},
  ],
  trialCount: 0,
  fillerCount: 0,
  participants: 0
}

const mutations = {
  addManipulation (state, manipulation) {
    state.manipulations.push({name: manipulation.trim(), items: []})
  },
  updateManipulationName (state, update) {
    state.manipulations[update.index].name = update.name.trim()
  },
  removeManipulation (state, index) {
    state.manipulations.splice(index, 1)
  },
  addFactorToManipulation (state, value) {
    state.manipulations[value.index].items.push(value.name.trim())
  },
  removeFactorFromManipulation (state, indices) {
    state.manipulations[indices.parentidx].items.splice(indices.factoridx, 1)
  },
  updateFactorName (state, update) {
    state.manipulations[update.parentidx].items.splice(update.factoridx, 1, update.name.trim())
  },
  setParticipants (state, count) {
    state.participants = count
  },
  setTrialCount (state, count) {
    state.trialCount = count
  },
  setFillerCount (state, count) {
    state.fillerCount = count
  },
  addAlert (state, content) {
    state.alerts.push(content)
  },
  removeAlert (state, index) {
    state.alerts.splice(index, 1)
  }
}

export default new Vuex.Store({
  state,
  mutations,
  strict: process.env.NODE_ENV !== 'production'
})
