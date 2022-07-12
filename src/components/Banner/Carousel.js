import React, { useEffect, useState } from "react";
import { TrendingCoins } from "../../config/api";
import { CryptoState } from "../../CryptoContext";
import AliceCarousel from "react-alice-carousel";
import axios from "axios";
import commaNumber from "comma-number";
import { Link } from "react-router-dom";
const Carousel = () => {
  const [trending, setTrending] = useState([]);
  const { currency, symbol } = CryptoState();

  const fetchTrendindCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));
    setTrending(data);
  };
  useEffect(() => {
    fetchTrendindCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const items = trending.map((coin) => {
    let profit = coin?.price_change_percentage_24h >= 0;
    let price = commaNumber(coin?.current_price);

    return (
      <Link
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          cursor: "pointer",
          textTransform: "uppercase",
          color: "white",
        }}
        to={`/coins/${coin.id}`}
      >
        <img
          src={coin?.image}
          alt={coin.name}
          height="80"
          style={{ marginBottom: 10 }}
        />
        <span>
          {coin?.symbol}
          &nbsp;
          <span
            style={{
              color: profit > 0 ? "rgb(14, 203, 129)" : "red",
              fontWeight: 500,
            }}
          >
            {profit && "+"}
            {coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>
        <span style={{ fontSize: 22, fontWeight: 500 }}>
          {symbol} {price}
        </span>
      </Link>
    );
  });

  const responsive = {
    0: { items: 2 },
    512: { items: 4 },
  };
  return (
    <div style={{ height: "50%", display: "flex", alignItems: "center" }}>
      <AliceCarousel
        autoPlay
        autoPlayInterval={1000}
        mouseTracking
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        infinite
        items={items}
      ></AliceCarousel>
    </div>
  );
};

export default Carousel;
