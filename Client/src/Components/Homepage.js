import React, { useEffect, useRef, useState } from 'react';
import './CSS/homepage.css';
import Grid from './Small Components/Grid';
import AreaChart from './Small Components/AreaChart';
import SearchBar from './Small Components/SearchBar'
import LoadingBar from 'react-top-loading-bar'
import Error from './Small Components/Error';
import CloseButton from './Small Components/CloseButton';


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
  const [errorState, setErrorState] = useState(false)

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
    code: 0,
    aqi: 'No data'
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
      setErrorState(true)
      setButtonClick(false)
    }
  }

  //! For aqi level
  const aqiQuality = (data) => {
    switch (data) {
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
  const linearGradient = (value) => {
    switch (value) {
      case 1000:
        return 'linear-gradient(to left, #dcdcf8, #2d5ad2)'
      case 1003:
        return 'linear-gradient(to left, #b6d6ec, #4a6777)'
      case 1006:
        return 'linear-gradient(to left, #c8cbce, #34363d)'
      case 1009:
        return 'linear-gradient(to left, #c8cbce, #34363d)'
      case 1030:
        return 'linear-gradient(to left, #aec0b6, #5e7c6e)'
      case 1063: 
        return 'linear-gradient(to left, #d4d6d9, #307a48)'
      case 1066:
        return 'linear-gradient(to left, #818486, #bdc2c2)'
      case 1069:
        return 'linear-gradient(to left, #b1b4b7, #99c2d7)'
      case 1072:
        return 'linear-gradient(to left, #7290cc, #a6afae)'
      case 1087:
        return ' linear-gradient(to left, #d3dbea, #797e7d)'
      case 1114:
        return 'linear-gradient(to left, #b0b0b2, #cbd3d2)'
      case 1117:
        return 'linear-gradient(to left, #e6f2f5, #bfd1d5)'
      case 1135:
        return 'linear-gradient(to left, #e5e3e7, #9f9ea1)'
      case 1147:
        return 'linear-gradient(to left, #c7c7d0, #67813d)'
      case 1150:
        return 'linear-gradient(to left, #809cd3, #939a99)'
      case 1153:
        return 'linear-gradient(to left, #baddef, #acb2ac)'
      case 1168:
        return 'linear-gradient(to left, #92c5e5, #99a1a0)'
      case 1171:
        return 'linear-gradient(to left, #a5cae0, #767c76)'
      case 1180:
        return 'linear-gradient(to left, #cfd5d7, #3c9158)'
      case 1183:
        return 'linear-gradient(to left, #cdd9d6, #82a9c9)'
      case 1186:
        return 'linear-gradient(to left, #9ac4f3, #aeb8c0)'
      case 1189:
        return 'linear-gradient(to left, #9ac4f3, #7b848c)'
      case 1192:
        return 'linear-gradient(to left, #427dbe, #aab4bd)'
      case 1195:
        return 'linear-gradient(to left, #d2d3d5, #023c6c)'
      case 1198:
        return 'linear-gradient(to left, #5d95d3, #b5c0c9)'
      case 1201:
        return 'linear-gradient(to left, #c5d5e8, #1d6fb4)'
      case 1204:
        return 'linear-gradient(to left, #dcdfe3, #62beb4)'
      case 1207:
        return 'linear-gradient(to left, #c5d5e8, #499a91)'
      case 1210:
        return 'linear-gradient(to left, #c5d5e8, #898c8b)'
      case 1213:
        return 'linear-gradient(to left, #f6f1f1, #c4bfbf)'
      case 1216:
        return 'linear-gradient(to left, #d1d6dc, #808583)'
      case 1219:
        return 'linear-gradient(to left, #a9b8cb, #959b99)'
      case 1222:
        return 'linear-gradient(to left, #d9dee3, #909191)'
      case 1225:
        return 'linear-gradient(to left, #d9dee3, #909191)'
      case 1237:
        return 'linear-gradient(to left, #d4e6fa, #b4bdba)'
      case 1240:
        return 'linear-gradient(to left, #d9dee3, #79b1d0)'
      case 1243:
        return 'linear-gradient(to left, #aecbf1, #49a1dc)'
      case 1246:
        return 'linear-gradient(to left, #adcefa, #3f85b4)'
      case 1249:
        return 'linear-gradient(to left, #d9dde1, #5797b9)'
      case 1252:
        return 'linear-gradient(to left, #adcefa, #499a91)'
      case 1255:
        return 'linear-gradient(to left, #c4d7ee, #8b9392)'
      case 1258:
        return 'linear-gradient(to left, #adbcce, #76807e)'
      case 1261:
        return 'linear-gradient(to left, #bfd2ea, #9ba6a3)'
      case 1264:
        return 'linear-gradient(to left, #d3e7fc, #999f9d)'
      case 1273:
        return 'linear-gradient(to left, #cadbe7, #909694)'
      case 1276:
        return 'linear-gradient(to left, #a7d2ef, #676b69)'
      case 1279:
        return 'linear-gradient(to left, #cbd2da, #696e6c)'
      case 1282:
        return 'linear-gradient(to left, #b3bacb, #484b4a)'
      default:
        return 'linear-gradient(to left, #dcdcf8, #2d5ad2)'
    }
  }
  //! This function is for fetching Data
  const fetchData = async (search) => {
    setLoaderOn(true)
    setProgress(10)
    try {
      const URL = `http://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_API_KEY}&days=3&q=${search}&aqi=yes`
      const fetchedData = await fetch(URL);
      setProgress(40)
      const obj = await fetchedData.json();
      const { humidity, wind_kph, precip_in, uv, feelslike_c, feelslike_f, temp_c, temp_f, air_quality } = obj.current;

      const { icon, text, code } = obj.current.condition;
      const { forecastday } = obj.forecast;
      //! For chart only

      let arr = forecastday.map((item) => {
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
        code: code,
        aqi: air_quality['gb-defra-index']
      });
      setGridData([
        { name: 'Humidity', unit: '%', icon: 'bx bxs-droplet', data: humidity },
        { name: 'Wind', unit: 'kph', icon: 'bx bx-wind', data: wind_kph },
        { name: 'Rain', unit: 'inch', icon: 'bx bx-cloud-rain', data: precip_in },
        { name: 'UV Index', icon: 'bx bx-sun', data: uv, id: 'uv' },
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
      {errorState ? <Error setErrorState={setErrorState} setButtonClick={setButtonClick} /> : null}
      <div>
        {buttonClick ? <CloseButton setButtonClick={setButtonClick} /> : null}
        {buttonClick ? <SearchBar getData={getData} /> : null}
        <section id={buttonClick || errorState ? `opacity` : null} ref={outsideDocument}
          style={{ background: `${linearGradient(main.code)}` }}
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
                <AreaChart chartarr={chartArr} isActive={isActive} />
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