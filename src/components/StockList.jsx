import React, { useState, useEffect, useContext } from 'react'
import finnHub from '../apis/finnHub'
import { WatchListContext } from '../context/Contex'
import './style.css'
import { useNavigate } from 'react-router-dom'

const StockList = () => {

  const navigate = useNavigate()
  const [stock, setStock] = useState([])
  const {watchList} = useContext(WatchListContext)

  const changeColor = (color) => {
    return color > 0 ? "positive" : "negative";
  }
  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const responses = await Promise.all(watchList.map((stock) => {
          return finnHub.get("/quote", {
            params: {
              symbol: stock
            }
          })
        }))

        const data = responses.map((response) => {
          return {
          data: response.data,
          symbol: response.config.params.symbol
        }
        })
        console.log(data)
        if(isMounted) {
        setStock(data)
      }

      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
    return () => (isMounted = false);
  }, [watchList])

  const Navigate = (stock) => {
    navigate(`details/${stock}`)
  }

  return (
    <div className='stockListContainer space'>
      <div className='listItems'>
        <div className='padding'>Name</div>
        <div className='padding'>Last</div>
        <div className='padding'>Chg</div>
        <div className='padding'>Chg%</div>
        <div className='padding'>High</div>
        <div className='padding'>Low</div>
        <div className='padding'>Open</div>
        <div className='padding'>Close</div>
      </div>
      {stock.map((item) => {
        return(
          <div className='listItems' key={item.symbol}>
            <div className='padding pointer' onClick={() => Navigate(item.symbol)}>{item.symbol}</div>
            <div className='padding'>{item.data.c}</div>
            <div className={`padding ${changeColor(item.data.d)}`}>{item.data.d}</div>
            <div className={`padding ${changeColor(item.data.dp)}`}>{item.data.dp}</div>
            <div className='padding'>{item.data.h}</div>
            <div className='padding'>{item.data.l}</div>
            <div className='padding'>{item.data.o}</div>
            <div className='padding'>{item.data.pc}</div>
          </div>
        )
      } )}
    </div>
  )
}

export default StockList