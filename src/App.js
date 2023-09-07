import './App.css';
import { getRequest } from '../src/axiosHelper'
import TemperatureChart from './components/TemperatureChart/TemperatureChart';
import { useEffect, useState } from 'react';
import { temperatureHelper } from './helpers/temperatureHelper';
import DaysSummary from './components/DaysSummary/DaysSummary';
import Stack from "@mui/material/Stack";
// import { getTimes } from 'suncalc';


function App() {
  const [locationWeather, setLocationWeather] = useState();

  let count = 0;
  // let sunInfo = getTimes(new Date(), 39.74, -104.99);
  useEffect(
    () => {
      async function fetchData() {
        let data = await getRequest('https://api.weather.gov/gridpoints/BOU/71,60/forecast/hourly');
        // let data = await getRequest('https://api.weather.gov/gridpoints/BOU/63,61/');
        let temperatureData = temperatureHelper(data.properties.periods)
        setLocationWeather(temperatureData);
      }

      if (count === 0) {
        fetchData();
        count++;
      }

    },
    [count],
  );

  return (
    <div className="App">
      <Stack direction={'column'} spacing={4}>
        <DaysSummary temperatureData={locationWeather} />
        <TemperatureChart temperatureData={locationWeather} />
      </Stack>


    </div>
  );
}

export default App;
