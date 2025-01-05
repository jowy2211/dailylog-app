export const state = () => ({
  list: [],
  detail: null,
  isLoading: false,
});

export const mutations = {
  INIT_PROJECT_LIST(state, data) {
    state.list = data;
  },
  INIT_PROJECT_DETAIL(state, data) {
    state.detail = data;
  },
  INIT_PROJECT_LOADING(state, data) {
    state.isLoading = data;
  },
}

export const getters = {
  getProjectList: (state) => state.list,
  getProjectDetail: (state) => state.detail,
  getProjectLoading: (state) => state.isLoading,
}

export const actions = {
  async initPortalProjectList({ commit }, payload) {
    try {
      await commit('INIT_PROJECT_LOADING', true);

      const res = await this.$axios.$get('api/projects/portal', payload);

      if (res && res.statusCode === 200) {
        await commit('INIT_PROJECT_LIST', res.data);
        await commit('INIT_PROJECT_LOADING', false);

        return res;
      }
    } catch (error) {
      await commit('INIT_PROJECT_LOADING', false);
      throw error;
    }
  },
  async initProjectList({ commit }, payload) {
    try {
      await commit('INIT_PROJECT_LOADING', true);

      const res = await this.$axios.$get('api/projects', payload);

      if (res && res.statusCode === 200) {
        await commit('INIT_PROJECT_LIST', res.data);
        await commit('INIT_PROJECT_LOADING', false);

        return res;
      }
    } catch (error) {
      await commit('INIT_PROJECT_LOADING', false);

      throw error;
    }
  },
  async initProjectDetail({ commit }, payload) {
    try {
      await commit('INIT_PROJECT_LOADING', true);

      const res = await this.$axios.$get(`api/projects/${payload}`);

      if (res && res.statusCode === 200) {
        await commit('INIT_PROJECT_DETAIL', res.data);
        await commit('INIT_PROJECT_LOADING', false);

        return res;
      }
    } catch (error) {
      await commit('INIT_PROJECT_LOADING', false);

      throw error;
    }
  },
  async initProjectCreate({ commit }, payload) {
    try {
      await commit('INIT_PROJECT_LOADING', true);

      const res = await this.$axios.$post('api/projects', payload);

      if (res && res.statusCode === 201) {
        await commit('INIT_PROJECT_LOADING', false);

        return res;
      }
    } catch (error) {
      await commit('INIT_PROJECT_LOADING', false);

      throw error;
    }
  },
  async initProjectUpdate({ commit }, payload) {
    try {
      await commit('INIT_PROJECT_LOADING', true);

      const res = await this.$axios.$patch(`api/projects/${payload.id}`, payload.data);

      if (res && res.statusCode === 200) {
        await commit('INIT_PROJECT_DETAIL', res.data);
        await commit('INIT_PROJECT_LOADING', false);

        return res;
      }
    } catch (error) {
      await commit('INIT_PROJECT_LOADING', false);

      throw error;
    }
  },
  async initProjectUpdateStatus({ commit, state }, payload) {
    try {
      await commit('INIT_PROJECT_LOADING', true);

      const res = await this.$axios.$patch(`api/projects/status/${payload.id}`, payload.data);

      if (res && res.statusCode === 200) {
        await commit('INIT_PROJECT_DETAIL', { ...state.detail, ...res.data });
        await commit('INIT_PROJECT_LOADING', false);

        return res;
      }
    } catch (error) {
      await commit('INIT_PROJECT_LOADING', false);

      throw error;
    }
  },
  async initProjectRemove({ commit }, payload) {
    try {
      await commit('INIT_PROJECT_LOADING', true);
      await this.$axios.$delete(`api/projects/${payload}`);
      await commit('INIT_PROJECT_LOADING', false);
    } catch (error) {
      await commit('INIT_PROJECT_LOADING', false);

      throw error;
    }
  },
}