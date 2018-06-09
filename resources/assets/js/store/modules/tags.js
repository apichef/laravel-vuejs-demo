import Tag from './../../models/Tag';

const tag = new Tag();

const state = {
    all: [],
    hasFetched: false
};

const mutations = {
    setTags (state, tags) {
        state.all = tags;
        state.hasFetched = true;
    }
};

const actions = {
    async fetchAll ({ commit, state }) {
        if (!state.hasFetched) {
            let result = await tag.all();

            commit('setTags', result.data);
        }
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};
