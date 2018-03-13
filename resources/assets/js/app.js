import Element from 'element-ui';
import locale from 'element-ui/lib/locale/lang/en';

require('./bootstrap');

window.Vue = require('vue');

Vue.use(Element, { locale });

Vue.component('wall', require('./components/pages/Wall.vue'));
Vue.component('manage-posts', require('./components/pages/ManagePosts.vue'));
Vue.component('quick-links', require('./components/common/QuickLinks.vue'));
Vue.component('pagination', require('./components/common/Pagination.vue'));

const app = new Vue({
    el: '#app'
});
