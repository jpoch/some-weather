import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import "./DayCard.css";
import Stack from "@mui/material/Stack";

const DayCard = (props) => {
  return (
    <Card className="day-card">
      {/* <CardContent> */}
      <Stack
        className="day-card-content"
        direction={"column"}
        justifyContent={"center"}
      >
        <Typography variant={"subtitle1"}>{props.overhead}</Typography>
        <Typography variant={"h4"} style={{ color: props.headingColor }}>
          {props.heading}
        </Typography>
        <Typography variant={"h5"}>{props.headingSmall}</Typography>
        <Typography variant={"subtitle1"}>{props.subtitle}</Typography>
      </Stack>
      {/* </CardContent> */}
    </Card>
  );
};

export default DayCard;
