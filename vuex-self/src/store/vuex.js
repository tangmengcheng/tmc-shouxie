let Vue;
class Store {
  constructor(options) {
    window.console.log(options)
    // 因为数据要双向绑定
    this.vm = new Vue({
      data: {
        state: options.state 
      }
    })
    // for getters
    let getters = options.getters || {}; // 外面传过来的getters
    this.getters = {}; // 当前实例的getters属性
    Object.keys(getters).forEach(getterName => {
      // 在当前getters上添加方法
      Object.defineProperty(this.getters, getterName, {
        get: () => {
          return getters[getterName](this.state);
        }
      })
    })
    // for mutations
    let mutations = options.mutations || {};
    this.mutations = {};
    Object.keys(mutations).forEach(mutationName => {
      this.mutations[mutationName] = payload => {
          mutations[mutationName](this.state, payload);
      }
    })
    // for actions
    let actions = options.actions || {};
    this.actions = {};
    Object.keys(actions).forEach(actionName => {
      this.actions[actionName] = payload => {
          actions[actionName](this, payload);
      }
    })
  }
  // 调用mutation 同步
  commit = (method, payload) => {
    this.mutations[method](payload);
  }
  // 调用dispatch 异步
  dispatch(method, payload) {
    this.actions[method](payload);
  }
  get state() {
    return this.vm.state;
  }
}
const install = v => {
  window.console.log(v);
  Vue = v;
  Vue.mixin({
    // 需要在每个组件上添加$store
    beforeCreate() {
      window.console.log(this.$options.name);
      // 首先进跟组件
      if(this.$options && this.$options.store) {
        this.$store = this.$options.store;
      } else {
        // 不是根节点
        this.$store = this.$parent && this.$parent.$store;
      }
    },
  })
};

export default {
  install,
  Store
};
