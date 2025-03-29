import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { Chart, registerables } from "chart.js";
import "chartjs-adapter-date-fns";
import "./CryptoCoinPage.css";

Chart.register(...registerables);

const CryptoPage = () => {
    let [coinData, setCoinData] = useState(null);
    let [coinChartData, setCoinChartData] = useState(null);
    const [timeRange, setTimeRange] = useState(1); // Default to 1 day
    const location = useLocation();
    const cryptoId = location.pathname.split("/")[2];
    const chartRef = useRef(null);

    async function getCoinData() {
        const url = `http://localhost:8090/api/coindata/${cryptoId}`;
        try {
            const res = await fetch(url);
            if (!res.ok) {
                console.log(":(");
                return;
            }
            const coinDataJson = await res.json();
            setCoinData(coinDataJson);
            console.log(coinDataJson);
        } catch (e) {
            console.error(e);
        }
    }

    async function getCoinChartData(coinId, range) {
        const url = `http://localhost:8090/api/getchart/${coinId}/${range}`;
        try {
            const res = await fetch(url);
            if (!res.ok) {
                console.log(":(");
                return;
            }
            const chartData = await res.json();
            const formattedChartData = chartData.prices.map((item) => ({
                x: new Date(item[0]),
                y: item[1],
            }));
            setCoinChartData(formattedChartData);
            console.log(formattedChartData);
        } catch (e) {
            console.error(e);
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

    useEffect(() => {
        if (coinChartData) {
            const ctx = document.getElementById("myChart").getContext("2d");
            if (chartRef.current) {
                chartRef.current.destroy();
            }
            chartRef.current = new Chart(ctx, {
                type: "line",
                data: {
                    datasets: [
                        {
                            label: `${cryptoId} Price`,
                            data: coinChartData,
                            borderWidth: 2,
                            borderColor: "#17f51b",
                            backgroundColor: "black",
                            fill: false,
                        },
                    ],
                },
                options: {
                    scales: {
                        x: {
                            type: "time",
                            time: {
                                unit: "day",
                            },
                        },
                        y: {
                            beginAtZero: false,
                        },
                    },
                },
            });
        }
    }, [coinChartData]);

    const handleTimeRangeChange = (range) => {
        setTimeRange(range);
    };

    return (
        <div className="CryptoCoinDiv">
            <div className="titleCoin">
                {coinData && <img src={coinData.image.thumb} alt={coinData.name} />}
                <h4>
                    {coinData ? coinData.name : "Loading..."}{" "}
                    <span className="SingleSymbol">{coinData ? coinData.symbol : ""}</span>
                </h4>
            </div>
            <div className="mainPage row">
                {/* Colonna per i dati della moneta */}
                <div className="coinData col-12 col-md-6 p-3">
                    <div className="price">
                        <h1>{coinData ? `${coinData.market_data.current_price.usd}$` : ""}</h1>
                    </div>
                    <div className="marketdata">
                        <table className="table">
                            <tbody>
                                <tr className="tr">
                                    <td className="td">
                                        {coinData
                                            ? `Market Cap: ${coinData.market_data.market_cap.usd}$`
                                            : "Loading..."}
                                    </td>
                                </tr>
                                <tr className="tr">
                                    <td className="td">
                                        {coinData
                                            ? `Fully Diluted Valuation: ${coinData.market_data.fully_diluted_valuation.usd}$`
                                            : "Loading..."}
                                    </td>
                                </tr>
                                <tr className="tr">
                                    <td className="td">
                                        {coinData
                                            ? `Circulating Supply: ${coinData.market_data.circulating_supply}$`
                                            : "Loading..."}
                                    </td>
                                </tr>
                                <tr className="tr">
                                    <td className="td">
                                        {coinData
                                            ? `Max Supply: ${coinData.market_data.max_supply}$`
                                            : "Loading..."}
                                    </td>
                                </tr>
                                <tr className="tr">
                                    <td className="td">
                                        {coinData
                                            ? `Total Supply: ${coinData.market_data.total_supply}$`
                                            : "Loading..."}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                {/* Colonna per il grafico */}
                <div className="canvasContainer col-12 col-md-6">
                    <canvas id="myChart"></canvas>
                    <nav aria-label="Page navigation example" className="timeChart">
                        <ul className="pagination">
                            <li className="page-item">
                                <a
                                    className="page-link"
                                    href="#"
                                    onClick={() => handleTimeRangeChange(1)}
                                >
                                    1
                                </a>
                            </li>
                            <li className="page-item">
                                <a
                                    className="page-link"
                                    href="#"
                                    onClick={() => handleTimeRangeChange(7)}
                                >
                                    7
                                </a>
                            </li>
                            <li className="page-item">
                                <a
                                    className="page-link"
                                    href="#"
                                    onClick={() => handleTimeRangeChange(31)}
                                >
                                    31
                                </a>
                            </li>
                            <li className="page-item">
                                <a
                                    className="page-link"
                                    href="#"
                                    onClick={() => handleTimeRangeChange(365)}
                                >
                                    365
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default CryptoPage;

/*
Bitcoin Statistics
Market Cap 
$1,673,458,879,438 
Fully Diluted Valuation 
$1,673,458,879,438
24 Hour Trading Vol 
$28,038,949,114
Circulating Supply 
19,843,206 
Total Supply 
19,843,206
Max Supply 
21,000,000
Info
Website
Explorers
Wallets
Community
Search on
Source Code
API ID
Chains
Categories
*/