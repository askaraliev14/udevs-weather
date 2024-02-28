// @ts-nocheck
import {useEffect, useState} from "react";
import {useGetWeatherByCityQuery} from "../store/services/weatherApi.ts";
import {setLoading, setWeatherData} from "../store/slice/weatherSlice.ts";
import {useDispatch, useSelector} from "react-redux";
import {locations} from "../constants/locations.ts";

interface WeatherData {
    clouds: {
        all: number;
    };
    main: {
        humidity: number;
        pressure: number;
    };
    wind: {
        speed: number;
    };
}

function RightBar() {
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState('')
    const [city, setCity] = useState('Tashkent')
    const [navBar, setNavBar] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const weather = useSelector((state: { weather: WeatherData }) => state.weather.data);

    const {data: weatherData, error, isLoading} = useGetWeatherByCityQuery(city, {
        skip: city === '',
    })

    useEffect(() => {
        if (isLoading) {
            dispatch(setLoading())
        } else if (error) {
            setErrorMsg(error.data.message)
            setTimeout(() => {
                setErrorMsg(null)
            }, 3000);
        } else if (weatherData) {
            dispatch(setWeatherData(weatherData))
        }
    }, [isLoading, error, weatherData, dispatch])
    const handleSearch = () => {
        setCity(searchTerm)
        setNavBar(false)
    }
    const searchList = (value) => {
        setCity(value)
        setNavBar(false)
    }
    function handleClick() {
        setNavBar(!navBar);
    }
    return (
        <>
            <div className={`${navBar ? 'close-icon ' : 'burger-menu'}`} onClick={handleClick}/>
            <div className={`right-container ${navBar ? 'display-navbar scale-up-hor-right' : ''}`}>
                <div className="search-box">
                    <input
                        className="search-box__input"
                        placeholder="Another location"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    />
                    <button className="search-box__btn" onClick={handleSearch}/>
                </div>
                <p className={`error-message ${errorMsg ? '' : 'hidden'}`}>{errorMsg}</p>
                <div className="scroll_box">
                    <ul>
                        {locations.map(e => (
                            <li
                                className="font-secondary"
                                key={e.id}
                                onClick={() => searchList(e.value)}
                            >
                                {e.name}
                            </li>
                        ))}
                    </ul>
                </div>
                <hr className="divider"/>
                <div className="weather-detail">
                    <h2 className="font-primary">Weather Detail</h2>
                    <div className="weather-detail__list">
                        <div className="weather-detail__item">
                            <p className="font-secondary">
                                Cloudy
                            </p>
                            <p className="font-primary">{weather?.clouds?.all || ''}%</p>
                        </div>
                        <div className="weather-detail__item">
                            <p className="font-secondary">
                                Humidity
                            </p>
                            <p className="font-primary">{weather?.main?.humidity || ''}%</p>
                        </div>
                        <div className="weather-detail__item">
                            <p className="font-secondary">
                                Wind
                            </p>
                            <p className="font-primary">{weather?.wind?.speed || ''}km/h</p>
                        </div>
                        <div className="weather-detail__item">
                            <p className="font-secondary">
                                Pressure
                            </p>
                            <p className="font-primary">{weather?.main?.pressure || ''}km/h</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RightBar