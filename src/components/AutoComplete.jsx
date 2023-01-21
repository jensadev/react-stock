import { useState, useEffect, useContext } from "react";
import finnHub from "../apis/finnHub";
import { WatchListContext } from "../context/watchListContext";

export const AutoComplete = () => {
    const [search, setSearch] = useState('');
    const [results, setResults] = useState([]);
    const { addStock } = useContext(WatchListContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await finnHub.get('/search', {
                    params: {
                        q: search,
                    },
                });
                setResults(response.data.result);
            } catch (error) {
                console.log(error);
            }
        };
        if (search.length > 0) {
            fetchData();
        } else {
            setResults([]);
        }
    }, [search]);

    return (
        <header className="container">
            <div className="dropdown">
                <label htmlFor="search" className="visually-hidden">Search</label>
                <input
                    id="search"
                    type="text"
                    placeholder="Search..."
                    autoComplete="off"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <ul className={`dropdown-menu ${results.length > 0 ? 'show' : ''}`}>
                    {results.length > 0 && results.map((result) => (
                        <li
                            key={result.symbol}
                            onClick={() => {
                                setSearch('');
                                addStock(result.symbol)
                            }}
                        >
                            {result.description} ({result.symbol})
                        </li>
                    ))}
                </ul>
            </div>
        </header>
    );
}