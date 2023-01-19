import { createContext, useState } from "react";

export const WatchListContext = createContext();

export const WatchListContextProvider = ({ children }) => {
    const [watchList, setWatchList] = useState(['GOOGL', 'MSFT', 'AMZN']);

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