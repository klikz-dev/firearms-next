import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import toCapitalize from '@/functions/toCapitalize'

export default function TrendChart({ page, xValues, newYvalues, usedYvalues }) {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  )

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  }

  const data = {
    labels: xValues,
    datasets: [
      {
        label: 'New Price',
        data: newYvalues,
        borderColor: '#dc2626',
        backgroundColor: '#fee2e2',
      },
      {
        label: 'Used Price',
        data: usedYvalues,
        borderColor: '#2563eb',
        backgroundColor: '#dbeafe',
      },
    ],
  }

  return (
    <div className='mb-12'>
      <h3 className='text-2xl font-semibold mb-8'>
        {toCapitalize(page.title)} Price Trend
      </h3>

      <Line options={options} data={data} />
    </div>
  )
}
