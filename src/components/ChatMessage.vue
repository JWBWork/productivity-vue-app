<template>
    <div id="chatMessageRoot" style="width:100%;display:inline-block">
        <div :style="messageType" class="message">
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
                let style = {};
                if (this.message.from == "user") {
                    style.backgroundColor = "lightblue";
                    style.float = "right";
                    return style
                } else if (this.message.from == "app") {
                    style.backgroundColor = "pink";
                    style.float = "left";
                    return style
                }
                return style
            }
        },
        methods: {
        },
        mounted: function () {
            //console.log(this.message);
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    #chatMessageRoot{
        height: auto;
        width:auto;
    }

    .message{
        border-radius: 12px;
        padding: 10px 15px;
        color: darkslategrey;
    }

</style>

