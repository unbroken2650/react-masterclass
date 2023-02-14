import { useQuery } from "react-query";
import { fetchCoinTickers } from "../api";
import { Helmet } from "react-helmet-async";
import styled from "styled-components";

interface ChartProps {
  coinId: string;
}
interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;

function Price({ coinId }: ChartProps) {
  const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(
    ["tickers", coinId],
    () => fetchCoinTickers(coinId),
    { refetchInterval: 5000 }
  );
  return (
    <>
      <Helmet>
        <title>Price</title>
      </Helmet>
      {tickersLoading ? (
        "Price Loading"
      ) : (
        <Overview>
          <OverviewItem>
            <span>
              Change in <br></br>15 Mins
            </span>
            <span>{tickersData?.quotes.USD.percent_change_15m}%</span>
          </OverviewItem>
          <OverviewItem>
            <span>
              Change in <br></br>60 Mins
            </span>
            <span>{tickersData?.quotes.USD.percent_change_1h}%</span>
          </OverviewItem>
          <OverviewItem>
            <span>
              Change in <br></br>6 Hours
            </span>
            <span>{tickersData?.quotes.USD.percent_change_6h}%</span>
          </OverviewItem>
          <OverviewItem>
            <span>
              Change in <br></br>1 Day
            </span>
            <span>{tickersData?.quotes.USD.percent_change_24h}%</span>
          </OverviewItem>
          <OverviewItem>
            <span>
              Change in <br></br>7 Days
            </span>
            <span>{tickersData?.quotes.USD.percent_change_7d}%</span>
          </OverviewItem>
        </Overview>
      )}
    </>
  );
}

export default Price;
