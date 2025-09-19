"use client"

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);


const DoughnutChart = ({accounts}: DoughnutChartProps) => {
  const accountNames = accounts?.map(account => account.name) || [];
  const accountBalances = accounts?.map(account => account.currentBalance) || [];
  const data = {
    datasets: [
      {
        label: 'Banks',
        data: accountBalances,
        backgroundColor: ['#A47148', '#DCC3B2', '#B88C6C'], 
      }
    ],
    labels: accountNames
  }

  return (
    <div className="flex  max-w-[160px] items-center sm:max-w-[120px]">
      <Doughnut
     data={data} 
     options={{
      cutout: '70%',
      plugins: {
        legend: {
          display: false
        }
        }
      }}
    /></div>
  
  )
}

export default DoughnutChart