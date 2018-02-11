import Element from 'element-ui';

require('./bootstrap');

window.Vue = require('vue');

Vue.use(Element);

Vue.component('posts-list', require('./components/posts/PostsList.vue'));

const app = new Vue({
    el: '#app'
});
