import { createContext, useState, useEffect } from "react";

export const WatchListContext = createContext();

export const WatchListContextProvider = ({ children }) => {
    const [watchList, setWatchList] = useState(JSON.parse(localStorage.getItem('watchList')) || ['GOOGL', 'MSFT', 'AMZN']);

    useEffect(() => {
        localStorage.setItem('watchList', JSON.stringify(watchList));
    }, [watchList]);

    const addStock = (stock) => {
        if (!watchList.includes(stock)) {
            setWatchList([...watchList, stock]);
        }
    };

    const removeStock = (stock) => {
        setWatchList(watchList.filter((item) => item !== stock));
    };



    return (
        <WatchListContext.Provider value={{ watchList, addStock, removeStock }}>
            {children}
        </WatchListContext.Provider>
    );
}