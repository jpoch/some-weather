import { DateTime } from "luxon";
import _ from "underscore";

export const temperatureHelper = (data) => {
  console.log(data);

  // create plot bands for nighttime
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
  // end

  // create day summaries
  let groupedByDay = _.groupBy(data, (times) => {
    return DateTime.fromISO(times.startTime).c.day;
  });

  let daySummaries = _.map(groupedByDay, (day) => {
    let dayTemps = _.map(day, (hour) => {
      return hour.temperature;
    });

    return {
      day: DateTime.fromISO(day[0].startTime).toLocaleString(),
      high: Math.max(...dayTemps),
      low: Math.min(...dayTemps),
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
    plotBands: nightPlotBands,
    daySummaries: daySummaries,
  };
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
