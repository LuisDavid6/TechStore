import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

const SalesByCategory = ({ sales }) => {
  const data = {
    labels: sales[0],
    datasets: [
      {
        label: 'cantidad de ventas',
        data: sales[1],
        backgroundColor: ['red', 'green', 'blue', 'orange', 'yellow', 'grey'],
        hoverOffset: 4,
      },
    ],
  }

  const options = {
    plugins: {
      legend: {
        labels: {
          color: 'white',
          font: {
            size: 12,
          },
        },
      },
      title: {
        display: false,
        text: 'Ventas por categoria',
        color: 'white',
        font: {
          size: 23,
        },
      },
    },
  }

  return <Doughnut data={data} options={options} />
}

export default SalesByCategory
