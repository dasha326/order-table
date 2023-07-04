import { createStore } from 'vuex';
import tables from '@/store/tables'
import games from '@/store/games'
import user from '@/store/user'
const SOCKETS_BAY_API_KEY = "31e07ba9c8c1d001ed341853dc188e41";

interface IState {
  isAuth: boolean,
  connectionReady: boolean,
  connectionError: boolean,
  websocket: WebSocket;
  isPopupOpen: boolean
}

export default createStore({
  state: {
    isAuth: false,
    connectionReady: false,
    connectionError: false,
    websocket: new WebSocket(`wss://socketsbay.com/wss/v2/100/${SOCKETS_BAY_API_KEY}/`),
    isPopupOpen: false
  } as IState,
  getters: {
  },
  mutations: {
    SET_CONNECTION(state: IState, payload:boolean){
      state.connectionReady = payload;
    },
    SET_CONNECTION_ERROR(state: IState, payload:boolean){
      state.connectionReady = payload;
    },
  },
  actions: {
  },
  modules: {
    user,
    tables,
    games
  }
})
