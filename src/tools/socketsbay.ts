import mockTables from "../mock/tables";
import {ISendEvents} from "@/tools/types";
import {Store} from "vuex";

export default function socketsbayStart(websocket: WebSocket, store: Store<object>) {

    websocket.onopen = ():void => {
        store.commit('SET_CONNECTION', true);
        store.commit('tables/SET_TABLES', mockTables);
    }
    websocket.onmessage = (evt: MessageEvent):void => {
        const data:ISendEvents = JSON.parse(evt.data);
         if (data.action === 'joinToTable') {
             store.commit('tables/CHANGE_EMPTY_PLACES', data.body);
        }
    }
    websocket.onerror = () => {
        store.commit('SET_CONNECTION_ERROR', true);
    }
}