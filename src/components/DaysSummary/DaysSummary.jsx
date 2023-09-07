import Grid from "@mui/material/Unstable_Grid2";
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
import { useEffect, useState } from "react";
import DayCard from "../DayCard/DayCard";
import Typography from "@mui/material/Typography";
import TemperatureChart from "../TemperatureChart/TemperatureChart";
import "./DaySummary.css";
import { DateTime } from "luxon";

const DaysSummary = (props) => {
  const [temperatureData, setTemperatureData] = useState();
  const [sunInfo, setSunInfo] = useState();

  useEffect(() => {
    if (props.temperatureData) {
      setTemperatureData(props.temperatureData);
    }
  }, [props.temperatureData]);

  useEffect(() => {
    if (props.sunInfo) {
      setSunInfo(props.sunInfo);
    }
  }, [props.sunInfo]);

  //   useEffect(() => {
  //     console.log(temperatureData);
  //   }, [temperatureData]);

  return (
    <Grid container spacing={2}>
      {temperatureData &&
        temperatureData.daySummaries.map((day) => (
          <Grid className="card-container" container>
            <Grid xs={12}>
              <Typography variant={"h6"}>{day.day}</Typography>
            </Grid>
            <Grid xs={12} sm={6} md={1}>
              <DayCard heading={day.min} overhead={"Low"}></DayCard>
            </Grid>
            <Grid xs={12} sm={6} md={1}>
              <DayCard heading={day.max} overhead={"High"}></DayCard>
            </Grid>
            <Grid xs={12} sm={6} md={3}>
              <DayCard
                headingSmall={day.shortForecast}
                overhead="Forecast"
              ></DayCard>
            </Grid>
            <Grid xs={12} sm={6} md={2}>
              {day.precipitation !== 0 ? (
                <DayCard
                  heading={`${day.precipitation}%`}
                  subtitle={`@ ${day.precipitationTime}`}
                  overhead={"Precipitation"}
                ></DayCard>
              ) : (
                <DayCard
                  overhead={"Precipitation"}
                  heading={"0%"}
                  subtitle={"All day"}
                ></DayCard>
              )}
            </Grid>
            <Grid xs={12} sm={6} md={2}>
              <DayCard
                overhead="Sunrise"
                headingSmall={DateTime.fromJSDate(
                  sunInfo.sunrise
                ).toLocaleString(DateTime.TIME_SIMPLE)}
              ></DayCard>
            </Grid>
            <Grid xs={12} sm={6} md={2}>
              <DayCard
                overhead="Sunset"
                headingSmall={DateTime.fromJSDate(
                  sunInfo.sunset
                ).toLocaleString(DateTime.TIME_SIMPLE)}
              ></DayCard>
            </Grid>
            <TemperatureChart temperatureData={day}></TemperatureChart>
          </Grid>
        ))}
    </Grid>
  );
};

export default DaysSummary;
