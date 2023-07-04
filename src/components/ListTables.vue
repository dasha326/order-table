<template>
    <section class="tables mt-3 mb-3">
        <div class="container">
            <div class="row">
                <div class="col-lg-4 col-sm-6 mt-3" v-for="(item, i) in list" :key="item.id">
                    <CardTable :table="item" :id="i" @checkPopup="popupHandler"/>
                </div>
            </div>
        </div>
    </section>
    <TablePopup ref="tablePopupRef"/>
</template>

<script lang="ts">
import {computed, defineComponent, ref} from "vue";
import {useStore} from "vuex";
import {CardPopupsType} from "@/tools/types";
import CardTable from "@/components/cards/CardTable.vue";
import TablePopup from "@/components/TablePopup.vue";

export default defineComponent({
    name: "ListTables",
    components: {TablePopup, CardTable},
    setup() {
        const store = useStore();
        const list = computed(() => store.state.tables.tablesList);
        const tablePopupRef = ref();
        const isTablePopup = ref(false);
        function popupHandler(action: CardPopupsType, id: number) {
            tablePopupRef.value?.popupHandler(action, id);
        }
        return {
            list, tablePopupRef, isTablePopup, popupHandler
        }
    }
})
</script>

<style scoped>

</style>