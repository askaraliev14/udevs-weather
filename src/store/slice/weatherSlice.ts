import { createSlice } from '@reduxjs/toolkit';

export const weatherSlice = createSlice({
    name: 'weather',
    initialState: {
        data: null,
        error: null,
        isLoading: false,
    },
    reducers: {
        setWeatherData: (state, action) => {
            state.data = action.payload
            state.error = null
            state.isLoading = false
        },
        setWeatherError: (state, action) => {
            state.error = action.payload
            state.isLoading = false
        },
        setLoading: (state) => {
            state.isLoading = true
        },
        clearWeatherData: (state) => {
            state.data = null
            state.error = null
            state.isLoading = false
        },
    },
});

export const { setWeatherData, setWeatherError, setLoading, clearWeatherData } = weatherSlice.actions;

export default weatherSlice.reducer;