import mockTables from "../mock/tables";
import store from '@/store';

const SOCKETS_BAY_API_KEY = "31e07ba9c8c1d001ed341853dc188e41";
const websocket = new WebSocket(`wss://socketsbay.com/wss/v2/100/${SOCKETS_BAY_API_KEY}/`);

websocket.onopen = ():void => {
    websocket.send(JSON.stringify(mockTables));
    store.commit('SET_CONNECTION', true);
    store.commit('SET_TABLES', mockTables);
}
websocket.onmessage = (evt: MessageEvent):void => {
    console.log(evt.data);
    const newTables = JSON.parse(evt.data);
    store.commit('SET_TABLES', newTables);
}
websocket.onerror = () => {
    store.commit('SET_CONNECTION_ERROR', true);
}

export default websocket;