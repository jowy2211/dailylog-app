export const state = () => ({
  performance: null,
  workload: null,
  productivity: null,
  activityTrend: null,
  isLoading: false,
});

export const mutations = {
  INIT_DASHBOARD_PERFORMANCE(state, data) {
    state.performance = data;
  },
  INIT_DASHBOARD_WORKLOAD(state, data) {
    state.workload = data;
  },
  INIT_DASHBOARD_PRODUCTIVITY(state, data) {
    state.productivity = data;
  },
  INIT_DASHBOARD_ACTIVITY_TREND(state, data) {
    state.activityTrend = data;
  },
  INIT_ACTIVITY_LOADING(state, data) {
    state.isLoading = data;
  },
}

export const getters = {
  getDashboardPerformance: (state) => state.performance,
  getDashboardWorkload: (state) => state.workload,
  getDashboardProductivity: (state) => state.productivity,
  getDashboardActivityTrend: (state) => state.activityTrend,
  getDashboardLoading: (state) => state.isLoading,
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
  async initDashboardWorkload({ commit }, payload) {
    try {
      await commit('INIT_ACTIVITY_LOADING', true);

      const res = await this.$axios.$get('api/dashboard/workload', payload);

      if (res && res.statusCode === 200) {
        await commit('INIT_DASHBOARD_WORKLOAD', res.data);
        await commit('INIT_ACTIVITY_LOADING', false);

        return res;
      }
    } catch (error) {
      await commit('INIT_ACTIVITY_LOADING', false);

      throw error;
    }
  },
  async initDashboardProductivity({ commit }, payload) {
    try {
      await commit('INIT_ACTIVITY_LOADING', true);

      const res = await this.$axios.$get('api/dashboard/productivity', payload);

      if (res && res.statusCode === 200) {
        await commit('INIT_DASHBOARD_PRODUCTIVITY', res.data);
        await commit('INIT_ACTIVITY_LOADING', false);

        return res;
      }
    } catch (error) {
      await commit('INIT_ACTIVITY_LOADING', false);

      throw error;
    }
  },
  async initDashboardTrend({ commit }, payload) {
    try {
      await commit('INIT_ACTIVITY_LOADING', true);

      const res = await this.$axios.$get('api/dashboard/activity-trend', payload);

      if (res && res.statusCode === 200) {
        await commit('INIT_DASHBOARD_ACTIVITY_TREND', res.data);
        await commit('INIT_ACTIVITY_LOADING', false);

        return res;
      }
    } catch (error) {
      await commit('INIT_ACTIVITY_LOADING', false);

      throw error;
    }
  },
}