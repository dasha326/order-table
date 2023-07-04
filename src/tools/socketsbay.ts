import mockTables from "../mock/tables";
import mockGames from "../mock/games";
import {ISendEvents} from "@/tools/types";
import {Store} from "vuex";

export default function socketsbayStart(websocket: WebSocket, store: Store<object>) {

    websocket.onopen = () => {
        store.commit('SET_CONNECTION', true);
        store.commit('tables/SET_TABLES', mockTables);
        store.commit('games/SET_GAMES', mockGames);
    }
    websocket.onmessage = (evt: MessageEvent) => {
        const data:ISendEvents = JSON.parse(evt.data);
         if (data.action === 'joinToTable') {
             store.commit('tables/CHANGE_EMPTY_PLACES', data.body);
         }
         if (data.action === 'validateGames'){
             store.commit('games/SET_CHECKING_STATUS', data.body)
         }
    }
    websocket.onerror = () => {
        store.commit('SET_CONNECTION_ERROR', true);
    }
}