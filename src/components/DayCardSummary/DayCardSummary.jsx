import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

const DayCardSummary = (props) => {
  return (
    // <Card className="day-card">
    <Stack
      className="day-card-content"
      direction={"row"}
      justifyContent={"space-evenly"}
      useFlexGap
      flexWrap="wrap"
      spacing={2}
    >
      <Typography variant={"subtitle1"}>Low: {props.low}</Typography>
      <Typography variant={"subtitle1"}>High: {props.high}</Typography>
      <Typography variant={"subtitle1"}>Forecast: {props.forecast}</Typography>
      <Typography variant={"subtitle1"}>Sunrise: {props.sunrise}</Typography>
      <Typography variant={"subtitle1"}>Sunset: {props.sunset}</Typography>
    </Stack>
    // </Card>
  );
};

export default DayCardSummary;
