import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import UmbrellaIcon from "@mui/icons-material/Umbrella";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import CloudIcon from "@mui/icons-material/Cloud";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";

export const getIcon = (status) => {
  if (
    status.toLowerCase() === "sunny" ||
    status.toLowerCase().includes("clear")
  ) {
    return <WbSunnyIcon sx={{ color: "#fcdb32" }} />;
  }
  if (status.toLowerCase().includes("thunder")) {
    return <ThunderstormIcon sx={{ color: "#97abc2" }} />;
  }
  if (status.toLowerCase().includes("snow")) {
    return <AcUnitIcon />;
  }

  if (status.toLowerCase().includes("showers")) {
    return <UmbrellaIcon sx={{ color: "#54a3be" }} />;
  }

  if (status.toLowerCase().includes("cloudy")) {
    return <CloudIcon />;
  }

  return <QuestionMarkIcon />;
};
