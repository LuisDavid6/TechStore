import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const SalesByCategory = ({sales}) =>{

    const data = {
      // labels:["videojuegos", "celulares", "monitores", "computadores"],
      labels: sales[0],
      datasets: [{
        label: 'cantidad de ventas',
        // data: [12, 0, 3, 5],
        data: sales[1],
        backgroundColor: [
          'red',
          'green',
          'blue',
          'orange',
        ],
        // backgroundColor: [
        //   '#9D1515',
        //   '#457D22',
        //   '#141672',
        //   '#7D4E07',
        // ],
        hoverOffset: 4
      }],
    }

    const options ={
      plugins:{
        legend:{
          labels:{
            color: "white",
            font:{
              size:12
            }
          }
        },
        title:{
          display: false,
          text: 'Ventas por categoria',
          color: "white",
          font:{
            size: 23
          }
        },
      }
    }

    return(
        // <div style={{maxWidth:"500px", maxHeight:"auto",backgroundColor:"blue"}}>
            <Doughnut data={data} options={options}/>
        // </div>
    )
}

export default SalesByCategory