import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Games from './Component/Games/Games';
import './App.css'
import Footer from './Component/Footer/Footer';
import {SiNintendogamecube} from 'react-icons/si'

const App = () => {
  const url = 'https://partners.9ijakids.com/index.php?partnerId=555776&accessToken=l0lawtvv-94bv-oi4d-u808-5ubz&action=catalogfilter';

  const [games, setGames] = useState([]);
  const [q, setQ] = useState('')
  const [searchColumns, setSearch] = useState(["Group","Level"])

  useEffect(() => {
    axios.get(url)
      .then(response => {
        setGames(response.data)
      })
  }, [url]);

  function search(title) {
    return title.filter(games=>
      searchColumns.some((game)=> games[game].toLowerCase().indexOf(q.toLowerCase())>-1)
    );
  }

  console.log(games);

  const columns = games[0] && Object.keys(games[0]);

  return (
    <div>
      <div className="appBar">
        <p className='appTitle'>9ijakids Game List <SiNintendogamecube className='logo' /></p>

        <div className='appSearch'>
          <input type="text" value={q} onChange={(e)=>setQ(e.target.value)}
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
            className='appInput'
          />
         
          {
            columns && columns.map(game=><label className='appLabels'>
              <input type="checkbox" checked={searchColumns.includes(game)}
                onChange={(e)=>{
                const checked= searchColumns.includes(game)
                setSearch(prev => checked
                ? prev.filter(sc=> sc!== game)
                : [...prev, game])
              }}/>
              {game}
            </label> )
          }
        

        </div>
      </div>

      <Games games={search(games)} />
      <Footer />
      
    </div>
  )
}

export default App
