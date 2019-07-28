import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'

Vue.use(Vuex)

// 应用初始状态
const state = {
  signInDialogVisible: false,
  user:{},
  unReadNum:0
}

// 定义所需的 mutations
const mutations = {
  signInDialogVisibleTrue(state) {
    state.signInDialogVisible = true;
  },
  signInDialogVisibleFalse(state) {
    state.signInDialogVisible = false;
  },
  setHeadImg(state,stark){
    state.user = stark.user;
  },
  setUnReadNum(state,stark){
    state.unReadNum = stark.num;
  }
};

// 创建 store 实例
export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations
})
