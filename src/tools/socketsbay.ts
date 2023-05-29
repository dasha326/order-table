import mockTables from "../mock/tables";
import {Store} from "vuex";

export default function socketsbayStart(websocket: WebSocket, store: Store<object>) {

    websocket.onopen = ():void => {
        websocket.send(JSON.stringify(mockTables));
        store.commit('SET_CONNECTION', true);
        store.commit('tables/SET_TABLES', mockTables);
    }
    websocket.onmessage = (evt: MessageEvent):void => {
        console.log(evt.data);
        const newTables = JSON.parse(evt.data);
        store.commit('tables/SET_TABLES', newTables);
    }
    websocket.onerror = () => {
        store.commit('SET_CONNECTION_ERROR', true);
    }
}