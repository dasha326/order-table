<template>
    <form @submit.prevent="onSubmit" ref="formRef">
        <form-input
            ref="inputNameRef"
            label="Имя"
            labelHidden
            placeholder="Введите ваше имя"
            type="text"
            valid="fio"
            isRequired
        >
            <template #prefix>
                <svg-icon name="user"/>
            </template>
        </form-input>
        <form-input
            ref="inputPhoneRef"
            label="Телефон"
            type="tel"
            isRequired
            valid="tel"
            v-maska
            data-maska="+7 (###) ###-##-##"
        >
            <template #prefix>
                <svg-icon name="phone"/>
            </template>
        </form-input>
        <button type="submit" class="btn btn-secondary mt-3">
            <span>Присоединиться</span>
            <svg-icon name="loading" v-if="isLoading"/>
        </button>
    </form>
</template>

<script lang="ts">
import {defineComponent, ref } from "vue";
import FormInput from "@/components/module/form/FormInput.vue";
import SvgIcon from "@/components/module/SvgIcon.vue";
import {useStore} from "vuex";

export default defineComponent({
    name: "JoinForm",
    props: {
        tableId: Number
    },
    emit: ['popupClose'],
    components: {SvgIcon, FormInput},
    setup(props, {emit}) {
        const store = useStore();
        const isLoading = ref(false)
        const inputNameRef = ref();
        const inputPhoneRef = ref();
        const formRef = ref<HTMLFormElement | null>(null);

        function onSubmit() {
            const isValidName = inputNameRef.value.validateInput();
            const isValidPhone = inputPhoneRef.value.validateInput();
            Promise.all([isValidName, isValidPhone]).then((isValidInputs) => {
                if(!isValidInputs.includes(false)){
                   store.dispatch('tables/addMemberToTable', props.tableId);
                   formRef.value?.reset();
                   emit('popupClose', 'success');
                }
            })
        }

        return {inputNameRef, inputPhoneRef, formRef, isLoading, onSubmit}
    }
})
</script>

<style scoped>

</style>