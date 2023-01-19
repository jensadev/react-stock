import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import finnHub from "../apis/finnHub";

export const StockDetailPage = () => {
    const { symbol } = useParams();

    useEffect(() => {
        let isMounted = true;
        const fetchStock = async () => {
            const date = new Date();
            const currentTime = Math.floor(date.getTime()/1000);
            const oneDay = 60 * 60 * 24;
            let fromDay = currentTime - oneDay;
            if (date.getDay() === 0) {
                fromDay = currentTime - oneDay * 3;
            } else if (date.getDay() === 6) {
                fromDay = currentTime - oneDay * 2;
            }
            try {
                const response = await finnHub.get("/stock/candle", {
                    params: {
                        symbol,
                        from: fromDay,
                        to: currentTime,
                        resolution: 30,
                    },
                });
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        if (isMounted) {
            fetchStock();
        }
        return () => (isMounted = false);
    }, []);

    return (
        <div>
            <h1>Stock Detail Page {symbol}</h1>
        </div>
    );
}