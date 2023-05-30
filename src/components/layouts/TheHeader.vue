<template>
    <header class="p-3 border-bottom">
        <div class="container">
            <div class="row justify-content-between align-items-center">
                <div class="col-sm-auto">
                    <p class="h4">ИГРОТЕКА</p>
                </div>
                <div class="col-sm-auto">
                    <button class="btn btn-sm btn-secondary" v-if="!isAuth">Войти</button>
                    <p class="fw-bold" v-if="isAuth">Ваня Попов</p>

                </div>
            </div>
        </div>
    </header>
</template>

<script>
import {toRef} from "vue";
import {useStore} from "vuex";

export default {
    name: "TheHeader",
    setup(){
        const store = useStore();
        const isAuth = toRef(store.state.isAuth)
        return{
            isAuth
        }
    }
}
</script>

<style scoped>

</style>