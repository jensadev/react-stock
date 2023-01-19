import { useState, useEffect } from 'react';
import finnHub from '../apis/finnHub';

export const StockList = () => {
    const [watchList, setWatchList] = useState(['GOOGL', 'MSFT', 'AMZN']);
    const [stock, setStock] = useState();

    useEffect(() => {
        let isMounted = true;
        const fetchStocks = async () => {
            try {
                //                const response = await finnHub.get(`/quote?symbol=MSFT&token=${import.meta.env.VITE_API_KEY}`);
                // const response = await finnHub.get('/quote', {
                //     params: {
                //         symbol: 'MSFT',
                //     },
                // });
                const responses = await Promise.all(
                    watchList.map((stock) =>
                        finnHub.get('/quote', {
                            params: {
                                symbol: stock,
                            },
                        })
                    )
                );
                const data = responses.map(response => ({
                    data: response.data,
                    symbol: response.config.params.symbol
                }))
                if (isMounted) {
                    setStock(data);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchStocks();

        return () => (isMounted = false);
    }, []);

    const changeColor = (change) => {
        if (change > 0) {
            return 'success';
        } else if (change < 0) {
            return 'danger';
        }
        return 'secondary';
    };

    return (
        <div>
            <table className='stock-table'>
                <thead>
                    <tr>
                        <th scope='col'>Name</th>
                        <th scope='col'>Last</th>
                        <th scope='col'>Change</th>
                        <th scope='col'>Change %</th>
                        <th scope='col'>High</th>
                        <th scope='col'>Low</th>
                        <th scope='col'>Open</th>
                        <th scope='col'>PClose</th>
                    </tr>
                </thead>
                <tbody>
                    {stock &&
                        stock.map((stock) => (
                            <tr key={stock.symbol}>
                                <th scope='row'>{stock.symbol}</th>
                                <td>{stock.data.c}</td>
                                <td className={`text-${changeColor(stock.data.d)}`}>{stock.data.d}</td>
                                <td className={`text-${changeColor(stock.data.d)}`}>{stock.data.dp}</td>
                                <td>{stock.data.h}</td>
                                <td>{stock.data.l}</td>
                                <td>{stock.data.o}</td>
                                <td>{stock.data.pc}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};
