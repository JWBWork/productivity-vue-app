<template>
    <v-app>
        <v-app-bar app
                   color="primary"
                   dark>
            <div class="d-flex align-center">
                <v-img alt="Vuetify Logo"
                       class="shrink mr-2"
                       contain
                       src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
                       transition="scale-transition"
                       width="40" />

                <v-img alt="Vuetify Name"
                       class="shrink mt-1 hidden-sm-and-down"
                       contain
                       min-width="100"
                       src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
                       width="100" />
            </div>

            <v-spacer></v-spacer>

            <v-btn href="https://github.com/vuetifyjs/vuetify/releases/latest"
                   target="_blank"
                   text>
                <span class="mr-2">Latest Release</span>
                <v-icon>mdi-open-in-new</v-icon>
            </v-btn>
        </v-app-bar>

        <v-content>
            <v-container style="padding:0 5px">
                <v-row no-gutters justify="center">
                    <v-col cols="5" style="text-align:center">flow</v-col>
                    <v-col cols="5" style="text-align:center">todos</v-col>
                </v-row>
                <v-row justify="center">
                    <v-col cols="5">
                        <!--<DayFlow :calEvents="calEvents"
                                 :startTime="startTime"
                                 :endTime="endTime"
                                 style="height:75vh;"/>-->
                        <Chat :messages="messages"/>
                    </v-col>
                    <v-col cols="5">
                        <TodoList :nestedTodos="nestedTodos"
                                  style="height:75vh;"
                                  @drop="droppedTodo"
                                  @delete-todo="deleteTodo"
                                  @toggle-todo="toggleTodo"
                                  @new-todo="createTodo" />
                    </v-col>
                </v-row>
            </v-container>

            <!--<span>{{todos | pretty}}</span>-->
            <!--<span>{{nestedTodos | pretty}}</span>-->
        </v-content>
    </v-app>
</template>

