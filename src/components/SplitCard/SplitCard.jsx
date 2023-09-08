import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
// import "./DayCard.css";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import { colorHelper } from "../../helpers/temperatureHelper";

const getColor = (text) => {
  if (typeof text === "number") {
    return colorHelper(text);
  } else {
    return "inherit";
  }
};

const SplitCard = (props) => {
  return (
    <Card className="split-card">
      <Typography variant={"h6"}>{props.title}</Typography>
      <Stack direction={"row"} alignItems={"center"} spacing={2}>
        <Stack
          className="split-card-content"
          direction={"column"}
          justifyContent={"center"}
        >
          <Typography variant={"h4"} sx={{ color: getColor(props.topHeading) }}>
            {props.topHeading}
          </Typography>
          <Typography variant={"subtitle1"}>{props.topSubheading}</Typography>
          <Divider orientation="horizontal" variant="middle" flexItem />
          <Typography
            variant={"h5"}
            sx={{ color: getColor(props.bottomHeading) }}
          >
            {props.bottomHeading}
          </Typography>
          <Typography variant={"subtitle1"}>
            {props.bottomSubheading}
          </Typography>
        </Stack>
        <Stack>
          <div>{props.icon}</div>
          {props.iconInfo ? <div>{props.iconInfo}%</div> : <></>}
        </Stack>
      </Stack>
    </Card>
  );
};

export default SplitCard;
