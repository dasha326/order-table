<template>
    <pop-up ref="popUpRef" :title="popupTitle" >
        <template #body>
            <component :is="popupForm"
                       :tableId="tableId"
                       @popupClose="closePopup"/>
        </template>
    </pop-up>
    <AlertPopup ref="alertPopupRef" :alertData="requireAlert"/>
</template>

<script lang="ts">
import {defineComponent, ref } from "vue";
import {CardPopupsType, IRequiredAlertError, IRequiredAlertSuccess, requiredAlertType,RequiredType} from '@/tools/types';
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
        const tablePlaces = ref();
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

        //Alert popup
        const alertPopupRef = ref();
        const successAlert:IRequiredAlertSuccess = ({
            alertType: 'success',
            title: 'Заявка успешно отправлена',
            text: 'Ожидайте звонка подтвреждения'
        });
        const errorAlert:IRequiredAlertError = ({
            alertType: 'error',
            title: 'Какая то проблема',
            text: 'Попробуйте отправить еще раз или позвоните нам'
        });

        let requireAlert = ref<requiredAlertType>(null);
        function closePopup(action: RequiredType) {
            popUpRef.value.closePopup();
            if (action === 'success') {
                requireAlert.value = successAlert;
            } else {
                requireAlert.value = errorAlert;
            }
            alertPopupRef.value.openPopup();
        }

        return {
            popUpRef, alertPopupRef, popupTitle, tableId, popupForm, requireAlert, tablePlaces,
            popupHandler, closePopup
        }
    }
})
</script>

<style scoped>

</style>