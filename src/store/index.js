import { createStore } from 'vuex';
import socketsbay from "@/tools/socketsbay";
export default createStore({
    state: {
        connectionReady: false,
        connectionError: false,
        tables: null,
    },
    getters: {
    },
    mutations: {
        SET_CONNECTION(state, payload){
            state.connectionReady = payload
        },
        SET_CONNECTION_ERROR(state, payload){
            state.connectionReady = payload
        },
        SET_TABLES(state, payload){
            state.tables = payload;
        },
        ADD_MEMBER_TO_TABLE(state, id){
            const table = state.tables[id];
            table.emptyPlaces ++;
            if (table.emptyPlaces === table.places) table.available = false;
            socketsbay.websocket.send(JSON.stringify(state.tables));
        }
    },
    actions: {
    }
})
