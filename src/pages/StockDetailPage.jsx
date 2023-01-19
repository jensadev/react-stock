import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import finnHub from '../apis/finnHub';
import { StockChart } from '../components/StockChart';

const formatData = (data) => {
    return data.t.map((item, index) => {
        return {
            x: item * 1000,
            y: Math.floor(data.c[index]),
        };
    });
};

export const StockDetailPage = () => {
    const { symbol } = useParams();
    const [chartData, setChartData] = useState({
        day: [],
        week: [],
        month: [],
        year: [],
    });

    useEffect(() => {
        let isMounted = true;
        const fetchStock = async () => {
            const date = new Date();
            const currentTime = Math.floor(date.getTime() / 1000);
            const oneDay = 60 * 60 * 24;
            let fromOneDay = currentTime - oneDay;
            if (date.getDay() === 0) {
                fromOneDay = currentTime - oneDay * 3;
            } else if (date.getDay() === 6) {
                fromOneDay = currentTime - oneDay * 2;
            }

            const fromTimes = [
                { time: fromOneDay, resolution: 30 },
                { time: currentTime - oneDay * 7, resolution: 60},
                { time: currentTime - oneDay * 30, resolution: 'D' },
                { time: currentTime - oneDay * 365, resolution: 'W'},
            ];

            try {
                // const response = await finnHub.get("/stock/candle", {
                //     params: {
                //         symbol,
                //         from: fromOneDay,
                //         to: currentTime,
                //         resolution: 30,
                //     },
                // });
                const responses = await Promise.all(
                    fromTimes.map((item) =>
                        finnHub.get('/stock/candle', {
                            params: {
                                symbol,
                                from: item.time,
                                to: currentTime,
                                resolution: item.resolution,
                            },
                        })
                    )
                );
                setChartData({
                    day: formatData(responses[0].data),
                    week: formatData(responses[1].data),
                    month: formatData(responses[2].data),
                    year: formatData(responses[3].data),
                });

            } catch (error) {
                console.log(error);
            }
        };
        if (isMounted) {
            fetchStock();
        }
        return () => (isMounted = false);
    }, [symbol]);

    return (
        <div>
            { chartData && (
                <StockChart chartData={chartData} symbol={symbol}/>
            )}
        </div>
    );
};
