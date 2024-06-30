export const state = () => ({
  snackbar: {
    status: false,
    message: 'This is snackbar',
    type: 'info',
  },
  dialog: {
    status: false,
    title: 'Alert!',
    description: 'Process the action ?',
  },
});

export const mutations = {
  INIT_SNACKBAR(state, data) {
    state.snackbar = data;
  },
  INIT_DIALOG(state, data) {
    state.dialog = data;
  },
}

export const getters = {
}

export const actions = {
  async initSnackbar({ commit }, payload) {
    await commit('INIT_SNACKBAR', payload)
  },
  async initDialog({ commit }, payload) {
    await commit('INIT_DIALOG', payload)
  },
}