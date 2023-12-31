import './App.css';
import { getRequest } from '../src/axiosHelper'
import TemperatureChart from './components/TemperatureChart/TemperatureChart';
import { useEffect, useState } from 'react';
import { temperatureHelper, getWeeklyData } from './helpers/temperatureHelper';
import DaysSummary from './components/DaysSummary/DaysSummary';
import Stack from "@mui/material/Stack";
import WeeklySummary from './components/WeeklySummary/WeeklySummary';
import { getLocationData } from './helpers/localStorageHelper';
import _ from "underscore";
// import { mockWeatherApiResponse } from './mocks/weatherApiData';
import Settings from './components/Settings/Settings';


function App() {
  const [locationWeather, setLocationWeather] = useState();
  const [weeklyWeatherData, setWeeklyWeatherData] = useState();
  const [daySummaries, setDaySummaries] = useState();
  const [allLocations, setAllLocations] = useState([]);
  const [currentLocation, setCurrentLocation] = useState({});
  const [currentWeather, setCurrentWeather] = useState({});

  let count = 0;
  useEffect(
    () => {
      if (count === 0) {
        const allLocationSettings = JSON.parse(getLocationData());
        let defaultLocation = _.find(allLocationSettings, (location) => {
          return location.isDefault === true;
        })
        if (!defaultLocation) {
          defaultLocation = allLocationSettings[0];
        }
        setAllLocations(_.sortBy(allLocationSettings, 'state'));
        setCurrentLocation(defaultLocation)
        fetchData(defaultLocation);
        count++;
      }

    },
    [count],
  );

  const tempToF = (tempC) => {
    return Math.round(tempC * 1.8 + 32);
  };


  const fetchData = async (location) => {
    setCurrentLocation(location)
    let data = await getRequest(location.apiEndpoint);
    // let data = {
    //   properties: {
    //     periods: mockWeatherApiResponse()
    //   }
    // };
    let temperatureData = temperatureHelper(data.properties.periods, location)
    let weeklyData = getWeeklyData(data.properties.periods);
    setDaySummaries(temperatureData.daySummaries)
    setWeeklyWeatherData(weeklyData)
    setLocationWeather(temperatureData);
    setCurrentWeather({
      temp: data.properties.periods[0].temperature,
      shortForecast: data.properties.periods[0].shortForecast,
      precipitation: data.properties.periods[0].probabilityOfPrecipitation.value,
      humidity: data.properties.periods[0].relativeHumidity.value,
      dewpoint: tempToF(data.properties.periods[0].dewpoint.value),
    })

  }

  const updateLocationsList = () => {
    const allLocationSettings = JSON.parse(getLocationData());
    setAllLocations(_.sortBy(allLocationSettings, 'state'));
  }

  return (
    <div className="App">
      <Stack direction={'column'} spacing={4}>
        <WeeklySummary weeklyData={daySummaries} />
        <div className='temperature-chart-container'>
          <TemperatureChart temperatureData={weeklyWeatherData} />
        </div>
        <DaysSummary temperatureData={locationWeather} />
      </Stack>

      <Settings fetchData={fetchData} updateLocationsList={updateLocationsList} allLocations={allLocations} currentLocation={currentLocation} currentWeather={currentWeather} />
    </div >
  );
}

export default App;
