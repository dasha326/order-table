<template>
    <div>
        <h2>{{title}}</h2>
        <form @submit.prevent="onSubmit" >
            <form-input
                label="Имя"
                labelHidden
                placeholder="Введите ваше имя"
                type="text"
                hasPrefix
                valid="fio"
                isRequired

            >
                <template #prefix>
                    <svg-icon name="user"/>
                </template>
            </form-input>
            <form-input
                label="Телефон"
                type="tel"
                hasPrefix
                isRequired
                valid="tel"
                v-maska
                data-maska="+7 (###) ###-##-##"
            >
                <template #prefix>
                    <svg-icon name="phone"/>
                </template>
            </form-input>
            <form-input
                label="Email"
                type="email"
                hasPrefix
                valid="email"
            >
                <template #prefix>
                    <svg-icon name="email"/>
                </template>
            </form-input>
            <button type="submit">Jn</button>
        </form>
    </div>
</template>

<script>
import {ref} from "vue";
import FormInput from "@/components/component/form/FormInput";
import SvgIcon from "@/components/component/SvgIcon";
export default {
    name: "ThePopup",
    components: {SvgIcon, FormInput},

    props: {
        title: String,
    },
    setup(){
      const input = ref();
      function onSubmit() {
          console.log(333)
          input.value.validateInput()
      }
      return {input, onSubmit}
    }
}
</script>

<style scoped>

</style>