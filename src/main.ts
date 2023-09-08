import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
/*
    Bootstrap CSS, JS
 */
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.js";
/*
    Font awesome icons
 */
import "../node_modules/@fortawesome/fontawesome-free/css/all.css";

import './styles.css'; // main css file


const app = createApp(App);

app.use(router);

app.mount('#app');
