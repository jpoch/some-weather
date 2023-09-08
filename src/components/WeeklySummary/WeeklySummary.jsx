// import Typography from "@mui/material/Typography";
import "./WeeklySummary.css";
import Stack from "@mui/material/Stack";
// import Divider from "@mui/material/Divider";
import SplitCard from "../SplitCard/SplitCard";
import { DateTime } from "luxon";
import { getIcon } from "../../helpers/iconHelper";

const WeeklySummary = (props) => {
  const getIconInfo = (status, precipitation) => {
    if (
      status.toLowerCase().includes("thunder") ||
      status.toLowerCase().includes("snow") ||
      status.toLowerCase().includes("showers")
    ) {
      return precipitation;
    }
  };

  return (
    <Stack
      className="weekly-summary-container"
      direction={"row"}
      flexWrap={"wrap"}
      spacing={2}
      justifyContent={{ xs: "space-evenly", sm: "space-around" }}
    >
      {props.weeklyData &&
        props.weeklyData.map((day) => (
          <SplitCard
            title={DateTime.fromISO(day.dayMS).toFormat("L/d")}
            topHeading={day.max}
            bottomHeading={day.min}
            icon={getIcon(day.shortForecast)}
            iconInfo={getIconInfo(day.shortForecast, day.precipitation)}
          />
        ))}
    </Stack>
  );
};

export default WeeklySummary;
