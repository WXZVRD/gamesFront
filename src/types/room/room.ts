import {GameType} from "../game/game";

export enum RoomStatus {
    WAITING = 'Waiting',
    ONGOING = 'Ongoing'
}

export type TRoomStatus = keyof typeof RoomStatus;




export interface IRoom {
    id: string,
    game: GameType,
    users: Array<string>,
    host: string,
    status: TRoomStatus,
}