import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { Chart, registerables } from "chart.js";
import "chartjs-adapter-date-fns";
import "./CryptoCoinPage.css";

Chart.register(...registerables);

const CryptoPage = () => {
    let [coinData, setCoinData] = useState({});
    let [coinChartData, setCoinChartData] = useState(null);
    const [timeRange, setTimeRange] = useState(1); // Default to 1 day
    const [aiSuggestion, setAiSuggestion] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();
    const cryptoId = location.pathname.split("/")[2];
    const chartRef = useRef(null);

    async function getCoinData() {
        const url = `http://localhost:8090/api/coindata/${cryptoId}`;
        console.log(url)
        try {
            const res = await fetch(url);
            if (!res.ok) {
                throw new Error("Failed to fetch data");
            }
            const coinDataJson = await res.json();
            setCoinData(coinDataJson);
            setLoading(false);
            console.log(coinDataJson)
        } catch (e) {
            console.error(e);
            setError("Failed to load coin data");
            setLoading(false);
        }
    }

    

    useEffect(() => {
        getCoinData();
        
    }, [cryptoId]);

    useEffect(() => {
        if (coinData && coinData.id) {
            getCoinChartData(coinData.id, timeRange);
        }
    }, [coinData, timeRange]);

    return (
        <div className="CryptoCoinDiv">
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <>
                    <div className="titleCoin">
                        {coinData && <img src={coinData.image?.thumb} alt={coinData.name} />}
                        <h4>
                            {coinData.name} <span className="SingleSymbol">{coinData.symbol}</span>
                        </h4>
                    </div>
                    {/* Rest of the JSX */}
                </>
            )}
        </div>
    );
};

export default CryptoPage;
