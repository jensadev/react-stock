import { useState, useEffect, useContext } from 'react';
import finnHub from '../apis/finnHub';
import {GoTriangleDown} from 'react-icons/go';
import {GoTriangleUp} from 'react-icons/go';
import {WatchListContext} from '../context/watchListContext';
import { useNavigate } from 'react-router-dom';

import {GoTrashcan} from 'react-icons/go';

export const StockList = () => {
    const [stock, setStock] = useState();
    const { watchList, removeStock } = useContext(WatchListContext);
    const navigate = useNavigate();

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
    }, [watchList]);

    const changeColor = (change) => {
        return change > 0 ? 'success' : 'danger';
    };

    const changeIcon = (change) => {
        return change > 0 ? <GoTriangleUp /> : <GoTriangleDown />;
    };

    const handleStockSelect = (symbol) => {
        navigate(`/detail/${symbol}`);
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
                        <th scope='col'></th>
                    </tr>
                </thead>
                <tbody>
                    {stock &&
                        stock.map((stock) => (
                            <tr key={stock.symbol} onClick={() => handleStockSelect(stock.symbol)}>
                                <th scope='row'>{stock.symbol}</th>
                                <td>{stock.data.c}</td>
                                <td className={`text-${changeColor(stock.data.d)}`}>{ stock.data.d }{ changeIcon(stock.data.d) }</td>
                                <td className={`text-${changeColor(stock.data.d)}`}>{ stock.data.dp }{ changeIcon(stock.data.d) }</td>
                                <td>{stock.data.h}</td>
                                <td>{stock.data.l}</td>
                                <td>{stock.data.o}</td>
                                <td>{stock.data.pc}</td>
                                <td>
                                    <button onClick={(e) => {
                                        e.stopPropagation();
                                        removeStock(stock.symbol);
                                    }}>
                                        <GoTrashcan />
                                    </button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};
