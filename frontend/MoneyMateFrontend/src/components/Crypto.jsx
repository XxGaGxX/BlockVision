import React, { useEffect, useState } from 'react'
import "./Crypto.css"
import { motion } from "framer-motion"
import { Rss, Search } from 'react-bootstrap-icons'

export default function Crypto() {
  const [coinInput, setCoinInput] = useState("")
  const [coins, setCoins] = useState([])

  async function FetchCoins() {
    const url = "http://localhost:8090/api/coinlist"
    try {
      const res = await fetch(url)
      if (!res.ok) {
        console.log(":(")
        return
      }
      const json = await res.json()
      json.map((coin) => { 
        if (coin.name.toLowerCase.startsWith == "bit") {
          console.log(coin.name)
        }
      })


    } catch (e) {
      console.error(e)
    }
  }
  

  const handleInputChange = (event) => {
    setCoinInput(event.target.value)
  }

  return (
    <div className="mainDiv1">
      <div className="title">
        <h1>Cerca una Cryptocoin</h1>
      </div>

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
          className="btn btn-outline-secondary"
          type="button"
          id="button-addon2"
          onClick={FetchCoins}
        >
          <Search />
        </button>
      </div>
    </div>
  )
}