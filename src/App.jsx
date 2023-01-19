import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import '../node_modules/modern-css-reset/dist/reset.min.css'
import { StockOverviewPage } from './pages/StockOverviewPage';
import { StockDetailPage } from './pages/StockDetailPage';

import { WatchListContextProvider } from './context/watchListContext';

function App() {

  return (
    <WatchListContextProvider>
        <main className='container'>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<StockOverviewPage />} />
                    <Route path='/detail/:symbol' element={<StockDetailPage />} />
                </Routes>
            </BrowserRouter>
        </main>
    </WatchListContextProvider>
  )
}

export default App
