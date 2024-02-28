import {useEffect, useState} from 'react'
import mist from '/images/mist-min.webp'
import rainy from '/images/rainy-min.webp'
import snow from '/images/snow-min.webp'
import sunny from '/images/sunny-min.webp'
import cloudy from '/images/cloudy-min.webp'
import LeftBar from "../components/LeftBar.tsx"
import RightBar from "../components/RightBar.tsx"
import {useDispatch, useSelector} from "react-redux";
import {useGetWeatherByCityQuery} from "../store/services/weatherApi.ts";
import {setLoading, setWeatherData, setWeatherError} from "../store/slice/weatherSlice.ts";

const Home = () => {
    const [backgroundImage, setBackgroundImage] = useState(sunny)

    const dispatch = useDispatch()

    const {data: weatherData, error, isLoading} = useGetWeatherByCityQuery('Tashkent')
    const reduxData = useSelector((state) => state.weather.data)

    useEffect(() => {
        if (isLoading) dispatch(setLoading());
        else if (error) dispatch(setWeatherError(error));
        else if (weatherData) {
            dispatch(setWeatherData(weatherData));
        }
    }, [dispatch, isLoading, error, weatherData]);

    useEffect(() => {
        if (reduxData && reduxData.weather && reduxData.weather.length > 0) {
            const weatherCondition = reduxData.weather[0].main
            if (weatherCondition.includes('Clear')) setBackgroundImage(sunny)
            else if (weatherCondition.includes('Clouds')) setBackgroundImage(cloudy)
            else if (weatherCondition.includes('Rain')) setBackgroundImage(rainy)
            else if (weatherCondition.includes('Snow')) setBackgroundImage(snow)
            else setBackgroundImage(mist)
        }
    }, [reduxData])


    return (
        <div className="background-image" style={{backgroundImage: `url(${backgroundImage})`}}>
            <div className="content container">
                <LeftBar/>
                <RightBar/>
            </div>
        </div>
    )
}

export default Home
