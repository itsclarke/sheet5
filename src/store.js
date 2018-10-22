import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    bill: {},
    bills: []
  },
  getters: {
    // TODO: 
    // *thought* make dynamic filter function
    // return categories
    // return bill names
    // return bill prices
    // return owed debt objects
  },
  mutations: {
    updateBills (state, payload) {
      state.bills = payload
    },
    addBill (state, payload) {
      state.bills.push(payload)
    }
  }
})
