<template>
    <form ref="formRef" @submit.prevent="onSubmit">
        <fieldset>
            <legend>Данные о столе</legend>
            <div class="row">
                <div class="col-sm-auto">
                    <form-input
                        ref="inputPeopleRef"
                        label="Сколько человек за столом"
                        is-required
                        type="number"
                        placeholder="2"
                        min="2"
                        :max="table.places"
                        v-model="orderPlaces"
                    />
                </div>
                <div class="col-sm-auto">
                    <form-input
                        ref="inputTimeRef"
                        label="Время бронирования"
                        is-required
                        placeholder="14.00"
                        v-model="table.orderTime"
                    />
                </div>
                <form-textarea
                    label="Комментарии к столу"
                    placeholder="Не знаем правил 'Название игры', будем рады если кто-нибудь расскажет)"
                    v-model="table.comments"
                />
            </div>
            <form-checkbox label="Приватный стол" inputName="privet-table" inputId="privetTableCheck" v-model="table.private"/>
            <form-checkbox label="Нужен игровед" inputName="game-master" inputId="gameMasterCheck" v-model="table.gameMaster.required"/>
            <GamesPopup v-model="checkGames"/>
            <p class="mt-2"><strong>Выбранные игры:</strong> {{checkGames}}</p>
        </fieldset>
        <fieldset class="mt-4">
            <legend>Личные данные</legend>
            <form-input
                ref="inputNameRef"
                label="Имя"
                placeholder="Введите ваше имя"
                type="text"
                valid="fio"
                isRequired
                v-model="table.user.name"
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
                v-model="table.user.tel"
            >
                <template #prefix>
                    <svg-icon name="phone"/>
                </template>
            </form-input>
            <form-input
                label="Email"
                type="email"
                valid="email"
                v-model="table.user.email"
            >
                <template #prefix>
                    <svg-icon name="email"/>
                </template>
            </form-input>
            <form-checkbox
                label="Показывать своё имя в карточке стола"
                inputId="userVisibilityCheck"
                v-model="table.user.visibility"
                checked
            />
        </fieldset>

        <button type="submit" class="btn btn-secondary mt-3">Забронировать</button>
    </form>
</template>

<script lang="ts">
import {defineComponent, PropType, ref, reactive, computed, watch} from "vue";
import {useStore} from "vuex";
import {ITable} from '@/tools/types'
import FormInput from "@/components/component/form/FormInput.vue";
import FormCheckbox from "@/components/component/form/FormCheckbox.vue";
import SvgIcon from "@/components/component/SvgIcon.vue";
import FormTextarea from "@/components/component/form/FormTextarea.vue";
import GamesPopup from "@/components/GamesPopup.vue";

export default defineComponent({
    name: "OrderForm",
    components: {GamesPopup, FormTextarea, SvgIcon, FormInput, FormCheckbox},
    props: {
        tableId:{
            type: Object as PropType<number>,
            required: true
        }
    },
    setup(props, {emit}) {
        const store = useStore();
        const storeTable = store.state.tables.tablesList[props.tableId];
        const storeUser = store.state.user;

        const checkGames = ref();
        const orderPlaces = ref();
        const table = reactive<ITable>({
            number: storeTable.number,
            private: false,
            available: true,
            places: storeTable.places,
            emptyPlaces: storeTable.places,
            comments: "",
            orderTime: "",
            gameMaster: {
                required: false,
                comments: "",
            },
            user: {
                name: storeUser.name,
                tel: storeUser.tel,
                visibility: true
            },
            games: []
        });
        watch(checkGames, (newArray) => {
            table.games = newArray?.split(',')
        })
        watch(orderPlaces, (places) => {
            table.emptyPlaces = storeTable.places - places;
        })
        //const store = useStore();

        const inputNameRef = ref();
        const inputPhoneRef = ref();
        const inputPeopleRef = ref();
        const inputTimeRef = ref();
        const formRef = ref();
        function onSubmit() {
            const isValidName = inputNameRef.value.validateInput();
            const isValidPhone = inputPhoneRef.value.validateInput();
            const isValidPeople = inputPeopleRef.value.validateInput();
            const isValidTime = inputTimeRef.value.validateInput();
            Promise.all([isValidName, isValidPhone, isValidPeople, isValidTime]).then((isValidInputs) => {
                if(!isValidInputs.includes(false)){
                    store.dispatch('tables/orderTable', {table, id: props.tableId}).then(result => {
                        //formRef.value?.reset();
                        switch (result) {
                            case "success": emit('popupClose', 'success');
                                break;
                            case "isOrder": emit('popupClose', 'isOrder');
                                break;
                            case "error": emit('popupClose', 'error');
                                break;
                        }
                    });

                }
            })
            //store.dispatch('tables/addMemberToTable', props.id);
        }
        return {table, orderPlaces, checkGames, inputNameRef, inputPhoneRef, inputTimeRef, inputPeopleRef, formRef, onSubmit}
    }
})
</script>

<style scoped>

</style>