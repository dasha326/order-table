import ITable from '@/tools/interfaces';
import store from "@/store/index";
interface IState {
  tablesList: null | Array<ITable>
}

const state:IState = {
    tablesList: null,
  }
const getters = {
    // userName(state: IState){
    //   if (state.tablesList !== null) return state.tablesList[id].user.name
    // }
  };
const mutations = {
    SET_TABLES(state: IState, payload: Array<ITable>){
      state.tablesList = payload;
    },
    ADD_MEMBER_TO_TABLE(state: IState, id:number): void{
      if (state.tablesList !== null){
        const table = state.tablesList[id];
        table.emptyPlaces --;
        if (table.emptyPlaces === 0) table.available = false;
        store.state.websocket.send(JSON.stringify(state.tablesList));
      }
    }
  };
const actions = {
  }
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}