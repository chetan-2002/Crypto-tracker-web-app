import React from "react";
import {
  AppBar,
  Container,
  Toolbar,
  Select,
  createTheme,
  ThemeProvider,
} from "@material-ui/core";
import { MenuItem, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../CryptoContext";

const Header = () => {
  const navigate = useNavigate();

  const { currency, setCurrency } = CryptoState();
  console.log(currency);
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <Typography
              onClick={() => navigate("/")}
              style={{
                flex: 1,
                color: "gold",
                fontFamily: "Montserrat",
                fontWeight: "bold",
                cursor: "pointer",
                variant: "h6",
              }}
            >
              Crypto Hunter
            </Typography>
            <Select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              variant="outlined"
              style={{ width: 100, height: 40, marginLeft: 15 }}
            >
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"INR"}>INR</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
