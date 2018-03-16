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
        total_pages: 1
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

    async savePost ({ commit }, post) {
        await post.save();

        commit('updatePost', post);
    },

    async deletedPost ({ commit }, post) {
        await post.delete();

        commit('deletedPost', post);
    }
};

const mutations = {
    incrementPage (state) {
        state.page++;
    },

    addPosts (state, posts) {
        state.posts = _.concat(state.posts, posts);
    },

    updatePost (state, post) {
        let posts = _.clone(state.posts);
        const found = _.find(posts, { id: post.id });
        const index = _.indexOf(posts, found);
        posts[index] = post;

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
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
