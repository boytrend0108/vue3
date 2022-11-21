import { createApp } from 'vue' // 1.import createApp from vue
import App from './App' //3.Import comp App.vue

const app = createApp(App);

//---Global registration UI 
import components from '@/components/UI'
components.forEach(component => {
    app.component(component.name, component)// Global registration UI 
})
//---Global registration directives
import directives from '@/directives';
directives.forEach(directive => {
    app.directive(directive.name, directive)// global registration of directivs
});

import router from '@/router/router';
import store from '@/store';
app
    .use(router)
    .use(store)
    .mount('#app')// 2.create app and mount it in div #app
