import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import '../node_modules/modern-css-reset/dist/reset.min.css'
import { StockOverviewPage } from './pages/StockOverviewPage';
import { StockDetailPage } from './pages/StockDetailPage';

function App() {

  return (
    <main className='container'>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<StockOverviewPage />} />
                <Route path='/detail/:id' element={<StockDetailPage />} />
            </Routes>
        </BrowserRouter>
    </main>
  )
}

export default App
