<template>
    <div>
        <CurTimeInfo></CurTimeInfo>
        <div class="dayflow" v-bar>
            <div  id="dayFlowContainer">
                <CalEvent v-for="event in calEvents"
                          :key="event.id"
                          :event="event"
                          :style="getEventTransform(event)">
                </CalEvent>
                <CalCell v-for="brick in backdrop"
                         :key="brick.id"
                         :start="brick.start"
                         :end="brick.end"
                         :id="brick.id"
                         ref="backgroundCells">
                </CalCell>
                <!--<span>{{allBlocks | pretty}}</span>-->
            </div>
        </div>
    </div>
</template>

<script>
    import CalEvent from './CalEvent.vue';
    import CalCell from './CalCell.vue';
    import CurTimeInfo from './CurTimeInfo.vue';
    import moment from 'moment';
    import VueScrollTo from 'vue-scrollto';
    
    export default {
        props: ["calEvents", "startTime", "endTime"],
        components: {
            CalEvent,
            CalCell,
            CurTimeInfo,
            //VueScrollTo,
        },
        name: 'DayFlow',
        computed: {
            backdrop: function () {
                let blocks = [];
                function emptyBlock(start, end, id) {
                    blocks.push({
                        start: moment(start),
                        end: moment(end),
                        id: "cell-"+start.format("MM-DD-YYYY-HH-mm")
                        //id: "cell"+(id)
                    });
                }

                let start = moment(this.startTime);
                let end = moment(this.endTime);
                let a = start, b = moment(start).add(5, 'm'), id=0;
                emptyBlock(a, b, id);
                while (b <= end) {
                    id++;
                    a.add(5, 'm');
                    b.add(5, 'm');
                    emptyBlock(a, b, id);
                }
                return blocks;
            },
            allBlocks: function () {
                function emptyBlocks(start, end) {
                    //REPLACE THIS
                    //console.log(`__ emptyBlocks for ${start.format('LT')} to ${end.format('LT')}`)

                    let blocks = [];
                    function emptyBlock(start, end) {
                        blocks.push({
                            start: start,
                            end: end
                        });
                    }

                    var blockEnd;
                    var blockStart= moment(start);
                    if (0 <= start.minutes() && start.minutes() < 15) {
                        blockEnd = moment(start).minutes(15);
                    } else if (15 <= start.minutes() && start.minutes() < 30) {
                        blockEnd = moment(start).minutes(30);
                    } else if (30 <= start.minutes() && start.minutes()< 45) {
                        blockEnd = moment(start).minutes(45);
                    } else {
                        blockEnd = moment(start).add(1, 'h').minutes(0);
                    }
                    emptyBlock(blockStart, blockEnd);
                    //console.log(`start_1, end_1: ${blockStart.format('LT')} to ${blockEnd.format('LT')}`)

                    let blocksN = Math.floor((end - blockEnd) / 60000 / 15);
                    for (var i = 0; i < blocksN; i++) {
                        blockStart = blockEnd;
                        blockEnd = moment(blockEnd).add(15, 'm');
                        emptyBlock(blockStart, blockEnd);
                        //console.log(`start_1, end_1: ${blockStart.format('LT')} to ${blockEnd.format('LT')}`)
                    }

                    blockStart = blockEnd;
                    blockEnd = end;
                    //console.log(`start_1, end_1: ${blockStart.format('LT')} to ${blockEnd.format('LT')}`)
                    emptyBlock(blockStart, blockEnd);
                    //console.log("need: ", blocksN);
                    return blocks;
                }
                let clonedBlocks = this.calEvents.slice(0);
                //console.log(clonedBlocks);

                let filled_blocks = []
                for (var i = 0; i < clonedBlocks.length; i++) {
                    let first = clonedBlocks[i];
                    let second = clonedBlocks[i + 1];

                    if (typeof second != "undefined") {
                        filled_blocks = filled_blocks.concat(emptyBlocks(first.end, second.start));
                        //console.log(clonedBlocks);
                    }
                }
                filled_blocks = filled_blocks.concat(clonedBlocks);
                filled_blocks = filled_blocks.sort((first, second) => first.start - second.start);

                return filled_blocks;
            }
        },
        methods: {
            getEventTransform: function (event) {
                //console.log("event.start", event.start.format('d LT'))
                //console.log("startime", this.startTime.format('d LT'))
                //console.log("diff", event.start - this.startTime)
                let position = (
                    (
                        0
                        + (event.end - event.start)/15000
                        //+ (event.end - event.start)
                        //- (event.end - event.start)/2
                        + (event.start - this.startTime)/15000
                    )
                    /// 15000
                );
                //console.log("event translate:", position)
                return {
                    //"transform": `translateY(${110}px)`
                    "transform": `translateY(${position}px)`
                }
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                var options = {
                    container: '#dayFlowContainer',
                    easing: 'ease-in',
                    force: true,
                    cancelable: false,
                    x: false,
                    y: true
                }
                let curTime = moment()
                curTime = curTime.minutes(Math.floor(curTime.minutes() / 5)*5);
                let elId = "#cell-" + curTime.format("MM-DD-YYYY-HH-mm");
                VueScrollTo.scrollTo( elId, 10, options );
            })
        },
        filters: {
            pretty: function(value) {
                return JSON.stringify(value, null, 2);
            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .dayflow{
        overflow-y: scroll;
        /*border-style: solid;*/
        /*border-color: black;*/
        /*border-width: 1px;*/
        margin: 0 0 0 5px;
        /*height: 85vh;*/
        height: 100%;
    }
</style>

