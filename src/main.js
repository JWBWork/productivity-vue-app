import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import Vuebar from 'vuebar';
import vuetify from './plugins/vuetify';
import axios from 'axios';

Vue.use(Vuex)
Vue.use(Vuebar);
Vue.config.productionTip = false

//TODO: move a lot of shit out of app.vue to here X_x
const store = new Vuex.Store({
    state: {
        messages: [
            {
                id: 0,
                body: "blah lahasd",
                from: "app"
            }, {
                id: 1,
                body: "asdf",
                from: "user"
            }, {
                id: 2,
                body: "sadfouasdf",
                from: "app"
            }, {
                id: 3,
                body: "wudmfbo",
                from: "user"
            }
        ],
    },
    mutations: {
        addMessage(state, msg) {
            //console.log("msg", msg);
            state.messages.push(msg);
        }
    },
    actions: {
        addMessage(context, msg) {
            context.commit("addMessage", msg);

            axios({
                method: 'post',
                url: 'http://localhost:5000/chat',
                headers: {
                    'Content-type': 'application/json',
                    crossDomain: true
                },
                data: msg
            }).then(
                response => {
                    console.log(response);
                    context.commit("addMessage", response.data);
                }
            );
        }
    }
})

new Vue({
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')
