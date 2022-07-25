import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { apiWrapper } from "../../gateway/shop-it";
import { GetStatsResponse } from "../../generated/swagger/shop-it";

export default () => {
  const [stats, setStats] = useState({
    getStatsResponse: {} as GetStatsResponse,
  });
  useEffect(() => {
    apiWrapper.shop
      .stats()
      .then((response) => setStats({ ...stats, getStatsResponse: response }));
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "flex-start",
        justifyContent: "center",
      }}
    >
      <Card
        style={{ marginRight: 15, width: 150, height: 250, overflow: "hidden" }}
      >
        <Card.Title>Top Sales</Card.Title>
        <Card.Body>
          {(stats.getStatsResponse.topSales?.lineItems || []).map((item) => {
            return (
              <label key={`card-top-${item.title}`}>
                {item.title} - {item.count}$
              </label>
            );
          })}
        </Card.Body>
      </Card>

      <Card
        style={{ marginRight: 15, width: 150, height: 250, overflow: "hidden" }}
      >
        <Card.Title>Top Unique Sales</Card.Title>
        <Card.Body>
          {(stats.getStatsResponse.topSales?.topItems || []).map((item) => {
            return (
              <label key={`card-unique-${item.title}`}>
                {item.title} - {item.count}
              </label>
            );
          })}
        </Card.Body>
      </Card>

      <Card
        style={{ marginRight: 15, width: 150, height: 250, overflow: "hidden" }}
      >
        <Card.Title>Last Daily sales</Card.Title>
        <Card.Body>
          {(stats.getStatsResponse.topSales?.lastSales || []).map((item) => {
            return (
              <label key={`card-date-${item.date}`}>
                {item.date} - {item.totalProfit}$
              </label>
            );
          })}
        </Card.Body>
      </Card>
    </div>
  );
};
