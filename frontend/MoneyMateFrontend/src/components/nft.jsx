import React from 'react'
import { useEffect, useContext, useState } from 'react'


export default function nft() {
  const [nftList, setNftList] = useState([])

  async function getNft() {
    const url = 'http://localhost:8090/api/nft'
    try {
      const res = await fetch(url)
      let nftArray = await res.json()
      if (!res.ok) {
        console.log(":(");
        return;
      }
      if (!Array.isArray(nftArray)) {
        nftArray = []
      }
      setNftList(nftArray)
    }catch(err) {console.error(err)}
  }

  useEffect(() => {
    getNft()
  },[])
  
  
  return (
    <div>
      <h1>NFT</h1>
    </div>
  )
}
