import Drawer from "@mui/material/Drawer";
import { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "./Settings.css";
import {
  addLocation,
  removeLocation,
  updateDefaultLocation,
} from "../../helpers/localStorageHelper";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import IconButton from "@mui/material/IconButton";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import SettingsIcon from "@mui/icons-material/Settings";
import HomeIcon from "@mui/icons-material/Home";
import AddHomeIcon from "@mui/icons-material/AddHome";

const Settings = (props) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  //   const [defaultLocation, setDefaultLocation] = useState({});
  //   const [allLocations, setAllLocations] = useState([]);
  const [newLocationValue, setNewLocationValue] = useState({});

  const setNewLocation = (value, type) => {
    if (type === "lat") {
      setNewLocationValue({
        lat: value,
        lon: newLocationValue.lon ? newLocationValue.lon : 0,
      });
    } else {
      setNewLocationValue({
        lon: value,
        lat: newLocationValue.lat ? newLocationValue.lat : 0,
      });
    }
  };

  return (
    <>
      <AppBar position="fixed" className="appbar-container">
        <Toolbar>
          <Typography className="current-weather-text" variant={"body1"}>
            {props.currentLocation.city}
            {", "}
            {props.currentLocation.state}
            {" - "}
            {props.currentWeather.temp}
            {"°F and "}
            {props.currentWeather.shortForecast}
            {" - "}
            {props.currentWeather.precipitation}
            {"% precipitation, "}
            {props.currentWeather.humidity}
            {"% humidity, and "}
            {props.currentWeather.dewpoint}
            {"°F dewpoint "}
          </Typography>

          <IconButton
            sx={{ position: "fixed", right: "16px" }}
            onClick={() => {
              props.updateLocationsList();
              setIsSettingsOpen(true);
            }}
          >
            <SettingsIcon sx={{ color: "#fafafa" }} />{" "}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        className="settings-drawer"
        anchor={"bottom"}
        open={isSettingsOpen}
      >
        <Box className="settings-drawer-container">
          <Stack direction={"column"}>
            <Typography variant={"h6"}>Settings</Typography>
            {/* <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">
                <Typography variant={"body1"}>Temperature Unit:</Typography>
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="F"
                name="radio-buttons-group"
                row
              >
                <FormControlLabel value="f" control={<Radio />} label="F" />
                <FormControlLabel value="c" control={<Radio />} label="C" />
              </RadioGroup>
            </FormControl> */}
            <Typography variant={"body1"}>
              Current Location: {props.currentLocation.city}
              {", "}
              {props.currentLocation.state}
            </Typography>
            <div>
              <Typography variant={"body1"}>New Location:</Typography>
              <TextField
                label="Latitude"
                type={"number"}
                onChange={(event) => {
                  setNewLocation(event.target.value, "lat");
                }}
              ></TextField>
              <TextField
                label="Longitude"
                type={"number"}
                onChange={(event) => {
                  setNewLocation(event.target.value, "lon");
                }}
              ></TextField>
              <IconButton
                onClick={async () => {
                  let newLocationObj = await addLocation(newLocationValue);
                  props.fetchData(newLocationObj);
                  setIsSettingsOpen(false);
                }}
              >
                <AddCircleOutlineIcon />
              </IconButton>
            </div>
            <Typography variant={"body1"}>Saved Locations:</Typography>
            {props.allLocations.map((location) => (
              <Stack
                direction={"row"}
                alignItems={"center"}
                key={location.lon + location.lat}
              >
                <IconButton
                  onClick={async () => {
                    await removeLocation(location);
                    props.updateLocationsList();
                  }}
                >
                  <HighlightOffIcon sx={{ color: "red" }} />
                </IconButton>

                <Typography variant={"subtitle"}>
                  {location.city}, {location.state}
                </Typography>
                <Button
                  onClick={() => {
                    props.fetchData(location);
                    setIsSettingsOpen(false);
                  }}
                >
                  <Typography variant={"subtitle"}>Use</Typography>
                </Button>
                {location.isDefault ? (
                  <HomeIcon />
                ) : (
                  <IconButton
                    onClick={async () => {
                      await updateDefaultLocation(location);
                      props.updateLocationsList();
                    }}
                  >
                    <AddHomeIcon />
                  </IconButton>
                )}
              </Stack>
            ))}

            <div>
              <Button
                onClick={() => {
                  setIsSettingsOpen(false);
                }}
              >
                Close
              </Button>
            </div>
          </Stack>
        </Box>
      </Drawer>
    </>
  );
};

export default Settings;
