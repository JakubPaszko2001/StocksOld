import React from 'react'
import StockList from '../components/StockList'
import AutoComplete from '../components/AutoComplete'

const StockMain = () => {
  return (
    <div>
      <AutoComplete />
      <StockList />
    </div>
  )
}

export default StockMain