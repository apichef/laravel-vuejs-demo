import Vue from 'vue';
import Vuex from 'vuex';
import manage from './modules/manage';
import tags from './modules/tags';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        manage,
        tags
    },
    strict: true
});