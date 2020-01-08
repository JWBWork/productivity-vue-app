<template>
    <div>
        <div v-bar >
            <ChatMessage v-for="message in messages"
                         :key="message.id"
                         :message="message"/>
        </div>
    </div>
</template>

<script>
    import ChatMessage from './ChatMessage';

    export default {
        name: 'Chat',
        props: ["messages"],
        components: {ChatMessage},
        computed: {//object of funcitons
        },
        methods: {//object of funcitons
        },
        mounted: function () {
            //console.log(this.messages);
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    #ChatRoot{
        overflow-y: scroll;
        /*border-style: solid;*/
        /*border-color: black;*/
        /*border-width: 1px;*/
        margin: 0 0 0 5px;
        /*height: 85vh;*/
        /*height: 100%;*/
        height: 60vh;
    }
</style>

