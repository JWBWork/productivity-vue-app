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
                        <DayFlow :calEvents="calEvents" 
                                 :startTime="startTime" 
                                 :endTime="endTime"
                                 style="height:75vh;"/>
                    </v-col>
                    <v-col cols="5">
                        <TodoList :nestedTodos="nestedTodos"
                                  style="height:75vh;"
                                  @drop="droppedTodo"/>
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
    import moment from 'moment';

    export default {
        name: 'App',

        components: {
            TodoList, DayFlow
        },

        data: () => ({
            todos: [{
                id: 0,
                title: "title 0",
                parent_id: null
            }, {
                id: 1,
                title: "title 1",
                parent_id: null
            }, {
                id: 2,
                title: "title 1",
                parent_id: 1
            }, {
                id: 3,
                title: "title 1",
                parent_id: 1
            }, {
                id: 4,
                title: "title 1",
                parent_id: null
                }],
            calEvents: [{
                id: 0,
                title: "event 0 title",
                start: moment().set({'hour':1, 'minute':30}),
                end: moment().set({'hour':2, 'minute':0})
            },{
                id: 1,
                title: "event 1 title",
                start: moment().set({'hour':2, 'minute':30}),
                end: moment().set({'hour':3, 'minute':30})
            }],
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
                        return r;
                    }, [])
                }
                return nest(this.todos);
            }
        },
        methods: {
            getNestedTodo: function (todoId, searchList = null) {
                if (searchList == null) { searchList = [...this.nestedTodos] }
                for (let todo of searchList) {
                    if (todo.id == todoId) {
                        return todo;
                    } else {
                        if (todo.hasOwnProperty("children")){
                            return this.getNestedTodo(todoId, todo.children);
                        }
                    }
                }
            },
            droppedTodo: function (droppedId, position, adjacentId) {
                console.log(droppedId, position, adjacentId);
                //with the dropped id get the current parent and position
                //with the adjacent id get the new parent and postion
                console.log(this.getNestedTodo(droppedId))
            }
        },
        filters: {
            pretty: function (value) {
                return JSON.stringify(value, null, 2);
            }
        }
    };
</script>
