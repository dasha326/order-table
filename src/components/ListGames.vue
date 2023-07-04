<template>
    <ul class="games-list">
        <li class="games-list__item" v-for="(item) in games" :key="item.id">
            <div class="game-card">
                <form-checkbox
                    :label="item.name"
                    :isDisabled="!item.available || item.isOrdering"
                    :value="item.name"
                    :inputId="'game-'+ item.id"
                    :id="item.id"
                    v-model="checkedGames[item.id]"
                    isMultiple
                    @unChecked="unCheckedItem"
                />
                <span class="game-card__count">{{item.orderCount}} / {{item.count}}</span>
            </div>
            <p v-if="item.isOrdering">бронируется</p>
        </li>
    </ul>
    <div class="game-card__checked">
        <div class="row">
            <div class="col-sm-9">
                {{checkedGamesList}}
            </div>
            <div class="col-sm-3">
                <button type="button" class="btn btn-primary w-100" @click="sendList">Сохранить</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent,computed, ref} from "vue";
import {useStore} from "vuex";
import {IValidateGames, CheckGamesType} from '@/tools/types';
import FormCheckbox from "@/components/component/form/FormCheckbox.vue";

export default defineComponent({
    name: "ListTables",
    components: {FormCheckbox},
    emits: ['sendList'],
    setup(props, {emit}) {
        const store = useStore();
        const games = computed(() => store.state.games.gamesList);
        const checkedGames = ref<CheckGamesType>({});
        const checkedGamesList = computed(():string => {
            return Object.values(checkedGames.value).reverse().join(', ')
        })

        const unCheckedGames = ref<CheckGamesType>({});
        const unCheckedGamesList = computed(():string => {
            return Object.values(unCheckedGames.value).reverse().join(', ')
        })

        function unCheckedItem(key:number){
            delete checkedGames.value[key];
        }
        async function sendList() {
           //store.dispatch('games/setOrderingToGames', checkedGames)

            //Имитация проверки на сервере, не заняты ли игры, на помент нажатия кнопки сохранить
            new Promise((resolve) => {
                setTimeout(() => {
                    if (checkedGames.value[0]) {
                        unCheckedGames.value[0] = checkedGames.value[0]
                        unCheckedItem(0);
                    } //Todo: Доделать отжатие чекбокса
                    resolve(checkedGames.value);
                }, 3000)
            }).then(
                (result) => {``
                    //store.commit('games/SET_AVAILABLE', result)``
                    store.state.websocket.send(JSON.stringify(
                        {
                            action: 'validateGames',
                            body: result
                        } as IValidateGames
                    ))

                    emit("sendList", checkedGamesList.value, unCheckedGamesList.value)
                }
            )
        }
        return {
            games, checkedGames, checkedGamesList, unCheckedItem, sendList
        }
    }
})
</script>

<style scoped lang="scss">
    .games-list{
        padding: 0;
        column-count: 3;
        margin-bottom: 80px;

        &__item{
            list-style: none;
            margin-top: 15px;
        }
    }
    .game-card{
        display: flex;
        align-items: center;
        &__count{
            padding-left: 15px;
        }
        .form-group{
            margin-top: 0;
        }
        &__checked{
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            padding: 15px 5px;
            background-color: lighten($secondary, 40%);
        }
    }
</style>