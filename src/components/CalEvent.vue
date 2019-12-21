<template>
    <div :style='style' class="event">
        <div>
            <div>{{event.title}}</div>
            <span>{{event.start.format('LT')}} - {{event.end.format('LT')}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'CalEvent',
        props: ["event"],
        computed: {
            style: function () {
                //let height = (this.calBlock.end - this.calBlock.start) / 20000;
                let style = {
                    height: `${this.height}px`,
                    "margin-top": `-${this.height}px`
                }

                return style;
            },
            height: function () {
                let height = ((this.event.end - this.event.start) / 15000);
                return height;
            }
        },
        methods: {

        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .event{
        margin: 0 2px;
        padding: 0 5px;
        width: 85%;
        border-radius: 5px;
        background-color: pink;
        border-style: solid;
        border-width: 1px;
        opacity: 0.8;
        overflow: hidden;
        font-size: x-small;
        height:100%;
        z-index:2;
    }
</style>

