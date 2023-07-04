import {ITable, IJoinTable} from '@/tools/types';
import store from "@/store/index";

interface ITableList {
  tablesList: null | Array<ITable>
}

const state:ITableList = {
    tablesList: null,
  }
const getters = {
    // userName(state: IState){
    //   if (state.tablesList !== null) return state.tablesList[id].user.name
    // }
  };
const mutations = {
    SET_TABLES(state: ITableList, payload: Array<ITable>){
      state.tablesList = payload;
    },
    CHANGE_EMPTY_PLACES(state: ITableList, payload: IJoinTable['body']){
        state.tablesList?.forEach(table => {
            if(table.number === payload.tableId) {
                table.emptyPlaces = payload.emptyPlaces;
                if (payload.emptyPlaces === 0) table.available = false;
            }
        })
    },
  };
const actions = {
    orderTable({ state }: { state: ITableList }, payload:{table:ITable,id:number}) {
        if (state.tablesList !== null) {
            state.tablesList[payload.id] = payload.table
        }
    },
    addMemberToTable({ state }: { state: ITableList }, id: number) {
        if (state.tablesList !== null){
            const table = state.tablesList[id];
            table.emptyPlaces --;
            if (table.emptyPlaces === 0) table.available = false;

            store.state.websocket.send(JSON.stringify(
                {
                    action: 'joinToTable',
                    body: {
                        tableId: table.number,
                        emptyPlaces: table.emptyPlaces,
                        available: table.available
                    }
                } as IJoinTable
            ));
        }
    }
  }
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}