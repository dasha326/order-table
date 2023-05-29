<template>
    <div class="card">
        <span class="badge text-bg-success" v-if="canOrder">Свободный стол</span>
        <span class="badge text-bg-danger" v-else>Забронирован</span>
        <span class="badge text-bg-success" v-if="canJoin">Можно присоединится</span>
        <span class="badge text-bg-warning" v-else-if="noEmptyPlaces">Мест нет</span>
        <div class="card-body">
            <h5 class="card-title">Стол номер {{table.number}}</h5>
            <h6 class="card-subtitle mb-2 text-body-secondary">Стол расчитан на: {{table.places}}</h6>
            <h6 class="card-subtitle mb-2 text-body-secondary">Свободно мест: {{table.emptyPlaces}}</h6>
            <p class="card-text" v-if="table.comments">{{table.comments}}</p>
            <div class="btn-group-vertical" role="group" aria-label="Vertical button group">
                <button type="button" class="btn btn-primary" v-if="canOrder" @click="orderTheTable()">Забронировать</button>
                <button type="button" class="btn btn-primary" v-if="canJoin" @click="joinTheTable()">Присоединиться</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {toRefs, computed } from "vue";
import {useStore} from "vuex";
import ITable from '../tools/interfaces'

interface ICardTable {
    table: ITable,
    id: number
}

export default {
    name: "CardTable",
    props: {
        table: Object,
        id: Number
    },
    setup(props: ICardTable ){
        const store = useStore();
        const { table } = toRefs(props);
        const canOrder = computed(() => table.value.available && (table.value.emptyPlaces === table.value.places));
        const canJoin = computed(() => !table.value.private && table.value.available && (table.value.emptyPlaces < table.value.places));
        const noEmptyPlaces = computed(() => table.value.emptyPlaces === 0);

        function joinTheTable(){
            store.commit('ADD_MEMBER_TO_TABLE', props.id);
        }

        return {canOrder, canJoin, noEmptyPlaces, joinTheTable}
    },
}
</script>

<style scoped>

</style>