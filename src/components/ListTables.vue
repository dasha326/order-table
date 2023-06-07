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
    <ThePopup ref="popupRef" :title="popupTitle">
        <template #body>
            <component :is="popupForm"/>
        </template>
    </ThePopup>
</template>

<script lang="ts">
import {computed, defineComponent, ref} from "vue";
import {useStore} from "vuex";
import {CardPopupsType} from '@/tools/types';
import CardTable from "@/components/cards/CardTable.vue";
import ThePopup from "@/components/component/ThePopup.vue";
import JoinForm from "@/components/forms/JoinForm.vue"
import OrderForm from "@/components/forms/OrderForm.vue"
export default defineComponent({
    name: "ListTables",
    components: {ThePopup, CardTable, JoinForm, OrderForm},
    setup() {
        const store = useStore();
        const list = computed(() => store.state.tables.tablesList);
        const popupRef = ref();
        const popupTitle = ref();
        const popupForm = ref();
        function popupHandler(action: CardPopupsType){
           if(action === 'join'){
               popupTitle.value = 'Заполните форму, что бы присоединиться';
               popupForm.value = 'JoinForm'
           }
           if (action === 'order'){
               popupTitle.value = 'Заполните форму, что бы забронировать стол';
               popupForm.value = 'OrderForm'
           }
           popupRef.value.openPopup();
        }

        return {
            list,
            popupRef, popupTitle, popupForm, popupHandler
        }
    }
})
</script>

<style scoped>

</style>