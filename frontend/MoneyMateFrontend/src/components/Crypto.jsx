import { useEffect } from "react"
import React from 'react'


export default function Crypto() {
  async function Fetch() {
    const url = "http://localhost:8090/api/coinlist"
    try {
      const res = await fetch(url)
      if (!res.ok) {
        throw new Error(`Response status ${res.status}`)
      } else {
        const json = await res.json()
        console.log(json)
      }
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    Fetch()
  }, [])

  
  return (
    <div>
      <h1>Crypto</h1>
    </div>
  )
}
