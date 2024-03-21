import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

function AreaChart({chartarr}) {
  const [arr, setArr] = useState(chartarr);
  useEffect(() => {
    setArr(chartarr)
  }, [chartarr]);
  return (
    <>
      <div className="container-fluid">
        <Chart
          type="area"
          width={'100%'}
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
            colors: ['#3083dc'],
            stroke: { width: 0, curve: 'smooth' },
            dataLabels: {
              enabled: true,
            },
            yaxis: {
              stepSize: 1,
            },
            tooltip: {
              enabled: false
            }
          }}
        ></Chart>
      </div>
    </>
  );
}

export default AreaChart;
