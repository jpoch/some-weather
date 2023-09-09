import { getRequest } from "../axiosHelper";
import _ from "underscore";

export const getLocationData = () => {
  if (!sessionStorage["weatherLocations"]) {
    //set default location
    defaultLocation();
  }

  return sessionStorage.getItem("weatherLocations");
};

export const addLocation = async (location) => {
  const currentLocations = JSON.parse(getLocationData());
  console.log(location);
  //make api call to points api
  let points = await getRequest(
    `https://api.weather.gov/points/${location.lat}%2C${location.lon}`
  );
  currentLocations.push({
    lon: location.lon,
    lat: location.lat,
    apiEndpoint: points.properties.forecastHourly,
    isDefault: false,
    city: points.properties.relativeLocation.properties.city,
    state: points.properties.relativeLocation.properties.state,
    timeZone: points.properties.timeZone,
  });

  sessionStorage.setItem("weatherLocations", JSON.stringify(currentLocations));
};

export const removeLocation = async (removeLocation) => {
  const currentLocations = JSON.parse(getLocationData());

  const toRemove = _.reject(currentLocations, (location) => {
    return (
      location.lon === removeLocation.lon && location.lat === removeLocation.lat
    );
  });

  sessionStorage.setItem("weatherLocations", JSON.stringify(toRemove));
};

const defaultLocation = () => {
  return sessionStorage.setItem(
    "weatherLocations",
    JSON.stringify([
      {
        lon: 39.74,
        lat: -104.99,
        apiEndpoint:
          "https://api.weather.gov/gridpoints/BOU/71,60/forecast/hourly",
        isDefault: true,
        city: "Glendale",
        state: "CO",
        timeZone: "America/Denver",
      },
    ])
  );
};
