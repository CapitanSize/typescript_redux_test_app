import {createSlice} from "@reduxjs/toolkit";


interface AuthState {
    auth: boolean;
}

const defaultState: AuthState = {
    auth: false
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: defaultState,
    reducers: {
        setAuth(state: AuthState) {
            state.auth = true;
        },
        setNotAuth(state: AuthState) {
            state.auth = false;
        }
    }
})

export default authSlice.reducer;