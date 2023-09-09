import { DateTime } from "luxon";
import _ from "underscore";
import { getTimes } from "suncalc";

export const getWeeklyData = (data) => {
  // create plot bands for nighttime
  let weeklyNightPlotBands = plotBandHelper(data);

  //create max and min temps for chart
  let temps = data.map((some) => {
    return some.temperature;
  });

  let min = Math.min(...temps);
  let max = Math.max(...temps);
  //end

  let weeklyTemperatureChartData = data.map((hour) => {
    return {
      x: Date.parse(hour.startTime),
      y: hour.temperature,
      color: colorHelper(hour.temperature),
    };
  });

  let weeklyChartDewPointData = createSecondaryChartData(
    data,
    "dewpoint",
    "blue"
  );

  let weeklyChartHumidityData = createSecondaryChartData(
    data,
    "relativeHumidity",
    "green"
  );

  let weeklyChartPrecipitationData = createSecondaryChartData(
    data,
    "probabilityOfPrecipitation",
    "white"
  );

  return {
    temperatureData: weeklyTemperatureChartData,
    dewPointData: weeklyChartDewPointData,
    humidityData: weeklyChartHumidityData,
    precipitationData: weeklyChartPrecipitationData,
    min: min,
    max: max,
    plotBands: weeklyNightPlotBands,
    // title: `${data[0].startTime} - ${
    //   data[data.length - 1].startTime
    // }`,
  };
};

export const temperatureHelper = (data, locationInfo) => {
  // create day summaries
  let groupedByDay = _.groupBy(data, (times) => {
    return DateTime.fromISO(times.startTime).c.day;
  });

  let daySummaries = _.map(groupedByDay, (day) => {
    //sunrise & sunset
    let sunInfo = getTimes(
      new Date(day[0].startTime),
      locationInfo.lat,
      locationInfo.lon
    );

    //for max & min temps
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

    let dailyChartDewPointData = createSecondaryChartData(
      day,
      "dewpoint",
      "blue"
    );

    let dailyChartHumidityData = createSecondaryChartData(
      day,
      "relativeHumidity",
      "green"
    );

    let dailyChartPrecipitationData = createSecondaryChartData(
      day,
      "probabilityOfPrecipitation",
      "white"
    );

    //create max precipitation
    let dayPrecipitation = _.map(day, (hour) => {
      return {
        value: hour.probabilityOfPrecipitation.value,
        time: hour.startTime,
      };
    });

    let maxPrecipitation = _.max(dayPrecipitation, (hour) => {
      return hour.value;
    });
    //end

    //create short forecast of most often on the day
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
      temperatureData: dailyChartData,
      dewPointData: dailyChartDewPointData,
      humidityData: dailyChartHumidityData,
      precipitationData: dailyChartPrecipitationData,
      plotBands: dailyNightPlotBands,
      shortForecast: shortForecastMost[shortForecastMost.length - 1].forecast,
      sunInfo: sunInfo,
    };
  });
  // end daySummaries

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

  //start data for week

  // create plot bands for nighttime
  let weeklyNightPlotBands = plotBandHelper(data);

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
    };
  });

  let weeklyChartDewPointData = createSecondaryChartData(
    data,
    "dewpoint",
    "blue"
  );

  let weeklyChartHumidityData = createSecondaryChartData(
    data,
    "relativeHumidity",
    "green"
  );

  let weeklyChartPrecipitationData = createSecondaryChartData(
    data,
    "probabilityOfPrecipitation",
    "white"
  );

  return {
    temperatureData: chartData,
    dewPointData: weeklyChartDewPointData,
    humidityData: weeklyChartHumidityData,
    precipitationData: weeklyChartPrecipitationData,
    min: min,
    max: max,
    plotBands: weeklyNightPlotBands,
    daySummaries: daySummaries,
    title: `${daySummaries[0].day} - ${
      daySummaries[daySummaries.length - 1].day
    }`,
  };
  //end week data
};

/// helpers

const tempToF = (tempC) => {
  return tempC * 1.8 + 32;
};

const tempToC = (tempF) => {
  return (tempF - 32) / 1.8;
};

export const colorHelper = (temp) => {
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

const createSecondaryChartData = (data, type, color) => {
  return data.map((hour) => {
    return {
      x: Date.parse(hour.startTime),
      y:
        type === "dewpoint"
          ? Math.round(tempToF(hour.dewpoint.value))
          : Math.round(hour[type].value),
      color: color,
    };
  });
};
