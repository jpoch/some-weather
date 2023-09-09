import { getRequest } from "../axiosHelper";
import _ from "underscore";

export const getLocationData = () => {
  if (
    !sessionStorage["weatherLocations"] ||
    JSON.parse(sessionStorage.getItem("weatherLocations")).length === 0
  ) {
    console.log("get here");
    //set default location
    defaultLocation();
  }

  return sessionStorage.getItem("weatherLocations");
};

export const addLocation = async (location) => {
  const currentLocations = JSON.parse(getLocationData());
  //make api call to points api
  let points = await getRequest(
    `https://api.weather.gov/points/${location.lat}%2C${location.lon}`
  );

  let newLocation = {
    lon: location.lon,
    lat: location.lat,
    apiEndpoint: points.properties.forecastHourly,
    isDefault: false,
    city: points.properties.relativeLocation.properties.city,
    state: points.properties.relativeLocation.properties.state,
    timeZone: points.properties.timeZone,
  };
  currentLocations.push(newLocation);

  sessionStorage.setItem("weatherLocations", JSON.stringify(currentLocations));
  return newLocation;
};

export const removeLocation = async (removeLocation) => {
  const currentLocations = JSON.parse(getLocationData());

  const toRemove = _.reject(currentLocations, (location) => {
    return (
      location.lon === removeLocation.lon && location.lat === removeLocation.lat
    );
  });

  if (toRemove.lenth === 0) {
    sessionStorage.removeItem("weatherLocations");
  } else {
    sessionStorage.setItem("weatherLocations", JSON.stringify(toRemove));
  }
};

export const updateDefaultLocation = async (locationToUpdate) => {
  const currentLocations = JSON.parse(getLocationData());
  let toUpdate;

  let newDefaultLocation = _.find(currentLocations, (location) => {
    return (
      location.lon === locationToUpdate.lon &&
      location.lat === locationToUpdate.lat
    );
  });
  newDefaultLocation.isDefault = true;

  toUpdate = _.reject(currentLocations, (location) => {
    return (
      location.lon === newDefaultLocation.lon &&
      location.lat === newDefaultLocation.lat
    );
  });

  let currentDefaultLocation = _.find(toUpdate, (location) => {
    return location.isDefault === true;
  });

  if (currentDefaultLocation) {
    currentDefaultLocation.isDefault = false;
    toUpdate = _.reject(toUpdate, (location) => {
      return (
        location.lon === currentDefaultLocation.lon &&
        location.lat === currentDefaultLocation.lat
      );
    });
    toUpdate.push(newDefaultLocation);
    toUpdate.push(currentDefaultLocation);
  } else {
    toUpdate.push(newDefaultLocation);
  }
  sessionStorage.setItem("weatherLocations", JSON.stringify(toUpdate));

  return toUpdate;
};

const defaultLocation = () => {
  return sessionStorage.setItem(
    "weatherLocations",
    JSON.stringify([
      {
        lat: 39.74,
        lon: -104.99,
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
