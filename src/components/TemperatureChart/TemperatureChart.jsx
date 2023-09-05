import React from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import { useEffect, useState } from "react";

const formOptions = (props) => {
  //need to change this to use the offset from response
  const d = new Date();
  const timezoneOffset = d.getTimezoneOffset();

  const options = {
    chart: {
      type: "column",
      scrollablePlotArea: {
        minWidth: 900,
        minHeight: 400,
      },
    },
    // title: {
    //   text: props.some ? props.some : "Generic Name",
    // },
    time: {
      timezoneOffset: timezoneOffset,
    },
    xAxis: {
      type: "datetime",
      //   tickPositions: formatted.times,
      crosshair: true,
      plotBands: props.temperatureData.plotBands,
    },
    yAxis: {
      min: props.temperatureData.min * 0.98,
      max: props.temperatureData.max * 1.02,
      title: {
        text: "Temperature",
      },
    },
    series: [
      {
        name: "Temperature",
        data: props.temperatureData.data,
        tooltip: {
          valueSuffix: "°F",
          // headerFormat: "{point.key}",
          pointFormat: "{point.y}",
          xDateFormat: "%a, %b %e, %l%p",
        },
      },
    ],
  };
  return options;
};

const TemperatureChart = (props) => {
  useEffect(() => {
    if (props.temperatureData) {
      setChartProps(formOptions(props));
    }
  }, [props]);

  const [chartProps, setChartProps] = useState();

  return (
    <HighchartsReact
      highcharts={Highcharts}
      constructorType={"chart"}
      options={chartProps}
    />
  );
};

export default TemperatureChart;
