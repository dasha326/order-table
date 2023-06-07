<template>
    <form @submit.prevent="onSubmit">
        <form-input
            ref="inputName"
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
            ref="inputPhone"
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
        <button type="submit" class="btn btn-secondary mt-3">Присоединиться</button>
    </form>
</template>

<script lang="ts">
import {defineComponent, ref } from "vue";
import FormInput from "@/components/component/form/FormInput.vue";
import SvgIcon from "@/components/component/SvgIcon.vue";
//import {useStore} from "vuex";

export default defineComponent({
    name: "JoinForm",
    components: {SvgIcon, FormInput},
    setup() {
        //const store = useStore();
        const inputName = ref();
        const inputPhone = ref();

        function onSubmit() {
            inputName.value.validateInput();
            inputPhone.value.validateInput();


            //store.dispatch('tables/addMemberToTable', props.id);
        }

        return {inputName, inputPhone, onSubmit}
    }
})
</script>

<style scoped>

</style>