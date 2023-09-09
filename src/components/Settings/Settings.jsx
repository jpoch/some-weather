import Drawer from "@mui/material/Drawer";
import { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { addLocation, removeLocation } from "../../helpers/localStorageHelper";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import _ from "underscore";
import IconButton from "@mui/material/IconButton";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import SettingsIcon from "@mui/icons-material/Settings";

const Settings = (props) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  //   const [defaultLocation, setDefaultLocation] = useState({});
  //   const [allLocations, setAllLocations] = useState([]);
  const [newLocationValue, setNewLocationValue] = useState({});

  useEffect(() => {
    console.log(props.allLocations);
  }, [props.allLocations]);

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
      <AppBar position="fixed" color="primary" sx={{ top: "auto", bottom: 0 }}>
        <Toolbar>
          <IconButton
            sx={{ position: "fixed", right: "16px" }}
            onClick={() => {
              setIsSettingsOpen(true);
            }}
          >
            <SettingsIcon />{" "}
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
            <FormControl>
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
            </FormControl>
            <Typography variant={"body1"}>
              Current Location: {props.defaultLocation.city}{" "}
              {props.defaultLocation.state}
            </Typography>
            <Typography variant={"body1"}>Saved Locations:</Typography>
            {props.allLocations.map((location) => (
              <Stack direction={"row"} alignItems={"center"}>
                <Typography variant={"subtitle"}>
                  {location.city} {location.state}
                </Typography>
                <IconButton>
                  <RemoveCircleOutlineIcon
                    onClick={() => {
                      removeLocation(location);
                    }}
                  />
                </IconButton>
                <Button>
                  <Typography
                    variant={"subtitle"}
                    onClick={() => {
                      props.fetchData(location);
                      setIsSettingsOpen(false);
                    }}
                  >
                    Use
                  </Typography>
                </Button>
              </Stack>
            ))}
            <div>
              <Typography variant={"body1"}>Add Locations:</Typography>
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
                onClick={() => {
                  addLocation(newLocationValue);
                }}
              >
                <AddCircleOutlineIcon />
              </IconButton>
            </div>

            <div>
              <Button>Cancel</Button>
              <Button>Save</Button>
            </div>
          </Stack>
        </Box>
      </Drawer>
    </>
  );
};

export default Settings;
