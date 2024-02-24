import React, { useState } from 'react'
import Chart from 'react-apexcharts'
import './CSS/upcomingChart.css'

function UpcomingChart() {
  const [lineChart, setLineChart] = useState({
    series: [{
      name: 'series1',
      data: [31, 40, 28, 51, 42, 109, 100]
    }],
    options: {
      chart: {
        height: 350,
        type: 'area'
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth'
      },
      xaxis: {
        // type: 'datetime',
        // categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
      },
      yaxis:{
        show: false
      },
      responsive:[
        {
          breakpoint:1000,
          options: {
            plotOptions: {
              bar: {
                horizontal: true
              }
            },
            legend: {
              position: "bottom"
            }
          }
        }

      ],
      tooltip: {
        x: {
          format: 'dd/MM/yy HH:mm'
        },
      },
    }
  })
  return (
    <>
      <div className="upcoming-chart">
      <Chart
        options={lineChart.options}
        series={lineChart.series} 
        type="area" 
        width={950} 
        height={150}
      />
      </div>
    </>
  )
}

export default UpcomingChart