import React, { useContext, useEffect, useState } from 'react';
import "./Crypto.css";
import { Rss, Search, Star, StarFill } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';

//TODO: bisogna decidere quale scegliere, o cosi o con il trending, forse sarebbe meglio che sia una parte della Home page

export default function Crypto() {
  const { setFavoritesCoins } = useContext(AuthContext)
  const [coins, setCoins] = useState([]);
  const [favorites, setFavorites] = useState([]); 
  const [searchResult, setSearchResult] = useState([])
  const navigate = useNavigate();

  async function FetchCoins() {
    const url = "http://localhost:8090/api/coinlistData";
    try {
      const res = await fetch(url);
      if (!res.ok) {
        console.log(":(");
        return;
      }
      let arrayCoins = await res.json();
      if (!Array.isArray(arrayCoins)) {
        arrayCoins = [];
      }
      setCoins(arrayCoins);
      console.log(arrayCoins)
    } catch (e) {
      console.error(e);
    }
  }

  function toggleFavorite(idCoin) {
    setFavorites((prevFavorites) => {
      const newFavorites = prevFavorites.includes(idCoin)
        ? prevFavorites.filter((id) => id !== idCoin) 
        : [...prevFavorites, idCoin]; 

      console.log("New Favorites:", newFavorites); 
      
    });

    setFavoritesCoins(newFavorites)
  }

  const  handleInputChange = (event) => {
    const search = event.target.value.trim()
    if (search != "" || search == " ") {
      console.log(search)
      const filteredCoins = coins.filter(item =>
        item.name.toLowerCase().startsWith(search.toLowerCase())
      )
      setSearchResult(filteredCoins)
    } else {
      setSearchResult([])
    }
  };

  const handleRowClick = (coinId) => {
    navigate(`/crypto/${coinId}`);
  };

  useEffect(() => {
    FetchCoins();
  }, []);

  useEffect(() => {
    console.log("Favorites updated:", favorites);
  }, [favorites]);

  return (
    <div className="mainDiv1"> 
      <div className="title">
        <h1>Cerca una cripto valuta</h1>
      </div>
      <div className="searchbar">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Bitcoin, Ethereum, Solana..."
            aria-label="Recipient's username"
            aria-describedby="button-addon2"
            onChange={handleInputChange}
          />
          <button
            className="btn btn-outline-secondary bntCrypto"
            type="button"
            id="button-addon2"
          >
            <Search />
          </button>
        </div>
      </div>

      {searchResult.length > 0 ? <div className="searchResult" >
        {searchResult.map((searchCoin, index) => (
          <p className='searchcoin' onClick={() => {handleRowClick(searchCoin.id)}}><img src={searchCoin.image} alt="" /> {searchCoin.name} {searchCoin.current_price}</p>
        ))}
      </div> : ""}

      <div className="cryptoList">
        <div className="text">
          <h3>Prezzi delle criptovalute per cap. di mercato</h3>
        </div>

        <div className="tableDiv">
          <table className="table-dark">
            <thead>
              <tr className=''>
                <th scope="col">#</th>
                <th scope="col">Moneta</th>
                <th scope="col">Prezzo</th>
                <th scope="col">1h</th>
                <th scope="col">24h</th>
                <th scope="col">7g</th>
                <th scope="col">Volume in 24 ore</th>
                <th scope="col">Cap. di mercato</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {coins.map((coin, index) => (
                <tr key={index} onClick={() => handleRowClick(coin.id)}>
                  <th scope="row">{index + 1}</th>
                  <td>
                    <img className="coinImg" src={coin.image} alt={coin.name} /> {coin.name}{" "}
                    <span className="symbol">{coin.symbol}</span>
                  </td>
                  <td>{coin.current_price} USD</td>
                  <td>{coin.price_change_percentage_1h_in_currency?.toFixed(2)}%</td>
                  <td>{coin.price_change_percentage_24h_in_currency?.toFixed(2)}%</td>
                  <td>{coin.price_change_percentage_7d_in_currency?.toFixed(2)}%</td>
                  <td>{coin.total_volume} USD</td>
                  <td>{coin.market_cap} USD</td>
                  <td>
                    {favorites.includes(coin.id) ? (
                      <StarFill
                        onClick={(event) => {
                          event.stopPropagation();
                          toggleFavorite(coin.id); // Rimuovi dai preferiti
                        }}
                        style={{ cursor: "pointer", color: "gold" }}
                      />
                    ) : (
                      <Star
                        onClick={(event) => {
                          event.stopPropagation();
                          toggleFavorite(coin.id); // Aggiungi ai preferiti
                        }}
                        style={{ cursor: "pointer" }}
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}