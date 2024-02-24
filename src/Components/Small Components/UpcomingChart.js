import React, { useState } from 'react'
import Chart from 'react-apexcharts'
import './CSS/upcomingChart.css'

function UpcomingChart() {
  const [lineChart, setLineChart] = useState({
    series: [{
      name: 'series1',
      data: [0,0,0,0,0,0,0]
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
      yaxis: {
        show: false
      },
      responsive: [
        {
          breakpoint: 1000,
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