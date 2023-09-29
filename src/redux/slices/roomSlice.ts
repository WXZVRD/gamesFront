import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import { IRoom } from "../../types/room/room";
import RoomServices from "../../services/RoomServices";
import {Status, TStatus} from "../../types/common";
import {RootState} from "../store";

export const fetchRooms = createAsyncThunk('rooms/fetchRooms', async () => {
    try {
        const response = await RoomServices.getAll();
        return response;
    } catch (error) {
        console.error(`ERROR: ${error}`);
        throw error;
    }
});

interface IInitState {
    rooms: IRoom[];
    status: TStatus
}

const initialState: IInitState = {
    rooms: [],
    status: Status.LOADING
}

const roomSlice = createSlice({
    name: 'room',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRooms.pending, (state) => {
                state.rooms = []
                state.status = Status.LOADING
            })
            .addCase(fetchRooms.fulfilled, (state, action: PayloadAction<IRoom[]>) => {
                state.rooms = action.payload
                state.status = Status.LOADED
            })
            .addCase(fetchRooms.rejected, (state) => {
                state.rooms = []
                state.status = Status.ERROR
            });
    },
});

export const roomSelector = (state: RootState) => state.rooms.rooms
export const roomSelectorStatus = (state: RootState) => state.rooms.status

export default roomSlice.reducer;
