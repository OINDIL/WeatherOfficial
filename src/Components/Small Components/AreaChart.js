import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

function AreaChart(props) {
  const [arr, setArr] = useState(props.chartarr);

  useEffect(() => {
    console.log(props.chartarr);
    setArr(props.chartarr);
  }, [props.chartarr]);
  return (
    <>
      <div className="container-fluid">
        <Chart
          type="area"
          width={'103%'}
          height={180}
          series={[
            {
              name: 'Forecast',
              data: arr,
            },
          ]}
          options={{
            chart: {
              id: 'forecast-temp',
              toolbar: {
                show: false,
              },
            },
            title: {
              style: { fontSize: 20 },
            },
            colors: ['#3083dc'],
            stroke: { width: 0, curve: 'smooth' },
            fill: { opacity: 1, type: 'solid' },
            dataLabels: {
              enabled: false,
            },
            yaxis: {
              stepSize: 1,
            },
          }}
        ></Chart>
      </div>
    </>
  );
}

export default AreaChart;
