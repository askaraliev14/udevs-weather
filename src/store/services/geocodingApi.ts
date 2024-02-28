import {api, API_KEY} from './api'

export const geocodingApi = api.injectEndpoints({
    endpoints: builder => ({
        getCoordinates: builder.query({
            query: (city) => `geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`,
        }),
    })
})

export const {
    useGetCoordinatesQuery,
} = geocodingApi
