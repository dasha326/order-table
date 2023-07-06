import {ITable, IJoinTable, IOrderTheTable, IValidateGames, RequiredType} from '@/tools/types';
import store from "@/store/index";
import {reactive} from "vue";

interface ITableList {
  tablesList: null | Array<ITable>
}

const state:ITableList = {
    tablesList: null,
  }
const getters = {
    // userName(state: IState){
    //   if (state.tablesList !== null) return state.tablesList[id].user.name
    // }
  };
const mutations = {
    SET_TABLES(state: ITableList, payload: Array<ITable>){
      state.tablesList = payload;
    },
    CHANGE_EMPTY_PLACES(state: ITableList, payload: IJoinTable['body']){
        state.tablesList?.forEach(table => {
            if(table.number === payload.tableId) {
                table.emptyPlaces = payload.emptyPlaces;
                if (payload.emptyPlaces === 0) table.available = false;
            }
        })
    },
  };
const actions = {
    async orderTable({ state }: { state: ITableList }, payload:{table:ITable,id:number}) {
        type resultType = {
            action: RequiredType,
            body: ITable
        }
        return new Promise<resultType>((resolve) => {
            //Имитация проверки на сервере, не занят ли стол, на момент нажатия кнопки забронировать
            setTimeout(() => {
                if (payload.id === 0) {
                    resolve({
                        action: 'isOrder',
                        body: {
                            number: 1,
                            private: true,
                            available: false,
                            places: 6,
                            emptyPlaces: 1,
                            comments: "Я первый его забронировал",
                            orderTime: "12.00",
                            gameMaster: {
                                required: false,
                                comments: "",
                            },
                            user: {
                                name: "Семен Семеныч",
                                tel: '+7 (666) 666-66-66',
                                visibility: true
                            },
                            games: []
                        }
                    });
                } else {
                    resolve({
                        action: 'success',
                        body: payload.table
                    });
                }
            }, 2000)
        }).then(
            (result) => {
                if (state.tablesList !== null) state.tablesList[payload.id] = result.body;
                store.state.websocket.send(JSON.stringify({
                        action: 'orderTheTable',
                        body: result.body
                    } as IOrderTheTable
                ));
                return result.action
            }
        )
    },
    addMemberToTable({ state }: { state: ITableList }, id: number) {
        if (state.tablesList !== null){
            const table = state.tablesList[id];
            table.emptyPlaces --;
            if (table.emptyPlaces === 0) table.available = false;

            store.state.websocket.send(JSON.stringify(
                {
                    action: 'joinToTable',
                    body: {
                        tableId: table.number,
                        emptyPlaces: table.emptyPlaces,
                        available: table.available
                    }
                } as IJoinTable
            ));
        }
    }
  }
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}