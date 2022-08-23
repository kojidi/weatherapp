import { useEffect, useState } from 'react';
import './App.scss';
// import { IoLocationSharp } from "react-icons/io5";
// import { ImLocation } from "react-icons/im";
import { TiLocation } from "react-icons/ti";
import { RiHome7Fill, RiSearchFill, RiSettings4Fill } from "react-icons/ri";
import { WiCloudyGusts, WiHumidity } from "react-icons/wi";


function App() {
  
  const [country, setCountry] = useState('');
  const [weatherInfo, setWeatherInfo] = useState(null);

  
  useEffect(() => {
    const getIp = async () => {
      const response  = await fetch('https://api.ipify.org/?format=json');
      return (await response.json()).ip;
    }
  
    const getCountry = async () => {
      const ip = await getIp();
      const response = await fetch(`http://ipwho.is/${ip}`);
      await response.json().then((res) => {
        setCountry(res.city);
        getWeatherInfo(res.city);
      })

    }

    const getWeatherInfo = async (city) => {
      const info = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=fab47a37613458dc775386dfa29d33db`);
      setWeatherInfo(await info.json())
    }
    
    getCountry()
    
    
  }, [])
  
  
  return (
    
    <div className="App">
      <header className="header">
        <div className="container">
          <h1 className="title">WEATHER APP</h1>
          <button className="country-btn">
            <TiLocation className='icon' />
            <span className='btn-title'>{country}</span>
          </button>
        </div>
      </header>

      {weatherInfo !== null ? 
        <div className="weather">
          <div className="container">
            <div className="top">
              <img src={`http://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@4x.png`} alt="Weather Icon" />
              <h3>{Math.round(weatherInfo.main.temp)}°</h3>
            </div>
            <div className="bottom">
              <div>
                <WiCloudyGusts className='icon'/>
                <span>Wind</span>
                <h3>{weatherInfo.wind.speed} km/h</h3>
              </div>
              <div>
                <WiHumidity className='icon'/>
                <span>Humidity</span>
                <h3>{weatherInfo.main.humidity}%</h3>  
              </div>
              <div>
                <WiHumidity className='icon'/>
                <span>Humidity</span>
                <h3>{weatherInfo.main.humidity}%</h3>  
              </div>
            </div>
          </div>
        </div>

        :

        null
      }

      <footer className="footer">
        <div className="items">
          <div className="home"><RiHome7Fill className='icon'/></div>
          <div className="search"><RiSearchFill className='icon'/></div>
          <div className="setting"><RiSettings4Fill className='icon'/></div>
        </div>
      </footer>
    </div>
  );
}

export default App;
