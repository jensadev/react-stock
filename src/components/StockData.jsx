import { useEffect, useState } from "react";
import finnHub from "../apis/finnHub";

export const StockData = ({ symbol }) => {
    const [stockData, setStockData] = useState();

    useEffect(() => {
        let isMounted = true;
        const fetchStockData = async () => {
            try {
                const response = await finnHub.get("/stock/profile2", {
                    params: {
                        symbol,
                    },
                });
                if (isMounted) {
                    setStockData(response.data);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchStockData();
        return () => { isMounted = false; }
    }, [symbol]);

    return (
        <div>
            {stockData && (
                <div className="stock-data">
                    <ul className="stock-data__list">
                        <li>Name: {stockData.name}</li>
                        <li>Country: {stockData.country}</li>
                        <li>Ticker: {stockData.ticker}</li>
                        <li>Exchange: {stockData.exchange}</li>
                        <li>Industry: {stockData.finnhubIndustry}</li>
                        <li>IPO: {stockData.ipo}</li>
                        <li>Market Cap: {stockData.marketCapitalization}</li>
                        <li>Share Outstand: {stockData.shareOutstanding}</li>
                        <li>Web: <a href={stockData.weburl} target="_blank">{stockData.weburl}</a></li>
                    </ul>
                </div>
            )}
        </div>
    );
};