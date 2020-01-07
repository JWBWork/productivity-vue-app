<template>
    <div id="ChatMessageRoot" style="width:100%;display:inline-block">
        <div :style="messageType">
            {{message.body}}
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ChatMessage',
        props: ["message"],
        computed: {
            messageType: function () {
                if (this.message.from == "user") {
                    //console.log("user message");
                    return {
                        backgroundColor: "blue",
                        float: "right"
                    }
                } else if (this.message.from == "app") {
                    //console.log("app message");
                    return {
                        backgroundColor: "red",
                        float: "left"
                    }
                } else {
                    return {}
                }
            }
        },
        methods: {
        },
        mounted: function () {
            //console.log(this.message);
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    #ChatMessageRoot{
        height: auto;
        width:auto;
    }
</style>

