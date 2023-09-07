import React from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import { useEffect, useState } from "react";

const TemperatureChart = (props) => {
  const [chartProps, setChartProps] = useState();
  const [tempOnly, setTempOnly] = useState(true);
  // const [dewPointShown, setDewPointShown] = useState(false);

  useEffect(() => {
    if (props.temperatureData) {
      setChartProps(formOptions(props));
    }
  }, [props, tempOnly]);

  const renderChart = () => {
    return (
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={"chart"}
        options={chartProps}
      />
    );
  };

  const formOptions = (props) => {
    //need to change this to use the offset from response
    const d = new Date();
    const timezoneOffset = d.getTimezoneOffset();

    const options = {
      chart: {
        // type: "column",
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
      yAxis: [
        {
          min: tempOnly ? props.temperatureData.min * 0.98 : null,
          max: tempOnly ? props.temperatureData.max * 1.02 : null,
          title: {
            text: "°F",
          },
        },
        {
          opposite: true,
          title: {
            text: "Percent",
          },
        },
      ],
      series: [
        {
          name: "Temperature",
          data: props.temperatureData.data,
          type: "column",
          tooltip: {
            valueSuffix: "°F",
            // headerFormat: "{point.key}",
            pointFormat: "Temperature: {point.y}",
            xDateFormat: "%a, %b %e, %l%p",
          },
        },
        {
          name: "Dewpoint",
          data: props.temperatureData.dewPointData,
          type: "line",
          visible: !tempOnly,
          events: {
            hide: () => {
              setTempOnly(true);
            },
            show: () => {
              setTempOnly(false);
            },
          },
          tooltip: {
            valueSuffix: "°F",
            // headerFormat: "{point.key}",
            pointFormat: "Dewpoint: {point.y}",
            xDateFormat: "%a, %b %e, %l%p",
          },
        },
        {
          name: "Humidity",
          data: props.temperatureData.humidityData,
          type: "line",
          visible: !tempOnly,
          events: {
            hide: () => {
              setTempOnly(true);
            },
            show: () => {
              setTempOnly(false);
            },
          },
          tooltip: {
            valueSuffix: "%",
            pointFormat: "Humidity: {point.y}",
            xDateFormat: "%a, %b %e, %l%p",
          },
        },
        {
          name: "Precipitation",
          data: props.temperatureData.precipitationData,
          type: "line",
          visible: !tempOnly,
          events: {
            hide: () => {
              setTempOnly(true);
            },
            show: () => {
              setTempOnly(false);
            },
          },
          tooltip: {
            valueSuffix: "%",
            pointFormat: "Precipitation: {point.y}",
            xDateFormat: "%a, %b %e, %l%p",
          },
        },
      ],
    };
    return options;
  };

  return renderChart();
};

export default TemperatureChart;
