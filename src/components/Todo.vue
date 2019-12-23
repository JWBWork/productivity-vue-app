<template>
    <div class="todo" :id="todoElId">
        <Drop @drop="dropAbove"
              class="drop-zone"></Drop>
        <Drag :transfer-data="todo"
              class="drag-handle">
            <p>{{todo.id}}: {{todo.title}}</p>
            <Drop @drop="dropInside"
                  class="drop-zone"
                  style="width:10px;display:inline-block;"></Drop>
            <template v-if="renderTemplate" slot="image">
                <Todo :todo="todoCopy" :renderTemplate="false"></Todo>
                <!--<div v-html="selfHTML"></div>-->
            </template>
        </Drag>
        <button @click="$emit('delete-todo', todo.id)">X</button>
        <button>+</button>
        <Todo v-for="child in todo.children"
              v-bind:key="child.id"
              v-bind:todo="child"
              @delete-todo="emitDeleteTodo"
              @drop="emitDrop" 
              :renderTemplate="renderTemplate"/>
        <Drop @drop="dropBelow"
              class="drop-zone"></Drop>
    </div>
</template>

<script>
    import { Drag, Drop } from 'vue-drag-drop';

    export default {
        name: 'Todo',
        props: {
            todo: {
                type: Object
            },
            renderTemplate: {
                type: Boolean,
                default: true
            }
        },
        components: {
            Drag,
            Drop
        },
        data: function () {
            return {
                todoCopy: Object.assign({}, this.todo),
            }
        },
        methods: {
            emitDeleteTodo: function (todo_id) {
                if (typeof todo_id != undefined) {
                    this.$emit('delete-todo', todo_id);
                } else {
                    this.$emit('delete-todo', this.todo.id);
                }
                
            },
            updateDragHTML: function () {
                console.log("update!");
                //this.dragHTML = document.getElementById(this.todoElId).innerHTML;
            },
            dropBelow: function (todo) {
                //console.log("drop", todo.id, "below", this.todo.id)
                this.$emit("drop", todo.id, "below", this.todo.id)
            },
            dropAbove: function (todo) {
                //console.log("drop", todo.id, "above", this.todo.id)
                this.$emit("drop", todo.id, "above", this.todo.id)
            },
            dropInside: function (todo) {
                //console.log("drop inside!");
                this.$emit("drop", todo.id, "inside", this.todo.id)
            },
            emitDrop: function (droppedId, position, adjacentId) {
                //console.log("drop", droppedId, position, adjacentId);
                this.dragHTML = document.getElementById(this.todoElId).innerHTML;
                this.$emit("drop", droppedId, position, adjacentId);
            }
        },
        update: function() {
            this.$nextTick(function () {
                this.updateDragHTML();
            });
        },
        computed: {
            todoElId: function () {
                return `todo-id-${this.todo.id}`
            },
            selfHTML: function () {
                return "drag HTML";
                //return document.getElementById(this.todoElId).innerHTML;
            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .todo{
        border-style: solid;
        border-color: black;
        border-width: 1px;
        margin: 5px;
    }

    .drag-handle{
        /*width: 15px;*/
        height: 15px;
        background-color: pink;
        display: inline-block;
    }

    .drop-zone{
        width: 100%;
        height: 10px;
        background-color: blue;
    }

    p, button{
        display:inline;
    }
</style>