<script>
    //import HelloWorld from './components/HelloWorld';
    import TodoList from './components/TodoList';
    import DayFlow from './components/DayFlow';
    import Chat from './components/Chat';
    import moment from 'moment';

    export default {
        name: 'App',

        components: {
            TodoList, DayFlow, Chat
        },

        data: () => ({
            todos: [
                {
                    id: 0,
                    complete: false,
                    title: "go shopping",
                    parent_id: null,
                    position: 0
                }, {
                    id: 1,
                    complete: false,
                    title: "tolu",
                    parent_id: null,
                    position: 1
                }, {
                    id: 2,
                    complete: false,
                    title: "face",
                    parent_id: 1,
                    position: 0
                }, {
                    id: 3,
                    complete: false,
                    title: "doodle",
                    parent_id: 1,
                    position: 1
                }, {
                    id: 4,
                    complete: false,
                    title: "testtest",
                    parent_id: null,
                    position: 2
                }
            ],
            calEvents: [
                {
                    id: 0,
                    title: "event 0 title",
                    start: moment().set({ 'hour': 1, 'minute': 30 }),
                    end: moment().set({ 'hour': 2, 'minute': 0 })
                }, {
                    id: 1,
                    title: "event 1 title",
                    start: moment().set({ 'hour': 2, 'minute': 30 }),
                    end: moment().set({ 'hour': 3, 'minute': 30 })
                }],
            messages: [
                {
                    id: 0,
                    body: "blah lahasd",
                    from: "app"
                },{
                    id: 1,
                    body: "asdf",
                    from: "user"
                },{
                    id: 2,
                    body: "sadfouasdf",
                    from: "app"
                },{
                    id: 3,
                    body: "wudmfbo",
                    from: "user"
                }
            ],
            startTime: moment().startOf("day"),
            endTime: moment().endOf("day")
        }),
        computed: {
            nestedTodos: function () {
                function nest(data, parentId = null) {
                    return data.reduce((r, e) => {
                        let obj = Object.assign({}, e)
                        if (parentId == e.parent_id) {
                            let children = nest(data, e.id)
                            if (children.length) obj.children = children
                            r.push(obj)
                        }
                        r.sort((a, b) => (a.position > b.position) ? 1 : -1)
                        return r;
                    }, [])
                }
                return nest(this.todos);
            }
        },
        methods: {
            getTodo: function (todoId) {
                for (let todo of this.todos) {
                    if (todo.id == todoId) {
                        return todo;
                    }
                }
            },
            getTodoDescendents: function (parentId) {
                let todoCollection = [parentId];
                for (let todoId of todoCollection) {
                    let childTodos = this.todos.filter(todo => todo.parent_id == todoId);
                    childTodos = childTodos.map(todo => todo.id);
                    //todoCollection = todoCollection.concat(childTodos);
                    todoCollection.push.apply(todoCollection, childTodos);
                }
                return todoCollection;
            },
            deleteTodo: function (todoId) {
                let toDelete = this.getTodoDescendents(todoId);
                this.todos = this.todos.filter(todo => !toDelete.includes(todo.id));
            },
            toggleTodo: function (todoId) {
                let todo = this.getTodo(todoId);
                if (todo.complete) {
                    todo.complete = false;
                    return
                }

                let toMarkComplete = this.getTodoDescendents(todoId);
                for (let todoToggleId of toMarkComplete) {
                    let todo = this.getTodo(todoToggleId);
                    todo.complete = true;
                }
            },
            getNestedTodo: function (todoId, searchList = null) {
                if (todoId == null) {
                    return this.nestedTodos;
                }

                if (searchList == null) { searchList = [...this.nestedTodos] }
                for (let todo of searchList) {
                    if (todo.id == todoId) {
                        return todo;
                    }
                }
                for (let todo of searchList) {
                    if (todo.hasOwnProperty("children")) {
                        return this.getNestedTodo(todoId, todo.children);
                    }
                }
            },
            droppedTodo: function (droppedId, position, adjacentId) {
                /**For editing/reccalculating nested list on drag/drop
                 *
                 * does nothing if:
                 * - dropped inside/adjacent to self
                 * - dropped adjacent and in-order i.e. same position
                 * - dropped in child/descendent
                 * */
                console.log(droppedId, position, adjacentId);
                //dont move if dropping inside/adjacent to self
                if (droppedId == adjacentId) {
                    console.log("reutrn - dropped and sdjacent is same");
                    return
                }

                // do nothing if already adjacent and in-order
                let droppedTodo = this.getTodo(droppedId);
                let adjacentTodo = this.getTodo(adjacentId);
                if (droppedTodo.parent_id == adjacentTodo.parent_id) {
                    if (
                        (position == "above" & droppedTodo.position == adjacentTodo.position - 1) |
                        (position == "below" & droppedTodo.position == adjacentTodo.position + 1)
                    ) {
                        console.log("return - adjacent drop");
                        return
                    }
                }

                //dont drop inside descendent
                let parentTodo = this.getTodo(adjacentTodo.parent_id);
                while (parentTodo) {
                    if (parentTodo.id == droppedId) {
                        console.log("return - attempted drop into descendent")
                        return
                    }
                    parentTodo = this.getTodo(parentTodo.parent_id);
                }

                // new position values for previous home
                if (droppedTodo.parent_id != adjacentTodo.parent_id) {
                    let prevHome = this.getNestedTodo(droppedTodo.parent_id);
                    if (prevHome.hasOwnProperty("children")) {
                        prevHome = prevHome.children
                    }
                    let newPos = 0
                    for (let todoNested of prevHome) {
                        if (todoNested.id != droppedId) {
                            let todoTrue = this.getTodo(todoNested.id);
                            todoTrue.position = newPos;
                            newPos++;
                        }
                    }
                }

                // new position values for new home
                var newHome = this.getNestedTodo(adjacentTodo.parent_id);
                if (newHome.hasOwnProperty("children")) {
                    newHome = newHome.children
                } else {
                    if (position == "inside") {
                        newHome = [];
                    }
                }
                if (droppedTodo.parent_id == adjacentTodo.parent_id) {
                    newHome = newHome.filter(todo => todo.id != droppedId);
                }
                var adjacentIndex;
                for (let i = 0; i < newHome.length; i++) {
                    let todo = newHome[i];
                    if (todo.id == adjacentId) {
                        adjacentIndex = i;
                        break
                    }
                }
                if (position == "above") {
                    newHome.splice(adjacentIndex, 0, Object.assign({}, droppedTodo));
                } else if (position == "below") {
                    newHome.splice(adjacentIndex + 1, 0, Object.assign({}, droppedTodo));
                } else if (position == "inside") {
                    newHome.splice(newHome.length, 0, Object.assign({}, droppedTodo));
                }
                let newPos = 0;
                for (let todoNested of newHome) {
                    let trueTodo = this.getTodo(todoNested.id);
                    trueTodo.position = newPos;
                    newPos++;
                }

                // sets new parent
                if (position == "inside") {
                    droppedTodo.parent_id = adjacentTodo.id
                } else {
                    droppedTodo.parent_id = adjacentTodo.parent_id
                }
            },
            createTodo: function (newTodo) {
                console.log("newTodo", newTodo);
            }
        },
        filters: {
            pretty: function (value) {
                return JSON.stringify(value, null, 2);
            }
        }
    };
</script>
