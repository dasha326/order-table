import { createStore } from 'vuex';
import socketsbay from '../tools/socketsbay';
import ITable from '../tools/interfaces';
interface IState {
  connectionReady: boolean,
  connectionError: boolean,
  tables: null | Array<ITable>
}

export default createStore({
  state: {
    connectionReady: false,
    connectionError: false,
    tables: null,
  } as IState,
  getters: {
  },
  mutations: {
    SET_CONNECTION(state: IState, payload:boolean){
      state.connectionReady = payload
    },
    SET_CONNECTION_ERROR(state: IState, payload:boolean){
      state.connectionReady = payload
    },
    SET_TABLES(state: IState, payload: Array<ITable>){
      state.tables = payload;
    },
    ADD_MEMBER_TO_TABLE(state: IState, id:number): void{
      if (state.tables !== null){
        const table = state.tables[id];
        table.emptyPlaces --;
        if (table.emptyPlaces === 0) table.available = false;
        socketsbay.send(JSON.stringify(state.tables));
      }
    }
  },
  actions: {
  }
})
