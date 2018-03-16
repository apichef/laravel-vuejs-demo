import Element from 'element-ui';
import locale from 'element-ui/lib/locale/lang/en';
import store from './store';

require('./bootstrap');

window.Vue = require('vue');

Vue.use(Element, { locale });

Vue.component('wall', require('./components/pages/Wall.vue'));
Vue.component('manage-posts', require('./components/pages/ManagePosts.vue'));
Vue.component('quick-links', require('./components/common/QuickLinks.vue'));
Vue.component('pagination', require('./components/common/Pagination.vue'));
Vue.component('save-button', require('./components/common/buttons/SaveButton.vue'));
Vue.component('delete-button', require('./components/common/buttons/DeleteButton.vue'));

const app = new Vue({
    el: '#app',
    store
});
