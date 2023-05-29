<template>
    <header>
        <div class="container">

        </div>
    </header>
    <main class="main">
        <TopSection/>
        <ListTables :list="tablesList" v-if="connectionIsReady"/>
    </main>
    <footer>
        <div class="container">

        </div>
    </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {mapState, mapMutations} from "vuex";
import ListTables from '@/components/ListTables.vue';
import TopSection from "@/components/TopSection.vue";

export default defineComponent({
    name: 'App',
    components: {TopSection, ListTables},
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
            websocket.send( JSON.stringify(tables) );
        }*/
    },
});
</script>

<style lang="scss">
</style>
