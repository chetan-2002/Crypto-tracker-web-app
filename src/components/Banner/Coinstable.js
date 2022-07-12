import React, { useEffect, useState } from "react";
import { CoinList } from "../../config/api";
import { CryptoState } from "../../CryptoContext";
import axios from "axios";
import { useNavigate } from "react-router";
import commaNumber from "comma-number";
import {
  Container,
  createTheme,
  TableContainer,
  TextField,
  ThemeProvider,
  Typography,
  LinearProgress,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  makeStyles,
} from "@material-ui/core";
import Pagination from "@mui/material/Pagination";

const useStyle = makeStyles((theme) => ({
  pagination: {
    "& .MuiPaginationItem-root": {
      color: "gold",
    },
  },
}));
const Coinstable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const { currency, symbol } = CryptoState();
  const [page, setPage] = useState(1);
  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    setCoins(data);
    setLoading(false);
  };

  //   console.log(coins);
  useEffect(() => {
    fetchCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(search.toLowerCase())
    );
  };
  let navigate = useNavigate();

  const classes = useStyle();
  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          style={{ margin: 18, fontFamily: "Montserrat" }}
        >
          Cryptocurrencies Prices by market cap
        </Typography>
        <TextField
          label="Search for a cryptocurrency"
          variant="outlined"
          style={{ marginBottom: 20, width: "100%" }}
          onChange={(e) => setSearch(e.target.value)}
        ></TextField>

        <TableContainer>
          {loading ? (
            <LinearProgress
              style={{ backgroundColor: "gold", marginBottom: 40 }}
            />
          ) : (
            <Table style={{ marginBottom: 40 }}>
              <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                <TableRow>
                  {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                    <TableCell
                      style={{
                        color: "black",
                        fontWeight: "700",
                        fontFamily: "Montserrat",
                      }}
                      key={head}
                      align={head === "Coin" ? "" : "right"}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {handleSearch()
                  .slice((page - 1) * 10, page * 10)
                  .map((row) => {
                    const profit = row.price_change_percentage_24h > 0;
                    return (
                      <TableRow
                        onClick={() => navigate(`/coins/${row.id}`)}
                        style={{
                          cursor: "pointer",
                          fontFamily: "Montserrat",
                        }}
                        key={row.name}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          style={{
                            display: "flex",
                            gap: 15,
                          }}
                        >
                          <img
                            src={row?.image}
                            alt={row.name}
                            height="50"
                            style={{ marginBottom: 10 }}
                          />
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: 22,
                              }}
                            >
                              {row.symbol}
                            </span>
                            <span style={{ color: "darkgrey" }}>
                              {row.name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell align="right">
                          {symbol} {commaNumber(row.current_price.toFixed(2))}
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{
                            color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                            fontWeight: 500,
                          }}
                        >
                          {profit && "+"}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>
                        <TableCell align="right">
                          {symbol}{" "}
                          {commaNumber(row.market_cap.toString().slice(0, -6))}{" "}
                          M
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        <Pagination
          style={{
            display: "flex",
            justifyContent: "center",
            padding: 20,
            width: "100%",
          }}
          classes={{ ul: classes.pagination }}
          onChange={(e, page) => {
            setPage(page);
            window.scroll({ top: 450, behavior: "smooth" });
          }}
          count={(handleSearch()?.length / 10).toFixed(0)}
        ></Pagination>
      </Container>
    </ThemeProvider>
  );
};

export default Coinstable;
