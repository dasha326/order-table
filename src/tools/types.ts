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
    body: {
        tableId: number,
        emptyPlaces: number,
        available: boolean
    }
}
export type ISendEvents = IJoinTable | IOrderTheTable

export type InputValidLabelsType = 'name' | 'tel' | 'email' | null;

export type CardPopupsType = 'join' | 'order';