export default {
  namespace:'global',
  state: {
    user: null,
  },
  effects: {
    *fetchCurrentUser({ payload = {} }, { call, put }) {
    },
  },
  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
    },
  },
}
