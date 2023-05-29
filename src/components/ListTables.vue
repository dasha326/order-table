<template>
    <section class="tables">
        <div class="container">
            <div class="row">
                <div class="col-lg-4 col-sm-6 mt-3" v-for="(item, i) in list" :key="item">
                    <CardTable :table="item" :id="i"/>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import CardTable from "@/components/CardTable";
import {computed} from "vue";
import {useStore} from "vuex";
export default {
    name: "ListTables",
    components: {CardTable},
    setup() {
        const store = useStore();
        console.log(store.state.tables.tablesList)
        const list= computed(() => store.state.tables.tablesList)
        return {list}
    }
}
</script>

<style scoped>

</style>