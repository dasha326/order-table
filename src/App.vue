<template>
    <TheHeader/>
    <main class="main">
        <TopSection/>
        <ListTables v-if="connectionIsReady"/>
    </main>
    <TheFooter/>
</template>

<script lang="ts">
import {computed, defineComponent} from 'vue';
import {useStore} from "vuex";
import ListTables from '@/components/ListTables.vue';
import TopSection from "@/components/TopSection.vue";
import TheHeader from "@/components/layouts/TheHeader.vue";
import socketsbayStart from "@/tools/socketsbay";
import TheFooter from "@/components/layouts/TheFooter.vue";

export default defineComponent({
    name: 'App',
    components: {TheFooter, TheHeader, TopSection, ListTables},
    setup(){
        const store = useStore();
        const websocket = store.state.websocket;
        socketsbayStart(websocket, store);

        const connectionIsReady = computed(()=> store.state.connectionReady);
        const connectionHasError = computed(()=> store.state.connectionError);

        return {connectionIsReady, connectionHasError, websocket}
    }
});
</script>

<style lang="scss">
</style>
