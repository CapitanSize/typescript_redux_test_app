import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {appApi} from "../services/appService";
import authReducer from './reducers/authSlice'


const rootReducer = combineReducers({
    [appApi.reducerPath]: appApi.reducer,
    authReducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(appApi.middleware)
    })
}
export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']