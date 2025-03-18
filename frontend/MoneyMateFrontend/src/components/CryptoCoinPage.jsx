import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-date-fns';
import './CryptoCoinPage.css';

Chart.register(...registerables);

const CryptoPage = () => {
    let [coinData, setCoinData] = useState(null)
    let [coinChartData, setCoinChartData] = useState(null)
    const [timeRange, setTimeRange] = useState(1); // Default to 1 day
    const location = useLocation();
    const cryptoId = location.pathname.split("/")[2];
    const chartRef = useRef(null);

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

    async function getCoinChartData(coinId, range) {
        const url = `http://localhost:8090/api/getchart/${coinId}/${range}`
        try {
            const res = await fetch(url)
            if (!res.ok) {
                console.log(":(")
                return
            }
            const chartData = await res.json()
            // Assuming chartData.prices is an array of arrays [timestamp, price]
            const formattedChartData = chartData.prices.map((item) => ({
                x: new Date(item[0]),
                y: item[1]
            }))
            setCoinChartData(formattedChartData)
            console.log(formattedChartData)
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        getCoinData()
    }, [cryptoId])

    useEffect(() => {
        if (coinData && coinData.id) {
            getCoinChartData(coinData.id, timeRange)
        }
    }, [coinData, timeRange])

    useEffect(() => {
        if (coinChartData) {
            const ctx = document.getElementById('myChart').getContext('2d');
            if (chartRef.current) {
                chartRef.current.destroy();
            }
            chartRef.current = new Chart(ctx, {
                type: 'line',
                data: {
                    datasets: [{
                        label: `${cryptoId} Price`,
                        data: coinChartData,
                        borderWidth: 2,
                        borderColor: "#17f51b",
                        backgroundColor: 'black',
                        fill: false
                    }]
                },
                options: {
                    scales: {
                        x: {
                            type: 'time',
                            time: {
                                unit: 'day'
                            }
                        },
                        y: {
                            beginAtZero: false
                        }
                    }
                }
            });
        }
    }, [coinChartData])

    const handleTimeRangeChange = (range) => {
        setTimeRange(range);
    }

    return (
        <div className="CryptoCoinDiv">
            <div className="titleCoin">
                {coinData && <img src={coinData.image.thumb} alt={coinData.name} />}
                <h4>{coinData ? coinData.name : "Loading..."} <span className="SingleSymbol">{coinData ? coinData.symbol : ""}</span></h4>
            </div>

            <div className="mainPage">
                <div className="desc">
                    <h4>{coinData ? coinData.description.en : ""}</h4>
                </div>
                <div className="canvasContainer">
                    <canvas id="myChart"></canvas>
                    <nav aria-label="Page navigation example" className="timeChart">
                        <ul className="pagination">
                            <li className="page-item">
                                <a className="page-link" href="#" onClick={() => handleTimeRangeChange(1)}>
                                    1
                                </a>
                            </li>
                            <li className="page-item">
                                <a className="page-link" href="#" onClick={() => handleTimeRangeChange(7)}>
                                    7
                                </a>
                            </li>
                            <li className="page-item">
                                <a className="page-link" href="#" onClick={() => handleTimeRangeChange(31)}>
                                    31
                                </a>
                            </li>
                            <li className="page-item">
                                <a className="page-link" href="#" onClick={() => handleTimeRangeChange(365)}>
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