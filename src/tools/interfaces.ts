export default interface  ITable {
    number: number,
    private: boolean,
    places: number,
    emptyPlaces: number,
    comments: string,
    available: boolean,
    user: {
        name: string,
        tel: string,
        visibility: boolean,
    }
}