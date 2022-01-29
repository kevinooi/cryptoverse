import React, { useState, useEffect } from "react";
import { Line as LineJS } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { Row, Typography } from "antd";

const { Title } = Typography;

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const [coinPrice, setCoinPrice] = useState([]);
  const [coinTimestamp, setCoinTimestamp] = useState([]);

  useEffect(() => {
    const prices = [];
    const timestamps = [];
    for (let i = 0; i < coinHistory?.data?.history?.length; i++) {
      prices.push(coinHistory?.data?.history[i].price);
    }
    setCoinPrice(prices);

    for (let i = 0; i < coinHistory?.data?.history?.length; i++) {
      timestamps.push(
        new Date(coinHistory?.data?.history[i].timestamp).toLocaleDateString()
      );
    }
    setCoinTimestamp(timestamps);
  }, [coinHistory]);

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: "Price in USD",
        data: coinPrice,
        fill: false,
        backgroundColor: "#0071bd",
        borderColor: "#0071bd",
      },
    ],
  };

  //   const options = {
  //     scales: {
  //       yAxes: [
  //         {
  //           ticks: {
  //             beginAtZero: true,
  //           },
  //         },
  //       ],
  //     },
  //   };

  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title">
          {coinName} Price Chart
        </Title>
        <div className="price-container">
          <Title level={5} className="price-change">
            {coinHistory?.data?.change}%
          </Title>
          <Title level={5} className="current-price">
            Current {coinName} Price: $ {currentPrice}
          </Title>
        </div>
      </Row>
      <Line data={data} /*options={options}*/ />
    </>
  );
};

export default LineChart;
