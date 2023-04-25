<template>
    <section class="tables">
        <div class="row">
            <div class="col-lg-4 col-sm-6 mt-3" v-for="(item, i) in list" :key="i">
                <div class="card">
                    <span class="badge text-bg-success" v-if="item.canOrder">Можно забронировать</span>
                    <span class="badge text-bg-danger" v-else>Забронирован</span>
                    <div class="card-body">
                        <h5 class="card-title">Стол номер {{item.number}}</h5>
                        <h6 class="card-subtitle mb-2 text-body-secondary">Стол расчитан на: {{item.places}}</h6>
                        <h6 class="card-subtitle mb-2 text-body-secondary">Свободно мест: {{item.emptyPlaces}}</h6>
                        <p class="card-text" v-if="item.comments">{{item.comments}}</p>
                        <div class="btn-group-vertical" role="group" aria-label="Vertical button group">
                            <button type="button" class="btn btn-primary" v-if="isShowJoinBtn(item)" @click="joinTheTable(i)">Присоединиться</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { mapMutations} from "vuex";
export default {
    name: "ListTables",
    props: {
        list: Array,
    },
    methods: {
        ...mapMutations(['ADD_MEMBER_TO_TABLE']),
        isShowJoinBtn(item){
            return !item.canOrder && item.available
        },
        joinTheTable(id){
           this.ADD_MEMBER_TO_TABLE(id);
        }
    }
}
</script>

<style scoped>

</style>