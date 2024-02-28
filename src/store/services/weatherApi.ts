import {api, API_KEY} from './api'

export const geocodingApi = api.injectEndpoints({
    endpoints: builder => ({
        getWeatherByCity: builder.query({
            query: (city) => `data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`,
        }),
        getWeatherByCoords: builder.query({
            query: ({ lat, lon }) => `data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`,
        }),
    }),
})

export const {
    useGetWeatherByCityQuery,
    useGetWeatherByCoordsQuery,
} = geocodingApi
