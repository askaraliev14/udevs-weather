// @ts-nocheck
import { useSelector } from "react-redux";

interface WeatherData {
    main: {
        temp: number;
    };
    name: string;
    weather: {
        icon: string;
        main: string;
    }[];
}

function LeftBar() {
    const weather = useSelector((state: { weather: WeatherData }) => state.weather.data)
    const now = new Date()
    const formattedTime = `${now.getHours()}:${(now.getMinutes() < 10 ? '0' : '') + now.getMinutes()} - ${now.toLocaleString('en-US', { weekday: 'long', day: 'numeric', month: 'short', year: '2-digit' })}`
    return (
        <div className="left-container">
            <h1 className="header">The.Weather</h1>
            <div className="title-box">
                <h2 className="title-box__temp">
                    {Math.floor(weather?.main?.temp) || ''}&deg;
                </h2>
                <div className="title-box__location">
                    <h3>{weather?.name}</h3>
                    <p>{formattedTime}</p>
                </div>
                <div className="title-box__weather">
                    <img src={`http://openweathermap.org/img/w/${weather?.weather[0]?.icon}.png`} alt="Weather Icon"/>
                    <p>
                        {weather?.weather[0]?.main || ''}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default LeftBar