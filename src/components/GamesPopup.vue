<template>
    <button class="btn btn-secondary mt-3" @click="popUpRef.openPopup()" type="button">Добавить игру</button>
    <pop-up ref="popUpRef" title="Список игры" bigModal>
        <template #body>
            <ListGames @sendList="closePopup"/>
        </template>
    </pop-up>

    <AlertPopup ref="alertPopupRef" :alertData="requireAlert"/>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";
import {IRequiredAlertError, requiredAlertType} from "@/tools/types";
import PopUp from "@/components/component/popups/PopUp.vue";
import AlertPopup from "@/components/component/popups/AlertPopup.vue";
import ListGames from "@/components/ListGames.vue";

export default defineComponent({
    name: "GamesPopup",
    components: {PopUp, ListGames, AlertPopup},
    emits: ['update:modelValue'],
    setup(props, {emit}) {
        const popUpRef = ref();
        const listGames = ref({})
        //Alert popup
        const alertPopupRef = ref();


        let requireAlert = ref<requiredAlertType>(null);
        function closePopup(checkedGamesList:string, unCheckedGamesList?:string) {
            popUpRef.value.closePopup();
            if (unCheckedGamesList !== '') {
                requireAlert.value = {
                    alertType: 'error',
                    title: 'Внимание',
                    text: `Игры ${unCheckedGamesList} не доступны`
                } as IRequiredAlertError;
                alertPopupRef.value.openPopup();
            }
            emit('update:modelValue', checkedGamesList)
        }
        return {
            popUpRef, listGames, requireAlert, alertPopupRef, closePopup
        }
    }
})
</script>

<style scoped>

</style>