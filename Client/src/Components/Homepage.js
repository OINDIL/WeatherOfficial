import React, { useEffect, useRef, useState } from 'react';
import './CSS/homepage.css';
import Grid from './Small Components/Grid';
import AreaChart from './Small Components/AreaChart';
import SearchBar from './Small Components/SearchBar'
import LoadingBar from 'react-top-loading-bar'
import Error from './Small Components/Error';


function Homepage() {
  //? states
  const [isActive, setIsActive] = useState(false); // for switch
  const [chartArr, setChartArr] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [buttonClick, setButtonClick] = useState(false);
  const [searchedValue, setSearchedValue] = useState(null);
  //* Loader Component states
  const [progress, setProgress] = useState(0);
  const [loaderOn, setLoaderOn] = useState(false);
  //* Error component
  const [errorState,setErrorState] = useState(false)
  
  const [gridData, setGridData] = useState([
    { name: 'Humidity', icon: 'bx bxs-droplet', data: 0 },
    { name: 'Wind', icon: 'bx bx-wind', data: 0 },
    { name: 'Rain', icon: 'bx bx-cloud-rain', data: 0 },
    { name: 'UV Index', icon: 'bx bx-sun', data: 0 },
    { name: 'Feels Like', icon: 'bx bxs-thermometer', data: 0 },
    { name: 'Chance of Rain', icon: 'bx bx-water', data: 0 },
  ]);
  const [main, setMain] = useState({
    city: 'No Data',
    country: 'No Data',
    Date: 'No Data',
    sunset: 'No Data',
    sunrise: 'No Data',
    temperature_c: 0,
    temperature_f: 0,
    icon: '',
    condition: 'No Data',
    code:0,
    aqi:'No data'
  });
  //? states End
  //? Refs
  let outsideDocument = useRef();
  //? End of Refs
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        setButtonClick(false);
      }
    }

    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [])
  //! Searched Value is coming here
  const getData = (data) => {
    if (data) {
      setSearchedValue(data)
    }
    else {
      // alert("Can't Search Empty Locations")
      setErrorState(true)
      setButtonClick(false)
    }
  }

  //! For aqi level
  const aqiQuality = (data) =>{
    switch(data){
      case 1:
        return 'Low'
      case 2:
        return 'Low'
      case 3:
        return 'Low'
      case 4:
        return 'Moderate'
      case 5:
        return 'Moderate'
      case 6:
        return 'Moderate'
      case 7:
        return 'High'
      case 8:
        return 'High'
      case 9:
        return 'High'
      case 10:
        return 'Hazardous'
      default:
        return 'Undefined'
    }
  }
  //! for linear gradient
  const linearGradient = (value) =>{
    switch(value){
      case 1000:
        return 'linear-gradient(to left, #dcdcf8, #2d5ad2)'
      case 1003:
        return 'linear-gradient(to left, #b6d6ec, #4a6777)'
      case 1006:
        return 'linear-gradient(to left, #c8cbce, #34363d)'
      case 1009:
        return 'linear-gradient(to left, #9c9d9d, #505252)'
      case 1030:
        return 'linear-gradient(to left, #aec0b6, #5e7c6e)'
      case 1135:
        return 'linear-gradient(to left, #e5e3e7, #9f9ea1)'
      default:
        return 'linear-gradient(to left, #dcdcf8, #2d5ad2)'
    }
  }
  //! This function is for fetching Data
  const fetchData = async (search) => {
    setLoaderOn(true)
    setProgress(10)
    try {
      const fetchedData = await fetch(
        `http://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_API_KEY}&days=3&q=${search}&aqi=yes`
      );
      setProgress(40)
      const obj = await fetchedData.json();
      const { humidity, wind_kph, precip_in, uv, feelslike_c, feelslike_f, temp_c, temp_f,air_quality} = obj.current;

      const { icon, text,code } = obj.current.condition;
      const { forecastday } = obj.forecast;
      //! For chart only
      
      let arr = forecastday.map((item)=>{
        return (item.day.avgtemp_c);
      })
      setChartArr(arr)

      const { name, country, localtime } = obj.location;
      const { sunrise, sunset } = obj.forecast.forecastday[0].astro;
      const { daily_chance_of_rain } = obj.forecast.forecastday[0].day;
      setProgress(60)
      setMain({
        city: name,
        country: country,
        Date: localtime,
        sunset: sunset,
        sunrise: sunrise,
        temperature_c: temp_c,
        temperature_f: temp_f,
        icon: icon,
        condition: text,
        code:code,
        aqi: air_quality['gb-defra-index']
      });
      setGridData([
        { name: 'Humidity', unit: '%', icon: 'bx bxs-droplet', data: humidity },
        { name: 'Wind', unit: 'kph', icon: 'bx bx-wind', data: wind_kph },
        { name: 'Rain', unit: 'inch', icon: 'bx bx-cloud-rain', data: precip_in },
        { name: 'UV Index', icon: 'bx bx-sun', data: uv },
        {
          name: 'Feels Like', icon: 'bx bxs-thermometer', data: Math.floor(feelslike_c), data_f: Math.floor(feelslike_f), id: 'temp'
        },
        {
          name: 'Chance of Rain', unit: '%', icon: 'bx bx-water', data: daily_chance_of_rain,
        },
      ]);
      setProgress(75)
    } catch (err) {
      setErrorState(true)
    }
    setProgress(100)
    setButtonClick(false)
  };
  useEffect(() => {
    fetchData(searchedValue);
  }, [searchedValue]);

  const handleButtonClick = () => {
    setIsActive(!isActive);
  };


  
  return (
    <>
      {loaderOn ? <LoadingBar color='#0C4CE3' progress={progress} onLoaderFinished={() => setProgress(0)} /> : null}
      {errorState ? <Error setErrorState={setErrorState} setButtonClick={setButtonClick}/> : null} 
      <div>
        {buttonClick ? <SearchBar getData={getData} /> : null}
        <section id={buttonClick || errorState ? `opacity` : null} ref={outsideDocument}
        style={{background:`${linearGradient(main.code)}`}}
        >
          <main>
            <div className="add-location">
              <button id='add-location-btn' type="button" onClick={() => setButtonClick(!buttonClick)}><i className="bx bxs-plus-square"></i></button>
              <div className="switch-deg">
                <p>&deg;C</p>
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="flexSwitchCheckDefault"
                    onClick={handleButtonClick}
                  />
                </div>
                <p>&deg;F</p>
              </div>
            </div>

            <div className="location-date-sun">
              <div className="location-date">
                <div className="location">
                  <i className="bx bx-compass"></i>
                  <p>
                    {main.city}, {main.country}
                  </p>
                </div>
                <div className="date">
                  <p>{main.Date}</p>
                </div>
              </div>
              <div className="sun">
                <div className="sunrise d-flex gap-2">
                  <i className="bx bx-sun"></i>
                  <p>{main.sunrise}</p>
                </div>
                <div className="sunset d-flex gap-2">
                  <i className="bx bxs-moon"></i>
                  <p>{main.sunset}</p>
                </div>
              </div>
            </div>

            <div className="temp">
              <h2>{isActive ? Math.floor(main.temperature_f) : Math.floor(main.temperature_c)}&deg;</h2>
              <h3>AQI is {aqiQuality(main.aqi)}</h3>
              <div className="type">
                <img src={`${main.icon}`} alt="" />
                <p>{main.condition}</p>
              </div>
            </div>
          </main>
          <aside>
            <div className="welcome-text-logo">
              <div className="text">
                <h5>Welcome back oindil!</h5>
                <p>Check out today's weather information</p>
              </div>
              <div className="logo">
                <img src="" alt="logo" />
              </div>
            </div>
            <div className="upcoming-card">
              <div className="upcoming">
                <h6>Upcoming Days</h6>
                <button type="button">Next Day &gt;</button>
              </div>
              <div className="chart">
                <AreaChart chartarr={chartArr} isActive={isActive}/>
              </div>
            </div>
            <div className="more-details">
              <div className="text">
                <h6>More details of today's weather</h6>
              </div>
              <div className="grid-container">
                {gridData.map((item, index) => {
                  return (
                    <div className="grids" key={index}>
                      <Grid data={item} active={isActive} />
                    </div>
                  );
                })}
              </div>
            </div>
          </aside>
        </section>
      </div>
    </>
  );
}

export default Homepage;