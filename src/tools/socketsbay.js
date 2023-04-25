import mockTables from '@/mock/tables';
import store from '@/store';
export default {
    sockets_bay_api_key: "31e07ba9c8c1d001ed341853dc188e41",
    websocket: null,
    init() {
        //connect to Sockets Bay
        const sockets_bay_url = `wss://socketsbay.com/wss/v2/100/${this.sockets_bay_api_key}/`;
        this.websocket = new WebSocket(sockets_bay_url);
        //
        this.websocket.onopen = () => this.onSocketOpen();
        this.websocket.onmessage = (evt) => this.onSocketMessage(evt);
        this.websocket.onerror = () => this.onSockerError();
    },
    onSocketOpen(){
        console.log(111)
        this.websocket.send(JSON.stringify(mockTables));
        store.commit('SET_CONNECTION', true);
        store.commit('SET_TABLES', mockTables);
        console.log(this.websocket)
    },
    onSocketMessage(evt){
        console.log(evt.data)
        const newTables = JSON.parse(evt.data)
        store.commit('SET_TABLES', newTables);
    },

    onSocketError(){
        store.SET_CONNECTION_ERROR = true;
    },
}