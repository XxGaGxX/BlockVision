import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import './CryptoCoinPage.css'

const CryptoPage = () => {
    let [coinData, setCoinData] = useState(null)
    let [coinChartData, setCoinChartData] = useState(null)
    const location = useLocation();

    const cryptoId = location.pathname.split("/")[2];

    async function getCoinData() {
        const url = `http://localhost:8090/api/coindata/${cryptoId}`;
        try {
            const res = await fetch(url)
            if (!res.ok) {
                console.log(":(")
                return
            }
            const coinDataJson = await res.json()
            setCoinData(coinDataJson)
            console.log(coinDataJson)
        } catch (e) {
            console.error(e)
        }
    }

    async function getCoinChartData(coinId) {
        const url = `http://localhost:8090/api/getchart/${coinId}/1`
        try {
            const res = await fetch(url)
            if (!res.ok) {
                console.log(":(")
                return
            }
            const chartData = await res.json()
            setCoinChartData(chartData)
            console.log(chartData)
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        getCoinData()
    }, [cryptoId])

    useEffect(() => {
        if (coinData && coinData.id) {
            getCoinChartData(coinData.id)
        }
    }, [coinData])

    return (
        <div className="CryptoCoinDiv">
            <div className="titleCoin">
                <img src={coinData ? coinData.image.thumb : "Loading..."} alt="" />
                <h4>{coinData ? coinData.name : "Loading..."}</h4>
                <h5>{coinData ? coinData.symbol : "Loading..."}</h5>
            </div>
        </div>
    );
};

export default CryptoPage;