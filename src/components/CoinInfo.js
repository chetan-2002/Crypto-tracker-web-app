import {
  CircularProgress,
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { HistoricalChart } from "../config/api";
import { CryptoState } from "../CryptoContext";
// import { chartDays } from "../config/data";
// import SelectButton from "./SelectButton";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const useStyles = makeStyles((theme) => ({
  container: {
    width: "75%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    padding: 40,
    [theme.breakpoints.down("md")]: {
      width: "100%",
      marginTop: 0,
      padding: 20,
      paddingTop: 0,
    },
  },
}));

const CoinInfo = ({ coin }) => {
  const [historicalData, setHistoricalData] = useState([]);
  const [days, setDays] = useState(1);
  const { currency } = CryptoState();
  const [flag, setflag] = useState(false);
  const fetchHistoricalData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
    setflag(true);
    setHistoricalData(data.prices);
  };
  useEffect(() => {
    fetchHistoricalData();
  });

  console.log(historicalData);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });
  const classes = useStyles();

  const labels = historicalData.map((coin) => {
    let date = new Date(coin[0]);
    let time =
      date.getHours() > 12
        ? `${date.getHours() - 12}:${date.getMinutes()} PM`
        : `${date.getHours()}:${date.getMinutes()} AM`;
    return days === 1 ? time : date.toLocaleDateString();
  });

  const data = {
    labels,
    datasets: [
      {
        data: historicalData.map((coin) => coin[1]),
        label: `Price ( Past ${days} Days ) in ${currency}`,
        borderColor: "#EEBC1D",
      },
    ],
  };
  const options = {
    elements: {
      point: {
        radius: 1,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };
  // console.log(labels);
  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.container}>
        {(historicalData.length === 0) | (flag === false) ? (
          <CircularProgress
            style={{ color: "gold" }}
            size={150}
            thickness={1}
          />
        ) : (
          <>
            <Line data={data} options={options}></Line>
            {/* <div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              {chartDays.map((day) => (
                <SelectButton
                  key={day.value}
                  onClick={() => {
                    setDays(day.value);
                    setflag(false);
                  }}
                  selected={day.value === days}
                >
                  {day.label}
                </SelectButton>
              ))}
            </div> */}
          </>
        )}
      </div>
    </ThemeProvider>
  );
};

export default CoinInfo;
