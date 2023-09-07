import { DateTime } from "luxon";
import _ from "underscore";
import { getTimes } from "suncalc";

export const temperatureHelper = (data) => {
  console.log(data);

  // create plot bands for nighttime
  let weeklyNightPlotBands = plotBandHelper(data);

  // create day summaries
  let groupedByDay = _.groupBy(data, (times) => {
    return DateTime.fromISO(times.startTime).c.day;
  });

  let daySummaries = _.map(groupedByDay, (day) => {
    let sunInfo = getTimes(new Date(day[0].startTime), 39.74, -104.99);

    let dayTemps = _.map(day, (hour) => {
      return hour.temperature;
    });

    let dailyChartData = day.map((hour) => {
      return {
        x: Date.parse(hour.startTime),
        y: hour.temperature,
        color: colorHelper(hour.temperature),
      };
    });

    let dailyChartDewPointData = day.map((hour) => {
      return {
        x: Date.parse(hour.startTime) + 1,
        y: Math.round(tempToF(hour.dewpoint.value)),
        color: "blue",
      };
    });

    let dailyChartHumidityData = day.map((hour) => {
      return {
        x: Date.parse(hour.startTime) + 2,
        y: Math.round(hour.relativeHumidity.value),
        color: "green",
      };
    });

    let dailyChartPrecipitationData = day.map((hour) => {
      return {
        x: Date.parse(hour.startTime) + 3,
        y: Math.round(hour.probabilityOfPrecipitation.value),
        color: "white",
      };
    });

    let dayPrecipitation = _.map(day, (hour) => {
      return {
        value: hour.probabilityOfPrecipitation.value,
        time: hour.startTime,
      };
    });

    // console.log(dayPrecipitation);

    let maxPrecipitation = _.max(dayPrecipitation, (hour) => {
      return hour.value;
    });

    //create short forecast most often
    let shortForecasts = _.map(day, (hour) => {
      return hour.shortForecast;
    });

    let shortForecastsCount = _.countBy(shortForecasts, (forecasts) => {
      return forecasts;
    });

    let shortForecastSummary = _.map(shortForecastsCount, (value, key) => {
      return {
        value: value,
        forecast: key,
      };
    });

    let shortForecastMost = _.sortBy(shortForecastSummary, (value) => {
      return value.value;
    });
    //end

    let dailyNightPlotBands = plotBandHelper(day);
    return {
      day: DateTime.fromISO(day[0].startTime).toFormat("cccc, LLLL d"),
      dayMS: day[0].startTime,
      max: Math.max(...dayTemps),
      min: Math.min(...dayTemps),
      precipitation: maxPrecipitation.value,
      precipitationTime: DateTime.fromISO(maxPrecipitation.time).toLocaleString(
        DateTime.TIME_SIMPLE
      ),
      data: dailyChartData,
      dewPointData: dailyChartDewPointData,
      humidityData: dailyChartHumidityData,
      precipitationData: dailyChartPrecipitationData,
      plotBands: dailyNightPlotBands,
      shortForecast: shortForecastMost[shortForecastMost.length - 1].forecast,
      sunInfo: sunInfo,
    };
  });

  console.log(daySummaries);
  // end

  //create plot bands with alternating days

  //   let plotBands = [];
  //   let isEven = false;
  //   _.each(groupedByDay, (day) => {
  //     if (isEven) {
  //       //get first and last times
  //       plotBands.push({
  //         from: _.first(day),
  //         to: _.last(day),
  //         color: "#efefef",
  //       });

  //       isEven = false;
  //     } else {
  //       isEven = true;
  //     }
  //   });
  //end

  //create max and min temps for chart
  let temps = data.map((some) => {
    return some.temperature;
  });

  let min = Math.min(...temps);
  let max = Math.max(...temps);
  //end

  let chartData = data.map((hour) => {
    return {
      x: Date.parse(hour.startTime),
      y: hour.temperature,
      color: colorHelper(hour.temperature),
      //   dataLabels: {

      //   }
    };
  });

  return {
    data: chartData,
    min: min,
    max: max,
    plotBands: weeklyNightPlotBands,
    daySummaries: daySummaries,
  };
};

const tempToF = (tempC) => {
  return tempC * 1.8 + 32;
};

const tempToC = (tempF) => {
  return (tempF - 32) / 1.8;
};

const colorHelper = (temp) => {
  if (temp < 0) {
    return "#0D40C1";
  } else if (temp >= 0 && temp < 20) {
    return "#2F68D2";
  } else if (temp >= 20 && temp < 32) {
    return "407CDA";
  } else if (temp >= 32 && temp < 45) {
    return "#62A3EA";
  } else if (temp >= 45 && temp < 55) {
    return "#84CBFB";
  } else if (temp >= 55 && temp < 65) {
    return "#98BDCF";
  } else if (temp >= 65 && temp < 75) {
    return "#F59137";
  } else if (temp >= 75 && temp < 85) {
    return "#FA5A2D";
  } else if (temp >= 85 && temp < 95) {
    return "#BF2A0C";
  } else if (temp >= 95) {
    return "#B60000";
  }
};

const plotBandHelper = (data) => {
  let nightPlotBands = [];
  let isFirst = true;
  let isDaytime;
  let timeBlock = { color: "#efefef" };
  _.each(data, (time) => {
    if (isFirst) {
      isDaytime = time.isDaytime;
      if (!isDaytime) {
        timeBlock.from = DateTime.fromISO(time.startTime);
      }
      isFirst = false;
    } else {
      if (!timeBlock.from) {
        //look for from time, should be daytime
        if (!time.isDaytime) {
          timeBlock.from = DateTime.fromISO(time.startTime);
          isDaytime = false;
        }
        if (!isDaytime) {
          //find next daytime
          if (time.isDaytime) {
            timeBlock.to = DateTime.fromISO(time.startTime);
            nightPlotBands.push(timeBlock);
            timeBlock = { color: "#efefef" };
            isDaytime = true;
          }
        }
      } else {
        //look for an end time
        if (time.isDaytime) {
          timeBlock.to = DateTime.fromISO(time.startTime);
          nightPlotBands.push(timeBlock);
          timeBlock = { color: "#efefef" };
          isDaytime = true;
        }
      }
    }
  });

  //if not found, use the last time slot from the data
  if (!timeBlock.to) {
    timeBlock.to = DateTime.fromISO(data[data.length - 1].endTime);
    nightPlotBands.push(timeBlock);
    timeBlock = { color: "#efefef" };
    isDaytime = true;
  }

  return nightPlotBands;
};
