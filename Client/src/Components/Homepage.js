import React, { useEffect, useRef, useState } from 'react';
import './CSS/homepage.css';
import Grid from './Small Components/Grid';
import AreaChart from './Small Components/AreaChart';
import SearchBar from './Small Components/SearchBar'

function Homepage() {
  //? states
  const [isActive, setIsActive] = useState(false); // for switch
  const [chartArr, setChartArr] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [buttonClick, setButtonClick] = useState(false);
  // const [clickOutside,setClickOutside] = useState(false);
  //? states End
  //? Refs
  let outsideDocument = useRef();
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        setButtonClick(false);
      }
    }

    const handleClickOutside = (event) => {
      if (!outsideDocument.current.contains(event.target) && outsideDocument.current) {
        setButtonClick(false) 
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [])


  let arr = []; // for apex charts
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
  });

  const fetchData = async (search) => {
    const fetchedData = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_API_KEY}&days=7&q=${search}&aqi=yes`
    );
    const obj = await fetchedData.json();
    const { humidity, wind_kph, precip_in, uv, feelslike_c, feelslike_f, temp_c, temp_f } = obj.current;
    const { icon, text } = obj.current.condition;
    const { forecastday } = obj.forecast;
    //! For chart only
    forecastday.forEach((item) => {
      arr.push(item.day.avgtemp_c)
    })
    setChartArr(arr)

    const { name, country, localtime } = obj.location;
    const { sunrise, sunset } = obj.forecast.forecastday[0].astro;
    const { daily_chance_of_rain } = obj.forecast.forecastday[0].day;
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
  };
  useEffect(() => {
    fetchData('kolkata');
  }, []);

  const handleButtonClick = () => {
    setIsActive(!isActive);
  };
  return (
    <>
      <div className="container-main" ref={outsideDocument}>
        {buttonClick ? <SearchBar/> : null}
        <section id={buttonClick ? `opacity` : null}>
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
                <h6>Upcoming Hours</h6>
                <button type="button">Next Day &gt;</button>
              </div>
              <div className="chart">
                <AreaChart chartarr={chartArr} />
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
