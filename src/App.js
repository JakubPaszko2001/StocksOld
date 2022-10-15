import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StockDetail from "./pages/StockDetail";
import StockMain from "./pages/StockMain";
import {WatchListContextProvider} from './context/Contex'

function App() {
  return (
    <div className="App">
      <WatchListContextProvider>
      <BrowserRouter>
       <Routes>
          <Route path="/" element={<StockMain />} />
          <Route path="/details/:symbol" element={<StockDetail />} />
       </Routes>
      </BrowserRouter>
      </WatchListContextProvider>
    </div>
  );
}

export default App;
