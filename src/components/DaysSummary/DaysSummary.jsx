import { useEffect, useState } from "react";
import DayCard from "../DayCard/DayCard";
import Typography from "@mui/material/Typography";
import TemperatureChart from "../TemperatureChart/TemperatureChart";
import "./DaySummary.css";
import { DateTime } from "luxon";
import Stack from "@mui/material/Stack";
import DayCardSummary from "../DayCardSummary/DayCardSummary";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

const DaysSummary = (props) => {
  const [temperatureData, setTemperatureData] = useState();
  //   const [openPanels, setOpenPanels] = useState([]);

  useEffect(() => {
    if (props.temperatureData) {
      setTemperatureData(props.temperatureData);
    }
  }, [props.temperatureData]);

  //   let someArray = [];

  //   const accordionChange = (day) => (event, isExpanded) => {
  //     if (isExpanded) {
  //       // eslint-disable-next-line no-restricted-globals
  //       location.hash = "#accordion" + day;
  //     }
  //   };

  //   const isPanelOpen = (day) => {
  //     console.log(day);
  //     console.log(someArray);
  //     console.log(_.contains(someArray, day));
  //     return _.contains(someArray, day);
  //   };

  return (
    <div>
      {temperatureData &&
        temperatureData.daySummaries.map((day) => (
          <div key={day.day}>
            <Accordion className="accordion-container">
              <AccordionSummary>
                <Stack direction={"column"} sx={{ width: "100%" }}>
                  <Typography variant={"h6"}>{day.day}</Typography>

                  <div className="card-summary-small">
                    <DayCardSummary
                      date={day.day}
                      low={day.min}
                      high={day.max}
                      forecast={day.shortForecast}
                      sunrise={DateTime.fromJSDate(
                        day.sunInfo.sunrise
                      ).toLocaleString(DateTime.TIME_SIMPLE)}
                      sunset={DateTime.fromJSDate(
                        day.sunInfo.sunset
                      ).toLocaleString(DateTime.TIME_SIMPLE)}
                    ></DayCardSummary>
                  </div>

                  <Stack
                    justifyContent={"space-around"}
                    direction={"row"}
                    useFlexGap
                    flexWrap="wrap"
                    spacing={2}
                    className="card-summary-large"
                  >
                    <div>
                      <DayCard heading={day.min} overhead={"Low"}></DayCard>
                    </div>
                    <div>
                      <DayCard heading={day.max} overhead={"High"}></DayCard>
                    </div>
                    <div>
                      <DayCard
                        headingSmall={day.shortForecast}
                        overhead="Forecast"
                      ></DayCard>
                    </div>
                    <div>
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
                    </div>
                    <div>
                      <DayCard
                        overhead="Sunrise"
                        headingSmall={DateTime.fromJSDate(
                          day.sunInfo.sunrise
                        ).toLocaleString(DateTime.TIME_SIMPLE)}
                      ></DayCard>
                    </div>
                    <div>
                      <DayCard
                        overhead="Sunset"
                        headingSmall={DateTime.fromJSDate(
                          day.sunInfo.sunset
                        ).toLocaleString(DateTime.TIME_SIMPLE)}
                      ></DayCard>
                    </div>
                  </Stack>
                </Stack>
              </AccordionSummary>
              <AccordionDetails>
                {/* <DayCardSummary
              date={day.day}
              low={day.min}
              high={day.max}
              forecast={day.shortForecast}
              sunrise={DateTime.fromJSDate(sunInfo.sunrise).toLocaleString(
                DateTime.TIME_SIMPLE
              )}
              sunset={DateTime.fromJSDate(sunInfo.sunset).toLocaleString(
                DateTime.TIME_SIMPLE
              )}
            ></DayCardSummary> */}

                <TemperatureChart temperatureData={day}></TemperatureChart>
              </AccordionDetails>
            </Accordion>
          </div>
        ))}
    </div>
  );
};

export default DaysSummary;
