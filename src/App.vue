<template>
    <header>
        <div class="container">

        </div>
    </header>
    <main class="main">
        <TopSection/>
        <ListTables v-if="connectionIsReady"/>
    </main>
    <footer>
        <div class="container">

        </div>
    </footer>
</template>

<script lang="ts">
import {computed, defineComponent} from 'vue';
import {useStore} from "vuex";
import ListTables from '@/components/ListTables.vue';
import TopSection from "@/components/TopSection.vue";
import socketsbayStart from "@/tools/socketsbay";

export default defineComponent({
    name: 'App',
    components: {TopSection, ListTables},
    setup(){
        const store = useStore();
        console.log(store)
        //const tables = useStore(['tables']);
        const websocket = store.state.websocket
        socketsbayStart(websocket, store)

        const connectionIsReady = computed(()=> store.state.connectionReady);
        const connectionHasError = computed(()=> store.state.connectionError);

        return {connectionIsReady, connectionHasError, websocket}
    }
});
</script>

<style lang="scss">
</style>
