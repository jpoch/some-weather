import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

const DayCardSummary = (props) => {
  return (
    // <Card className="day-card">
    <Stack
      className="day-card-summary-content"
      direction={"row"}
      justifyContent={"space-evenly"}
      useFlexGap
      flexWrap="wrap"
      spacing={2}
    >
      <Typography variant={"subtitle1"}>
        Low: <span className="value">{props.low}</span>
      </Typography>
      <Typography variant={"subtitle1"}>
        High: <span className="value">{props.high}</span>
      </Typography>
      <Typography variant={"subtitle1"}>
        Forecast: <span className="value">{props.forecast}</span>
      </Typography>
      <Typography variant={"subtitle1"}>
        Sunrise: <span className="value">{props.sunrise}</span>
      </Typography>
      <Typography variant={"subtitle1"}>
        Sunset: <span className="value">{props.sunset}</span>
      </Typography>
    </Stack>
    // </Card>
  );
};

export default DayCardSummary;
