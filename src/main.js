import { createApp, h } from 'vue'
import App from './App.vue'
import iconArrow from './components/parts/iconArrow.vue';
import iconChevron from './components/parts/iconChevron.vue';
import iconStar from './components/parts/iconStar.vue';
import iconTimes from './components/parts/iconTimes.vue';

const app = createApp(App);

app.component('icon-arrow', iconArrow);
app.component('icon-chevron', iconChevron);
app.component('icon-star', iconStar);
app.component('icon-times', iconTimes);

const vm = app.mount('#app');
