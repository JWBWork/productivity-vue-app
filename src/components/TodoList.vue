<template>
    <div class="todolist">
        <v-expansion-panels>
            <v-expansion-panel @click.stop> 
                <v-expansion-panel-header @click.stop>
                    <input type="text" v-model="newTodo.title" @keydown.space="debug" @click.stop/>
                    <input type="submit" value="+" v-on:click="emitNewTodo()" />
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                    Expansion panel content
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
        <!--<div>
            <input type="text" v-model="newTodo.title"/>
            <input type="submit" value="+" v-on:click="emitNewTodo()"/>
        </div>-->

        <!--<h3>Todos:</h3>-->
        <div v-bar style="height:80vh">
            <div>
                <Todo v-for="todo in nestedTodos"
                      :key="todo.id"
                      :todo="todo"
                      @delete-todo="emitDeleteTodo"
                      @drop="emitDrop" 
                      @toggle-todo="emitToggleTodo"/>
            </div>
        </div>
    </div>
</template>

<script>
    import Todo from './Todo';

    export default {
        name: 'TodoList',
        props: ["nestedTodos"],
        data: function(){
            return {
                newTodo: {
                    title: "",
                    parent_id: null,
                    position: null
                }
            }
        },
        components: {
            Todo
        },
        methods: {
            emitNewTodo: function (newTodo) {
                if (typeof newTodo == "undefined") {
                    //console.log("new todo: ", newTodo);
                    if (this.newTodo.title.length < 5) {
                        return;
                    }
                    let newTodoCopy = Object.assign({}, this.newTodo);
                    this.$emit('new-todo', newTodoCopy);
                    this.newTodo.title = "";
                }
            },
            emitDeleteTodo: function (todo_id) {
                this.$emit('delete-todo', todo_id);
            },
            emitToggleTodo: function (todo_id) {
                this.$emit('toggle-todo', todo_id);
            },
            emitDrop: function (droppedId, position, adjacentId) {
                //console.log("drop", droppedId, position, adjacentId);
                this.$emit("drop", droppedId, position, adjacentId);
            },
            debug: function (event) {
                console.log("info: ", event);
                event.stopPropagation()
            }
        },
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .todolist{
        /*border-style: solid;
        border-color: black;
        border-width: 1px;*/
        margin: 0 0 0 10px;
        /*overflow-y: scroll;*/
        height: 85vh;
        /*height: 92%;*/
    }
</style>

