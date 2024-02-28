import { configureStore } from '@reduxjs/toolkit';
import {api} from "./services/api.ts";
import weatherReducer from './slice/weatherSlice.ts'

export const store = configureStore({
    reducer: {
        weather: weatherReducer,
        [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
