import Vue from 'vue';
import App from './App';
import router from './router';
import Ajax from './utils/http';
import { Tab, Tabs, Row, Col, Search, Icon, Swipe, SwipeItem, NavBar, Field, Card, Toast, Button} from 'vant';

Vue.config.productionTip = false;

Vue.use(Ajax)
   .use(Tab).use(Tabs)
   .use(Row).use(Col)
   .use(Icon)
   .use(Search)
   .use(Swipe)
   .use(SwipeItem)
   .use(NavBar)
   .use(Field)
   .use(Card)
   .use(Toast)
   .use(Button)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
});


