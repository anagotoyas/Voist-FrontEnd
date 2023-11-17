
import { Chart, registerables } from "chart.js";
import { Bar } from "react-chartjs-2";
import PropTypes from 'prop-types'

Chart.register(...registerables);

export const BarChart = (props) => {
  const {
    data: values,
    labels,
    title,
    subtitle = "",
    yLabel = "",
    xLabel = "",
  } = props;
  const data = {
    labels: labels,
    datasets: [
      {
        label: title,
        data: values,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="h-full flex items-center">
      <Bar
         height="100%"
        data={data}
        options={{
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: yLabel,
              },
            },
            x: {
              title: {
                display: true,
                text: xLabel,
              },
            },
          },
          responsive: true,
          plugins: {
            title: {
              align: "start",
              display: true,
              font: { size: 15, family: "Quicksand, sans-serif" },
              text: title,
              padding: { bottom: 40 },
            },
            subtitle: {
              display: true,
              text: subtitle,
              align: "end",
            },

            legend: {
              display: false,
            },
          },
        }}
      />
    </div>
  );
};

BarChart.propTypes = {
    data: PropTypes.array,
    labels: PropTypes.array,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    yLabel: PropTypes.string,
    xLabel: PropTypes.string,
    };