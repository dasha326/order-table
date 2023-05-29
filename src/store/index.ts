import { createStore } from 'vuex';
import tables from '@/store/tables'
const SOCKETS_BAY_API_KEY = "31e07ba9c8c1d001ed341853dc188e41";

interface IState {
  connectionReady: boolean,
  connectionError: boolean,
  websocket: WebSocket;
}

export default createStore({
  state: {
    connectionReady: false,
    connectionError: false,
    websocket: new WebSocket(`wss://socketsbay.com/wss/v2/100/${SOCKETS_BAY_API_KEY}/`)
  } as IState,
  getters: {
  },
  mutations: {
    SET_CONNECTION(state: IState, payload:boolean){
      state.connectionReady = payload;
      console.log(222)
    },
    SET_CONNECTION_ERROR(state: IState, payload:boolean){
      state.connectionReady = payload
    },
  },
  actions: {
  },
  modules: {
    tables
  }
})
