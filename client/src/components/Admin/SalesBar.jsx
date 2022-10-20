import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(  CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SalesBar = () =>{
    
  const labels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'];
  const scores = [12,34,54,12,34,21,22]

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        display: false,
        labels:{
          color: "white",
          font:{
            size:15
          },
          display:false
        }
      },
      title: {
        display: false,
        text: 'Chart.js Bar Chart',
        color: "white",
        font:{
          size: 20
        }
      }
    },
  };

  const data = {
    labels,
    datasets: [{
      label: 'Ventas',
      data: scores,
      backgroundColor: '#05388F',
      datalabels:{
        display:true,
        color:"red"
      }
    }],
  };
      
  return(
    <Bar data={data} options={options}/>
  )
}

export default SalesBar