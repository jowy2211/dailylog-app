export const state = () => ({
  list: [],
  detail: null,
  isLoading: false,
});

export const mutations = {
  INIT_ACTIVITY_LIST(state, data) {
    state.list = data;
  },
  INIT_ACTIVITY_DETAIL(state, data) {
    state.detail = data;
  },
  INIT_ACTIVITY_LOADING(state, data) {
    state.isLoading = data;
  },
}

export const getters = {
  getActivityList: (state) => state.list,
  getActivityDetail: (state) => state.detail,
  getActivityLoading: (state) => state.isLoading,
}

export const actions = {
  async initActivityList({ commit }, payload) {
    try {
      await commit('INIT_ACTIVITY_LOADING', true);

      const res = await this.$axios.$get('api/activities', payload);

      if (res && res.statusCode === 200) {
        await commit('INIT_ACTIVITY_LIST', res.data);
        await commit('INIT_ACTIVITY_LOADING', false);

        return res;
      }
    } catch (error) {
      await commit('INIT_ACTIVITY_LOADING', false);

      throw error;
    }
  },
  async initActivityDetail({ commit }, payload) {
    try {
      await commit('INIT_ACTIVITY_LOADING', true);

      const res = await this.$axios.$get(`api/activities/${payload}`);

      if (res && res.statusCode === 200) {
        await commit('INIT_ACTIVITY_DETAIL', res.data);
        await commit('INIT_ACTIVITY_LOADING', false);

        return res;
      }
    } catch (error) {
      await commit('INIT_ACTIVITY_LOADING', false);

      throw error;
    }
  },
  async initActivityCreate({ commit }, payload) {
    try {
      await commit('INIT_ACTIVITY_LOADING', true);

      const res = await this.$axios.$post('api/activities', payload);

      if (res && res.statusCode === 201) {
        await commit('INIT_ACTIVITY_LOADING', false);

        return res;
      }
    } catch (error) {
      await commit('INIT_ACTIVITY_LOADING', false);

      throw error;
    }
  },
  async initActivityUpdate({ commit }, payload) {
    try {
      await commit('INIT_ACTIVITY_LOADING', true);

      const res = await this.$axios.$patch(`api/activities/${payload.id}`, payload.data);

      if (res && res.statusCode === 200) {
        await commit('INIT_ACTIVITY_DETAIL', res.data);
        await commit('INIT_ACTIVITY_LOADING', false);

        return res;
      }
    } catch (error) {
      await commit('INIT_ACTIVITY_LOADING', false);

      throw error;
    }
  },
  async initActivityRemove({ commit }, payload) {
    try {
      await commit('INIT_ACTIVITY_LOADING', true);
      await this.$axios.$delete(`api/activities/${payload}`);
      await commit('INIT_ACTIVITY_LOADING', false);
    } catch (error) {
      await commit('INIT_ACTIVITY_LOADING', false);

      throw error;
    }
  },
  async initImportActivity({ commit }, payload) {
    try {
      await commit('INIT_ACTIVITY_LOADING', true);
      const res = await this.$axios.$post(`api/file-storage/import?member_id=${payload.member_id}`, payload.formData);

      if (res && res.statusCode === 200) {
        await commit('INIT_ACTIVITY_LOADING', false);
        return res;
      }
    } catch (error) {
      await commit('INIT_ACTIVITY_LOADING', false);

      throw error;
    }
  }
}