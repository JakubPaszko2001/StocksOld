import React, {useState} from 'react'
import Chart from 'react-apexcharts'

const StockChart = ({chartData,symbol}) => {
  const [dateFormat, setDateFormat] = useState("24h")
  const {day,week,year} = chartData
  const options = {
    title: {
      text: symbol,
      align: "center"
    },
    xaxis: {
      type: "datetime",
      labels: {
        datetimeUTC: false
      }
    },
    tooltip: {
      x: {
        format: "MMM dd HH:MM"
      }
    }
  }

  const determineTimeFormat = () => {
    switch(dateFormat) {
      case "24h":
        return day
      case "7d":
        return week
      case "1y":
        return year
    }
  }

  const series = [{
    name: symbol,
    data: determineTimeFormat()
  }]
  return (
    <div>
      <Chart options={options} series={series} type={"area"} width="50%" />
      <button onClick={() => setDateFormat("24h")}>24h</button>
      <button onClick={() => setDateFormat("7d")}>7d</button>
      <button onClick={() => setDateFormat("1y")}>1y</button>
    </div>
  )
}

export default StockChart