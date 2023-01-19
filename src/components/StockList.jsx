import { useState, useEffect } from "react";
import finnHub from '../apis/finnHub';

export const StockList = () => {
    const [watchList, setWatchList] = useState(['GOOGL', 'MSFT', 'AMZ']);

    useEffect(() => {
        const fetchStocks = async () => {
            try {
                const response = await finnHub.get('/quote?symbol=MSFT');
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchStocks();
    }, []);

    return (
        <div>
            <h1>StockList</h1>
        </div>
    );
}