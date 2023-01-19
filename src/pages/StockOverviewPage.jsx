import { AutoComplete } from "../components/AutoComplete";
import { StockList } from "../components/StockList";

export const StockOverviewPage = () => {
    return (
        <div>
            <h1>Stock Overview Page</h1>
            <AutoComplete />
            <StockList />
        </div>
    );
}