<template>
    <div :style='style' class="content">
        <div>
            <div>{{start.format('LT')}} - {{end.format('LT')}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'CalCell',
        props: ["start", "end"],
        computed: {
            style: function () {
                //let height = (this.calBlock.end - this.calBlock.start) / 20000;
                let style = {
                    height: `${this.height}px`,
                    overflow: "hidden"
                }

                return style;
            },
            height: function () {
                let height = ((this.end - this.start) / 15000);
                //console.log("cell height: ", height);
                return height;
            }
        },
        methods: {

        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .content{
        overflow: hidden;
        /*border-style: solid;
        border-width: 1px 0 0 0;
        border-color: grey;*/
        box-shadow: 0 1px 0 0;
        margin: 0 5px;
        padding: 0 15px;
        color: grey;
        position: relative;
        font-size: xx-small;
        width: 100%;
    }
</style>

