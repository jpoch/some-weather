import './App.css';
import { getRequest } from '../src/axiosHelper'
import TemperatureChart from './components/TemperatureChart/TemperatureChart';
import { useEffect, useState } from 'react';
import { temperatureHelper, getWeeklyData } from './helpers/temperatureHelper';
import DaysSummary from './components/DaysSummary/DaysSummary';
import Stack from "@mui/material/Stack";
import WeeklySummary from './components/WeeklySummary/WeeklySummary';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import SettingsIcon from '@mui/icons-material/Settings';
import IconButton from '@mui/material/IconButton';
// import { mockWeatherApiResponse } from './mocks/weatherApiData';


function App() {
  const [locationWeather, setLocationWeather] = useState();
  const [weeklyWeatherData, setWeeklyWeatherData] = useState();
  const [daySummaries, setDaySummaries] = useState();

  let count = 0;
  // let sunInfo = getTimes(new Date(), 39.74, -104.99);
  useEffect(
    () => {
      async function fetchData() {
        let data = await getRequest('https://api.weather.gov/gridpoints/BOU/71,60/forecast/hourly');
        // let data = await getRequest('https://api.weather.gov/gridpoints/BOU/63,61/');
        // let data = {
        //   properties: {
        //     periods: mockWeatherApiResponse()
        //   }
        // };
        let temperatureData = temperatureHelper(data.properties.periods)
        let weeklyData = getWeeklyData(data.properties.periods);
        console.log(temperatureData.daySummaries)
        setDaySummaries(temperatureData.daySummaries)
        setWeeklyWeatherData(weeklyData)
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
      <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
        <Toolbar>
          <div>abc</div>
          <div>bcd</div>
          <div>lnz</div>
          <IconButton sx={{ position: 'fixed', right: '16px' }}><SettingsIcon /> </IconButton>
        </Toolbar>
      </AppBar>
      <Stack direction={'column'} spacing={4}>
        <WeeklySummary weeklyData={daySummaries} />
        <TemperatureChart temperatureData={weeklyWeatherData} />
        <DaysSummary temperatureData={locationWeather} />
      </Stack>


    </div>
  );
}

export default App;
