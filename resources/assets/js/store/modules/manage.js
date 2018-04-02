import _ from 'lodash';
import Post from './../../models/Post';

const post = new Post();

const state = {
    posts: [],
    activePost: {},
    page: 0,
    pagination: {
        total: 0,
        per_page: 8,
        total_pages: 1,
        current_page: 1
    }
};

const getters = {
    hasActivePost (state) {
        return ! _.isEmpty(state.activePost);
    }
};

const actions = {
    async fetchNext({ commit, state }) {
        if (state.page < state.pagination.total_pages) {
            commit('incrementPage');

            const result = await post.clone().with(['author', 'tags'])
                .orderByDesc('published_at')
                .filter('my')
                .paginate(state.pagination.per_page, state.page);

            commit('addPosts', result.data);
            commit('updatePagination', result.meta.pagination);
        }
    },

    async savePost ({ dispatch }, post) {
        await post.save();
        await dispatch('updateList');
    },
    
    async updateList ({ commit, state }) {
        const result = await post.clone().with(['author', 'tags'])
            .orderByDesc('published_at')
            .filter('my')
            .limit(state.pagination.per_page * state.pagination.current_page)
            .get();

        commit('updateList', result.data);
    },

    async deletedPost ({ commit }, post) {
        await post.delete();

        commit('deletedPost', post);
    },

    async syncPostTags ({ commit }, { post, tags }) {
        let samePost = post.clone();
        samePost.tags.data = tags;
        await samePost.sync('tags');

        commit('replacePost', samePost);
    }
};

const mutations = {
    incrementPage (state) {
        state.page++;
    },

    addPosts (state, posts) {
        state.posts = _.concat(state.posts, posts);
    },

    updateList (state, posts) {
        state.posts = posts;
    },

    updatePagination (state, pagination) {
        state.pagination = pagination;
    },

    deletedPost (state, post) {
        state.posts = _.reject(state.posts, { id: post.id });
    },

    setActivePost (state, post) {
        state.activePost = post;
    },

    replacePost (state, post) {
        let index = _.findIndex(state.posts, { id: post.id });
        state.posts.splice(index, 1, post);
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
