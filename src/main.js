import { createApp } from "vue";
import App from "./App.vue";
import mitt from 'mitt';

const emitter = mitt();
import router from "./router";

const app = createApp(App)
app.config.globalProperties.$userEmail = '';
app.config.globalProperties.emitter = emitter;

app.use(router).mount("#app");
import './assets/style.css';