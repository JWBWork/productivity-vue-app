<template>
    <div>
        <div v-bar>
            <div class="ChatRoot" ref="chatScrollWindow">
                <ChatMessage v-for="message in messages"
                             :key="message.id"
                             :message="message" />
            </div>
        </div>
        <v-text-field @keyup.enter.native="userSubmit" v-model="userMessage"></v-text-field>
    </div>
</template>

<script>
    import ChatMessage from './ChatMessage';

    export default {
        name: 'Chat',
        props: [],
        data: function () {
            return {
                userMessage: ""
            }
        },
        components: { ChatMessage },
        computed: {//object of funcitons
            messages: function () {
                return this.$store.state.messages
            }
        },
        methods: {//object of funcitons
            userSubmit() {
                if (this.userMessage.trim() == "") {
                    return
                }
                let msg = {
                    body: this.userMessage.trim(),
                    from: "user"
                }
                //this.$store.commit('addMessage', msg);
                //this.$store.dispatch(
                //    'addMessage', msg
                //).then(() => {
                //    this.scrollDown();
                //    this.userMessage = "";
                //    setTimeout(
                //        this.scrollDown,
                //        750
                //    );
                //});
                this.$socket.emit('CHAT', msg).then(() => {
                    this.scrollDown();
                    this.userMessage = "";
                    setTimeout(
                        this.scrollDown,
                        750
                    );
                });
            },
            scrollDown() {
                let chatScrollWindow = this.$refs.chatScrollWindow;
                chatScrollWindow.scrollTop = chatScrollWindow.scrollHeight;
            }
        },
        mounted: function () {
            console.log("mounted");
            this.scrollDown();
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .ChatRoot {
        /*overflow-y: scroll;*/
        /*border-style: solid;*/
        /*border-color: black;*/
        /*border-width: 1px;*/
        /*margin: 0 0 0 5px;*/
        /*height: 85vh;*/
        /*height: 100%;*/
        height: 60vh;
        max-height: 60vh;
        min-height: 60vh;
    }
</style>

