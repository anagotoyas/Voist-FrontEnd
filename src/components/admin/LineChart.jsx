
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export const LineChart = (props) => {
  // eslint-disable-next-line react/prop-types
  const { data: values, labels, title } = props;

  const data= {
    labels: labels,
    datasets: [
      {
        label: title,
        data: values,
        borderColor: "#F6876A",
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  };
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="h-full flex items-center">

      <Line
      
          data={data}
          height="100%"
          options={{
            ...options,
            responsive: true,
            plugins: {
              title: {
                align: "start",
                display: true,
                font: { size: 15, family: "Quicksand, sans-serif" },
                text: title,
                padding: { bottom: 40 },


              },
              legend: {
                display: false,
              },
            },
          }}
        />
    </div>
  )
}
