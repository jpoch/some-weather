import './App.css';
import { getRequest } from '../src/axiosHelper'
import TemperatureChart from './components/TemperatureChart/TemperatureChart';
import { useEffect, useState } from 'react';
import { temperatureHelper } from './helpers/temperatureHelper';


function App() {
  const [locationWeather, setLocationWeather] = useState();

  let count = 0;

  useEffect(
    () => {
      async function fetchData() {
        let data = await getRequest('https://api.weather.gov/gridpoints/BOU/63,61/forecast/hourly');
        // console.log(data);
        let temperatureData = temperatureHelper(data.properties.periods)
        // console.log(temperatureData)
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
      <TemperatureChart temperatureData={locationWeather} />
    </div>
  );
}

export default App;
