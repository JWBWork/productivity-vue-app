<template>
    <div class="todo" :id="todoElId">
        <Drop @drop="dropAbove"
              class="drop-zone"></Drop>
        
        <Drop @drop="dropInside"
              class="drop-zone"
              style="height:auto; margin:2px 0 2px 0;overflow:hidden">

            <v-row class="d-flex justify-space-between align-center" style="width:100%;">
                <div class="d-flex" style="overflow:hidden">
                    <Drag :transfer-data="todo"
                          class="drag-handle"
                          style="display:inline;margin-left:10px">
                        <v-icon>mdi-drag</v-icon>

                        <template v-if="renderTemplate" slot="image">
                            <Todo :todo="todoCopy" :renderTemplate="false"></Todo>
                            <!--<div v-html="selfHTML"></div>-->
                        </template>

                    </Drag>
                    <v-checkbox v-model="todo.complete"
                                hide-details
                                class="shrink mr-2 mt-0"
                                style="display:inline;height:30px;"
                                v-on:change="emitToggleTodo(todo.id)">
                    </v-checkbox>
                    <!--{{todo.id}}-->
                    <input type="text" 
                           v-if="!todo.complete"
                                  :class="{complete: todo.complete}"
                                  v-model="todo.title"
                                  style="max-width:120px;display:inline;padding:0;height:30px;"
                                  single-line/>
                        <!--{{todo.title}}-->
                    <!--</input>-->
                    <label v-if="todo.complete"
                           style="max-width:120px;display:inline;padding:0;height:30px;">
                        {{todo.title}}
                    </label>
                </div>
                <div class="d-flex align-start">
                    <v-btn text icon color="blue"
                           class="d-flex align-center"
                           @click="$emit('delete-todo', todo.id)">
                        <v-icon>mdi-delete</v-icon>
                    </v-btn>
                    <v-btn text icon color="blue"
                           class="d-flex align-center"
                           @click="$emit('create-sub-todo', todo.id)">
                        <v-icon>mdi-plus</v-icon>
                    </v-btn>

                    <!--<Drop @drop="dropInside"
                  class="drop-zone"
                  style="width:10px;height:20px;display:inline-block;"></Drop>-->
                </div>
            </v-row>
        </Drop>

        <Todo v-for="child in todo.children"
              v-bind:key="child.id"
              v-bind:todo="child"
              @delete-todo="emitDeleteTodo"
              @drop="emitDrop"
              @toggle-todo="emitToggleTodo"
              :renderTemplate="renderTemplate" />

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
                //todoCopy: Object.assign({}, this.todo),
            }
        },
        methods: {
            emitDeleteTodo: function (todo_id) {
                console.log("Todo emitDeleteTodo: ", todo_id);
                if (typeof todo_id != undefined) {
                    this.$emit('delete-todo', todo_id);
                } else {
                    this.$emit('delete-todo', this.todo.id);
                }
            },
            emitToggleTodo: function (todo_id) {
                if (typeof todo_id != undefined) {
                    this.$emit('toggle-todo', todo_id);
                } else {
                    this.$emit('toggle-todo', this.todo.id);
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
            },
            todoCopy: function () { return Object.assign({}, this.todo) }
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

    .drop-zone{
        width: 100%;
        height: 10px;
        background-color: lightblue;
    }
    .complete{
        text-decoration: line-through;
    }

    .v-text-field__slot label{
        padding:0;
    }
</style>

