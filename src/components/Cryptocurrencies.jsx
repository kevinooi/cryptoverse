import React, { useEffect, useState } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Row, Col, Input, Space } from "antd";
import { useGetCryptosQuery } from "../services/cryptoApi";
import Loader from './Loader';

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptoList, loading } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const filteredData = cryptoList?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCryptos(filteredData);
  }, [cryptoList, searchTerm]);

  if (loading) return <Loader />;

  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input
            placeholder="Search Cryptocurrency"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}

      <Space>
        <Row gutter={[32, 32]} className="crypto-card-container">
          {cryptos?.map((crypto) => (
            <Col
              xs={24}
              sm={12}
              lg={6}
              className="crypto-card"
              key={crypto.uuid}
            >
              <Link to={`/crypto/${crypto.uuid}`} key={crypto.uuid}>
                <Card
                  title={`${crypto.rank}. ${crypto.name}`}
                  extra={<img className="crypto-image" src={crypto.iconUrl} />}
                  hoverable
                >
                  <p>Price: {millify(crypto.price)}</p>
                  <p>Market Cap: {millify(crypto.marketCap)}</p>
                  <p>Daily Change: {millify(crypto.change)}%</p>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </Space>
    </>
  );
};

export default Cryptocurrencies;
