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
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { getLocationData, addLocation } from './helpers/localStorageHelper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import _ from "underscore";
// import { mockWeatherApiResponse } from './mocks/weatherApiData';
import Settings from './components/Settings/Settings';


function App() {
  const [locationWeather, setLocationWeather] = useState();
  const [weeklyWeatherData, setWeeklyWeatherData] = useState();
  const [daySummaries, setDaySummaries] = useState();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [defaultLocation, setDefaultLocation] = useState({});
  const [allLocations, setAllLocations] = useState([]);
  const [currentLocation, setCurrentLocation] = useState({});
  // const [newLocationValue, setNewLocationValue] = useState({});
  // const [settings, setSettingsOpen] = useState();

  let count = 0;
  useEffect(
    () => {
      if (count === 0) {
        const allLocationSettings = JSON.parse(getLocationData());
        const defaultLocation = _.find(allLocationSettings, (location) => {
          return location.isDefault = true;
        })
        setAllLocations(_.sortBy(allLocationSettings, 'state'));
        setDefaultLocation(defaultLocation)
        fetchData(defaultLocation);
        count++;
      }

    },
    [count],
  );


  const fetchData = async (location) => {
    let data = await getRequest(location.apiEndpoint);

    // let data = await getRequest('https://api.weather.gov/gridpoints/BOU/63,61/');
    // let data = {
    //   properties: {
    //     periods: mockWeatherApiResponse()
    //   }
    // };
    let temperatureData = temperatureHelper(data.properties.periods)
    let weeklyData = getWeeklyData(data.properties.periods);
    setDaySummaries(temperatureData.daySummaries)
    setWeeklyWeatherData(weeklyData)
    setLocationWeather(temperatureData);

  }

  // const setNewLocation = (value, type) => {

  //   if (type === 'lat') {
  //     setNewLocationValue({
  //       lat: value,
  //       lon: newLocationValue.lon ? newLocationValue.lon : 0
  //     })
  //   } else {
  //     setNewLocationValue({
  //       lon: value,
  //       lat: newLocationValue.lat ? newLocationValue.lat : 0
  //     })
  //   }

  // }

  return (
    <div className="App">
      {/* <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
        <Toolbar>
          <div>abc</div>
          <div>bcd</div>
          <div>lnz</div>
          <IconButton sx={{ position: 'fixed', right: '16px' }} onClick={() => {
            setIsSettingsOpen(true)
          }}><SettingsIcon /> </IconButton>
        </Toolbar>
      </AppBar> */}
      <Stack direction={'column'} spacing={4}>
        <WeeklySummary weeklyData={daySummaries} />
        <TemperatureChart temperatureData={weeklyWeatherData} />
        <DaysSummary temperatureData={locationWeather} />
      </Stack>

      <Settings fetchData={fetchData} allLocations={allLocations} defaultLocation={defaultLocation} />

      {/* <Drawer
        className='settings-drawer'
        anchor={'bottom'}
        open={isSettingsOpen}
      >
        <Box className='settings-drawer-container'>
          <Stack direction={'column'}>
            <Typography variant={'h6'}>Settings</Typography>
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label"><Typography variant={'body1'}>Temperature Unit:</Typography></FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="F"
                name="radio-buttons-group"
                row
              >
                <FormControlLabel value="f" control={<Radio />} label="F" />
                <FormControlLabel value="c" control={<Radio />} label="C" />
              </RadioGroup>
            </FormControl>
            <Typography variant={'body1'}>Current Location: {defaultLocation.city} {defaultLocation.state}</Typography>
            <Typography variant={'body1'}>Saved Locations:</Typography>
            {
              allLocations.map((location) => (
                <Stack direction={'row'} alignItems={'center'}>
                  <Typography variant={'subtitle'}>{location.city} {location.state}</Typography>
                  <IconButton><RemoveCircleOutlineIcon /></IconButton>
                  <Button><Typography variant={'subtitle'} onClick={() => {
                    fetchData(location)
                    setIsSettingsOpen(false)
                  }}>Use</Typography></Button>
                </Stack>
              ))}
            <div>
              <Typography variant={'body1'}>Add Locations:</Typography>
              <TextField label="Latitude" type={'number'} onChange={(event) => {
                setNewLocation(event.target.value, 'lat');
              }}></TextField>
              <TextField label="Longitude" type={'number'} onChange={(event) => {
                setNewLocation(event.target.value, 'lon');
              }}></TextField>
              <IconButton onClick={() => {
                addLocation(newLocationValue)
              }}><AddCircleOutlineIcon /></IconButton>
            </div>

            <div><Button>Cancel</Button><Button>Save</Button></div>
          </Stack>


        </Box>

      </Drawer> */}
    </div >
  );
}

export default App;
