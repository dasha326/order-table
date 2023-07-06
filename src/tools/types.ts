export interface ITable {
    number: number,
    private: boolean,
    available: boolean,
    places: number,
    emptyPlaces: number,
    comments: string,
    orderTime: string, //TODO: добавить new Date
    user: {
        name: string,
        tel: string,
        visibility: boolean,
    },
    gameMaster: {
        required: boolean,
        comments: string
    }
    games: string[]
}
export interface IGame {
    id: number,
    name: string,
    available: boolean,
    isOrdering: boolean,
    orderCount: number,
    count: number,
}
export interface IJoinTable {
    action: 'joinToTable',
    body: {
        tableId: number,
        emptyPlaces: number,
        available: boolean
    }
}
export interface IOrderTheTable {
    action: 'orderTheTable',
    body: ITable
}
export interface IValidateGames {
    action: 'validateGames',
    body: Record<number, string>
}
export type ISendEvents = IJoinTable | IOrderTheTable | IValidateGames

export type InputValidLabelsType = 'name' | 'tel' | 'email' | null;

export type CardPopupsType = 'join' | 'order';

/*Alert Types*/
export type RequiredType = 'success' | 'isOrder' | 'error';
export interface IRequiredAlertSuccess {
    alertType: 'success',
    title: string,
    text: string
}
export interface IRequiredAlertError {
    alertType: 'error',
    title: string,
    text: string
}
export type requiredAlertType = IRequiredAlertSuccess|IRequiredAlertError|null


export type CheckGamesType = Record<number, string>