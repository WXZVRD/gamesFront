import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";

interface IInitState {
    user: string
}

const initialState: IInitState = {
    user: ''
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        getAuth: (state, action: PayloadAction<string>) => {
            state.user = action.payload
        }
    }
});

export const userSelector = (state: RootState) => state.user.user

export const { getAuth } = userSlice.actions

export default userSlice.reducer;
