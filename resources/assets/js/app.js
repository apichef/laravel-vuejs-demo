import Element from 'element-ui';
import locale from 'element-ui/lib/locale/lang/en';
import store from './store';

require('./bootstrap');

window.Vue = require('vue');

Vue.use(Element, { locale });

Vue.component('wall', require('./components/pages/Wall.vue').default);
Vue.component('manage-posts', require('./components/pages/ManagePosts.vue').default);
Vue.component('quick-links', require('./components/common/QuickLinks.vue').default);
Vue.component('pagination', require('./components/common/Pagination.vue').default);
Vue.component('save-button', require('./components/common/buttons/SaveButton.vue').default);
Vue.component('delete-button', require('./components/common/buttons/DeleteButton.vue').default);

const app = new Vue({
    el: '#app',
    store
});
