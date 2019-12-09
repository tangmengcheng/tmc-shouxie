import Vue from 'vue';
import Vuex from './vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    // 存储状态
    state: {
        num: 0
    },
    // 获取状态
    getters: {
        getNum(state) {
            return state.num;
        }
    },
    // 同步更新状态
    mutations: {
        // 增加
        increate(state, payload) {
            state.num += payload;
        },
        // 减少
        minus(state, payload) {
            state.num -= payload;
        }
    },
    // 异步更新状态
    actions: {
        // 异步
        asyncIncreate({commit}, payload) {
            setTimeout(() => {
                commit('increate', payload);
            }, 1000);
        }
    }
});
