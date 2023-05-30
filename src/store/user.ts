//import store from "@/store/index";

type RoleType = 'admin' | 'user';

interface IState {
    id: null | number,
    login: null | string,
    name: null | string,
    role: null | RoleType,
    tel?: null | string
}

const state: IState = {
    id: null,
    login: null,
    name: null,
    role: null,
    tel: null

}
const getters = {

};
const mutations = {

};
const actions = {}
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}