<template>
    <div class="container">
        <h1><span class="connectionReady" >Connection ready!</span></h1>
        <h2 v-if="connectionHasError">какая-то ошибка, перезагрузте страницу</h2>
        <ListTables :list="tablesList" v-if="connectionIsReady"/>
    </div>
</template>

<script>
import ListTables from "@/components/ListTables";
import {mapState, mapMutations} from "vuex";
import socketsbay from "@/tools/socketsbay";
export default {
    name: 'App',
    data(){
        return {}
    },
    components: {ListTables},
    computed: {
        ...mapState(['connectionReady', 'connectionError', 'tables']),
        tablesList(){
            return this.tables
        },
        connectionHasError(){
            return this.connectionError
        },
        connectionIsReady(){
            return this.connectionReady
        }
    },
    methods:{
        ...mapState(['tables']),
        ...mapMutations(['SET_TABLES']),
       /* addMemberToTable(tables) {
            this.websocket.send( JSON.stringify(tables) );
        }*/
    },
    mounted() {
        socketsbay.init();
    }
}
</script>
