export const state = () => ({
  list: [],
  detail: null,
  isLoading: false,
  employees: [],
  members: [],
  roles: [],
  position: [],
});

export const mutations = {
  INIT_USER_LIST(state, data) {
    state.list = data;
  },
  INIT_USER_DETAIL(state, data) {
    state.detail = data;
  },
  INIT_USER_LOADING(state, data) {
    state.isLoading = data;
  },
  INIT_EMPLOYEE_LIST(state, data) {
    state.employees = data;
  },
  INIT_ADD_MEMBER(state, data) {
    state.members = data
  },
  INIT_ROLE_LIST(state, data) {
    state.roles = data;
  },
  INIT_POSITION_LIST(state, data) {
    state.position = data;
  },
}

export const getters = {
  getUserList: (state) => state.list,
  getUserDetail: (state) => state.detail,
  getUserLoading: (state) => state.isLoading,
  getEmployeeList: (state) => state.employees,
  getMemberList: (state) => state.members,
  getRoleList: (state) => state.roles,
  getPositionList: (state) => state.position,
}

export const actions = {
  async initUserList({ commit }, payload) {
    try {
      await commit('INIT_USER_LOADING', true);

      const res = await this.$axios.$get('api/users', payload);

      if (res && res.statusCode === 200) {
        await commit('INIT_USER_LIST', res.data);
        await commit('INIT_USER_LOADING', false);

        return res;
      }
    } catch (error) {
      await commit('INIT_USER_LOADING', false);

      throw error;
    }
  },
  async initUserDetail({ commit }, payload) {
    try {
      await commit('INIT_USER_LOADING', true);

      const res = await this.$axios.$get(`api/users/${payload}`);

      if (res && res.statusCode === 200) {
        await commit('INIT_USER_DETAIL', res.data);
        await commit('INIT_USER_LOADING', false);

        return res;
      }
    } catch (error) {
      await commit('INIT_USER_LOADING', false);

      throw error;
    }
  },
  async initUserCreate({ commit }, payload) {
    try {
      await commit('INIT_USER_LOADING', true);

      const res = await this.$axios.$post('api/users/', payload);

      if (res && res.statusCode === 201) {
        await commit('INIT_USER_DETAIL', res.data);
        await commit('INIT_USER_LOADING', false);

        return res;
      }
    } catch (error) {
      await commit('INIT_USER_LOADING', false);

      throw error;
    }
  },
  async initUserUpdate({ commit }, payload) {
    try {
      await commit('INIT_USER_LOADING', true);

      const res = await this.$axios.$patch(`api/users/${payload.id}`, payload.data);

      if (res && res.statusCode === 200) {
        await commit('INIT_USER_DETAIL', res.data);
        await commit('INIT_USER_LOADING', false);

        return res;
      }
    } catch (error) {
      await commit('INIT_USER_LOADING', false);

      throw error;
    }
  },
  async initUserRemove({ commit }, payload) {
    try {
      await commit('INIT_USER_LOADING', true);

      await this.$axios.$delete(`api/users/${payload}`);

      await commit('INIT_USER_LOADING', false);
    } catch (error) {
      await commit('INIT_USER_LOADING', false);

      throw error;
    }
  },
  async initEmployeeList({ commit }, payload) {
    try {
      await commit('INIT_USER_LOADING', true);

      const res = await this.$axios.$get('api/employees', payload);

      if (res && res.statusCode === 200) {
        await commit('INIT_EMPLOYEE_LIST', res.data);
        await commit('INIT_USER_LOADING', false);

        return res;
      }
    } catch (error) {
      await commit('INIT_USER_LOADING', false);

      throw error;
    }
  },
  async initRoleList({ commit }, payload) {
    try {
      await commit('INIT_USER_LOADING', true);

      const res = await this.$axios.$get('api/roles', payload);

      if (res && res.statusCode === 200) {
        await commit('INIT_ROLE_LIST', res.data);
        await commit('INIT_USER_LOADING', false);

        return res;
      }
    } catch (error) {
      await commit('INIT_USER_LOADING', false);

      throw error;
    }
  },
  async initPositionList({ commit }, payload) {
    try {
      await commit('INIT_USER_LOADING', true);

      const res = await this.$axios.$get('api/positions', payload);

      if (res && res.statusCode === 200) {
        await commit('INIT_POSITION_LIST', res.data);
        await commit('INIT_USER_LOADING', false);

        return res;
      }
    } catch (error) {
      await commit('INIT_USER_LOADING', false);

      throw error;
    }
  },
  async initAddMember({ commit, state }, payload) {
    const employees = [...state.employees];
    
    await commit(
      'INIT_EMPLOYEE_LIST',
      employees.filter((item) => item.value !== payload.employee.value),
    );
    
    await commit('INIT_ADD_MEMBER', [...state.members, payload]);
  },
  async initRemoveMember({ commit, state }, payload) {
    const members = [...state.members];

    await commit(
      'INIT_EMPLOYEE_LIST',
      [...state.employees, payload]
    );

    await commit(
      'INIT_ADD_MEMBER',
      members.filter((item) => item.employee.value !== payload.value),
    );
  }
}