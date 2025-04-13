export const state = () => ({
  performance: null,
  isLoading: false,
});

export const mutations = {
  INIT_DASHBOARD_PERFORMANCE(state, data) {
    state.performance = data;
  },
  INIT_ACTIVITY_LOADING(state, data) {
    state.isLoading = data;
  },
}

export const getters = {
  getDashboardPerformance: (state) => state.performance,
  getActivityLoading: (state) => state.isLoading,
}

export const actions = {
  async initDashboardPerformance({ commit }, payload) {
    try {
      await commit('INIT_ACTIVITY_LOADING', true);

      const res = await this.$axios.$get('api/dashboard/project-performance', payload);

      if (res && res.statusCode === 200) {
        await commit('INIT_DASHBOARD_PERFORMANCE', res.data);
        await commit('INIT_ACTIVITY_LOADING', false);

        return res;
      }
    } catch (error) {
      await commit('INIT_ACTIVITY_LOADING', false);

      throw error;
    }
  },
}