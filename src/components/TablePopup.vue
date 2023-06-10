<template>
    <pop-up ref="popUpRef" :title="popupTitle" >
        <template #body>
            <component :is="popupForm"
                       :tableId="tableId"
                       @popupClose="closePopup"/>
        </template>
    </pop-up>
    <AlertPopup ref="alertPopupRef" :alertType="alertPopupType"/>
</template>

<script lang="ts">
import {computed, defineComponent, PropType, ref, watch} from "vue";
import {CardPopupsType,RequiredType} from '@/tools/types';
import PopUp from "@/components/component/popups/PopUp.vue";
import JoinForm from "@/components/forms/JoinForm.vue"
import OrderForm from "@/components/forms/OrderForm.vue"
import AlertPopup from "@/components/component/popups/AlertPopup.vue";

export default defineComponent({
    name: "TablePopup",
    components: {AlertPopup, PopUp, JoinForm, OrderForm},
    setup() {
        const popUpRef = ref();
        const popupTitle = ref();
        const popupForm = ref();
        const tableId = ref<number>();
        function popupHandler(action: CardPopupsType, id: number){
            tableId.value = id;
            if (action === 'join') {
                popupTitle.value = 'Заполните форму, что бы присоединиться';
                popupForm.value = 'JoinForm'
            }
            if (action === 'order') {
                popupTitle.value = 'Заполните форму, что бы забронировать стол';
                popupForm.value = 'OrderForm'
            }
            popUpRef.value.openPopup();
        }

        const alertPopupRef = ref();
        const alertPopupType = ref();
        function closePopup(action: RequiredType) {
            popUpRef.value.closePopup();
            if (action === 'success') {
                alertPopupType.value = 'success'
                alertPopupRef.value.openPopup();
            } else {
                alertPopupType.value = 'error'
                alertPopupRef.value.openPopup();
            }
        }

        return {
            popUpRef, alertPopupRef, popupTitle, tableId, popupForm, alertPopupType, popupHandler, closePopup
        }
    }
})
</script>

<style scoped>

</style>