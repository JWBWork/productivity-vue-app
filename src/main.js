import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import Vuebar from 'vuebar';
import vuetify from './plugins/vuetify';
import axios from 'axios';
import socketio from 'socket.io-client';
import VueSocketIO from 'vue-socket.io';

Vue.use(Vuex)
Vue.use(Vuebar);
Vue.config.productionTip = false

//TODO: move a lot of shit out of app.vue to here X_x
const store = new Vuex.Store({
    state: {
        isConnected: false,
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
        SOCKET_CONNECT(state) {
            state.isConnected = true;
        },
        SOCKET_DISCONECT(state) {
            state.isConnected = false;
        },
        SOCKET_CHAT(state, message) {
            console.log("SOCKET_MESSAGE", message);
        },
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

const socketOptions = { path: '/chat/' };
Vue.use(new VueSocketIO({
    debug: true,
    connection: socketio('http://localhost:5000/', socketOptions),
    Vuex: {
        store,
        actionPrefix: "SOCKET_",
        mutationPrefix: "SOCKET_"
    }
}));

new Vue({
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')
