import Element from 'element-ui';

require('./bootstrap');

window.Vue = require('vue');

Vue.use(Element);

Vue.component('wall', require('./components/pages/Wall.vue'));

const app = new Vue({
    el: '#app'
});
