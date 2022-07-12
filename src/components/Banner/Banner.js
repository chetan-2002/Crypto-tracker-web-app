import { Container, Typography } from "@material-ui/core";
import React from "react";
import Carousel from "./Carousel";

const Banner = () => {
  return (
    <div style={{ backgroundImage: "url(./banner2.jpg)" }}>
      <Container
        style={{
          height: 400,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <Typography
            variant="h2"
            style={{
              fontWeight: "bold",
              marginBottom: 15,
              color: "white",
              fontFamily: "Montserrat",
            }}
          >
            Crypto Hunter
          </Typography>
          <Typography
            variant="subtitle2"
            style={{
              color: "darkgrey",
              textTransform: "capitalize",
              fontFamily: "Montserrat",
            }}
          >
            Get all the Info regarding your favorite Crypto Currency
          </Typography>
        </div>
        <Carousel></Carousel>
      </Container>
    </div>
  );
};

export default Banner;
