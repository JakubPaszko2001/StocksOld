import React, {useState, useEffect, useContext} from 'react'
import './style.css'
import { WatchListContext } from '../context/Contex'
import finnHub from '../apis/finnHub'

const AutoComplete = () => {

  const [search, setSearch] = useState("")
  const [results, setResults] = useState([])
  const {addStock} = useContext(WatchListContext)

  const render = () => {
    const display = search ? "display" : null
    return (
      <ul className={display}>
        {results.map((res) => {
          return(
            <li onClick={() => {
              addStock(res.symbol)
              setSearch("")
            }}
            key={res.symbol}>{res.description} ({res.symbol})
            </li>
          )
        })}
      </ul>
    )
  }

  useEffect(() => {
    let isMounted = true
    const fetchData = async () => {
      try {
        const response = await finnHub.get("/search", {
          params: {
            q: search
          }
        })
        if(isMounted) {
          setResults(response.data.result)
        }
      } catch (err) {

      }
    }
    if(search.length > 0) {
      fetchData()
    }else {
      setResults([])
    }
    return() => (isMounted = false)
  }, [search])

  return (
    <div className='autoCompleteContainer'>
      <div className='dropDown'>
        <input placeholder='Search' value={search} onChange={(e) => {setSearch(e.target.value)}}></input>
        <div className="dropDownMenu">
          {render()}
        </div>
      </div>
    </div>
  )
}

export default AutoComplete