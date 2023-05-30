<template>
    <div class="card">
        <span class="badge text-bg-success" v-if="canOrder">Свободный стол</span>
        <span class="badge text-bg-danger" v-else>Забронирован</span>
        <span class="badge text-bg-success" v-if="canJoin">Можно присоединится</span>
        <span class="badge text-bg-warning" v-else-if="noEmptyPlaces">Мест нет</span>
        <div class="card-body">
            <h5 class="card-title">Стол номер {{table.number}}</h5>
            <h6 class="card-subtitle mb-2 text-body-secondary">Стол расчитан на: {{table.places}}</h6>
            <h6 class="card-subtitle mb-2 text-body-secondary" v-if="!table.private">Свободно мест: {{table.emptyPlaces}}</h6>
            <p class="card-text" v-if="table.comments">{{table.comments}}</p>
            <div class="card-text mt-4" v-if="hasGames">
                <h6>Игры на столе:</h6>
                <div class="collapse show" id="table-games">
                    <ul class="list-group mt-3">
                        <li class="list-group-item list-group-item-light" v-for="item in table.games" :key="item">{{item}}</li>
                    </ul>
                </div>
            </div>
            <div class="card-text mt-4" v-if="userNameVisible && !canOrder">Стол забронировал(ла) {{table.user.name}} на {{table.orderTime}} </div>

        </div>
        <div class="card-footer" v-if="canOrder || canJoin">
            <button type="button" class="btn btn-primary" v-if="canOrder" @click="orderTheTable()">Забронировать</button>
            <button type="button" class="btn btn-primary" v-if="canJoin" @click="joinTheTable()">Присоединиться</button>
        </div>
    </div>
</template>

<script lang="ts">
import {toRefs, computed } from "vue";
import {useStore} from "vuex";
import {ITable} from '@/tools/types'

interface ICardTable {
    table: ITable,
    id: number
}

export default {
    name: "CardTable",
    props: ['table', 'id'],
    setup(props: ICardTable ){
        const store = useStore();
        const { table } = toRefs(props);
        function joinTheTable(){
            store.dispatch('tables/addMemberToTable', props.id);
        }

        return {
            canOrder: computed(() => table.value.available && (table.value.emptyPlaces === table.value.places)),
            canJoin: computed(() => !table.value.private && table.value.available && (table.value.emptyPlaces < table.value.places)),
            noEmptyPlaces: computed(() => table.value.emptyPlaces === 0),
            hasGames: computed(() => table.value.games.length > 0),
            userNameVisible: computed(() => table.value.user.visibility && table.value.user.name !== null),
            joinTheTable}
    },
}
</script>

<style scoped lang="scss">
    .card{
        height: 100%;
    }
</style>