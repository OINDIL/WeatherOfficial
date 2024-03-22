import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

function AreaChart({chartarr ,isActive}) {
  const [arr, setArr] = useState(chartarr);
  // console.log(isActive);
  function fahrenFunc(data){
    return (
      data.map((item)=>Math.floor((item*9/5)+32))
    )
  }

  // console.log(fahrenFunc(arr));


  useEffect(() => {
    console.log(chartarr);
    if(isActive){
      setArr(fahrenFunc(chartarr))
    }
    else{
      setArr(chartarr)
    }
  }, [chartarr,isActive]);
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
