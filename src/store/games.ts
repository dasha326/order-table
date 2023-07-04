import {IGame, CheckGamesType} from '@/tools/types';
interface IGames {
    gamesList: null | Array<IGame>,
    orderingGames: null | CheckGamesType
}

const state:IGames = {
    gamesList: null,
    orderingGames: null
}
const getters = {};
const mutations = {
    SET_GAMES (state: IGames, payload: Array<IGame>){
      state.gamesList = payload;
    },
    SET_CHECKING_STATUS(state: IGames, payload: CheckGamesType){
        if (state.gamesList !== null) {
            for (const game of state.gamesList) {
                if(payload[game.id]) {
                    game.isOrdering = true
                }
            }
        }
    },
    SET_AVAILABLE(state: IGames, payload: CheckGamesType) {
        if (state.gamesList !== null) {
            for (const game of state.gamesList) {
                if(payload[game.id]) {
                    game.orderCount --;
                    if(game.orderCount === 0) game.available = false
                }
            }
        }
    }
};
const actions = {
    /*setOrderingToGames(games: Record<number, string>) {
        console.log(games)
        /!*if (state.gamesList !== null){


            // store.state.websocket.send(JSON.stringify(
            //     {
            //         action: 'joinToTable',
            //         body: {
            //             tableId: table.number,
            //             emptyPlaces: table.emptyPlaces,
            //             available: table.available
            //         }
            //     } as IJoinTable
            // ));
        }*!/
    }*/
  }
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}