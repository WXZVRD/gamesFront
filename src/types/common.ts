import {GameTypes} from "./game/game";


export enum Status {
    LOADING = 'LOADING',
    LOADED = 'LOADED',
    ERROR = 'ERROR'
}
export type TStatus = keyof typeof Status