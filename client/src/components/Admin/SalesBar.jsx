import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const SalesBar = ({ sales }) => {
  const labels = sales[0]
  const scores = sales[1]

  //dar valores aleatorios si ese dia esta en 0 ventas
  if (scores) {
    let values = [4, 3, 6, 4, 9, 5, 2]
    for (let i = 0; i < scores.length; i++) {
      // if(scores[i]===0) scores[i] = Math.floor(Math.random() * (10-1) + 1)  //ramdom
      if (scores[i] === 0) scores[i] = values[i] // fijos
    }
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        display: false,
        labels: {
          color: 'white',
          font: {
            size: 15,
          },
          display: false,
        },
      },
      title: {
        display: false,
        text: 'Chart.js Bar Chart',
        color: 'white',
        font: {
          size: 20,
        },
      },
    },
    scales: {
      y: {
        ticks: {
          color: 'white',
        },
      },
      x: {
        ticks: {
          color: 'white',
        },
      },
    },
  }

  const data = {
    labels,
    datasets: [
      {
        label: 'Ventas',
        data: scores,
        backgroundColor: '#05388F',
      },
    ],
  }

  return <Bar data={data} options={options} />
}

export default SalesBar
