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
    const [setAiSuggestione, AiSuggestion] = useState('')
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

    async function getAiSuggestione() {
        event.preventDefault()
        


        const prompt = {
            text: `Analizza oggettivamente se, in base ai dati disponibili (prezzo attuale, variazioni percentuali, volume di scambio, trend recente e altri indicatori di mercato), può avere senso acquistare la seguente criptovaluta in questo momento.

Non considerare il mio portafoglio, il mio budget o la mia propensione al rischio. Voglio solo una valutazione basata sui dati oggettivi.

La criptovaluta è: ${cryptoId}

Dati a supporto (esempi):

Prezzo attuale: ${coinData.market_data.current_price.usd} $

Variazione 24h: ${coinData.market_data.price_change_percentage_24h}


Restituisci un'analisi chiara, oggettiva e sintetica. Se possibile, includi eventuali segnali rialzisti o ribassisti, valutazioni tecniche o pattern di comportamento.`

        }

        
        const url = `http://localhost:8090/api/ai`
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(prompt)
            })
            const data1 = await response.json()
            console.log(data1)

        } catch (e) { console.error(e) }

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
            <div className="mainPage">
                {/* Colonna per il grafico */}
                <div className="canvasContainer">
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

                {/* Colonna per i dati della moneta */}
                <div className="coinData">
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
                        <div className="actions">
                            <a href="">Grafico OHLC</a>
                            <a href="" onClick={() => {getAiSuggestione()}}>Consigli Ai</a>
                        </div>
                    </div>
                </div>

            </div>

            {/* Descrizione */}
            <div className="description">
                <h2>Descrizione</h2>
                <p>{coinData?.description?.en || "Nessuna descrizione disponibile."}</p>
            </div>

            {/* Link utili */}
            <div className="links">
                <h2>Link utili</h2>
                <ul>
                    {coinData?.links?.homepage[0] && (
                        <li>
                            <a href={coinData.links.homepage[0]} target="_blank" rel="noopener noreferrer">
                                Sito ufficiale
                            </a>
                        </li>
                    )}
                    {coinData?.links?.whitepaper && (
                        <li>
                            <a href={coinData.links.whitepaper} target="_blank" rel="noopener noreferrer">
                                Whitepaper
                            </a>
                        </li>
                    )}
                    {coinData?.links?.blockchain_site?.length > 0 && (
                        <li>
                            <strong>Blockchain Explorer:</strong>
                            <ul>
                                {coinData.links.blockchain_site.map((link, index) =>
                                    link ? (
                                        <li key={index}>
                                            <a href={link} target="_blank" rel="noopener noreferrer">
                                                {link}
                                            </a>
                                        </li>
                                    ) : null
                                )}
                            </ul>
                        </li>
                    )}
                    {coinData?.links?.subreddit_url && (
                        <li>
                            <a href={coinData.links.subreddit_url} target="_blank" rel="noopener noreferrer">
                                Subreddit
                            </a>
                        </li>
                    )}
                    {coinData?.links?.repos_url?.github?.length > 0 && (
                        <li>
                            <strong>GitHub Repository:</strong>
                            <ul>
                                {coinData.links.repos_url.github.map((repo, index) => (
                                    <li key={index}>
                                        <a href={repo} target="_blank" rel="noopener noreferrer">
                                            {repo}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default CryptoPage;

