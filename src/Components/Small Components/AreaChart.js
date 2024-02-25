import React, { useEffect, useState } from 'react'
import Chart from 'react-apexcharts';

function AreaChart(props) {
    const [arr,setArr] = useState([])
    useEffect(()=>{
        console.log(props.chartarr);
        setArr(props.chartarr)
    },[arr])
    return (
        <>
            <div className="container-fluid">
                <Chart 
                type='area'
                width={900}
                height={150}
                series={[
                    {
                        name:'Forecast',
                        data:arr
                    }
                ]}
                options={{
                    title:{
                        style:{fontSize:20}
                    },
                    colors:['#3083dc'],
                    stroke:{width:0,curve:'smooth'},
                    fill:{opacity:1,type:'solid'},
                    dataLabels:{
                        enabled:false
                    }
                }
            }
                >

                </Chart>
            </div>
        </>
    )
}

export default AreaChart