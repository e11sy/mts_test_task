import { createApp } from 'vue';
import App from './App.vue';
import router from './application/router'
import i18n from './application/i18n';

const app = createApp(App);

app.use(router);
app.use(i18n);
app.mount('#app');
