import React, { useEffect, useState } from 'react'
import "./HomePage.css"
import ScrambleHover from "../animations/scramble"
import { motion } from "framer-motion"
import { Display } from 'react-bootstrap-icons';

function HomePage() {
    const [startAnimation, setStartAnimation] = React.useState(false);
    const [trendingCats, setTrendingCats] = useState([])
    const [trendingCoins, setTrendingCoins] = useState([])
    const [trendingNFTs, settrendingNFTs] = useState([])

    React.useEffect(() => {
        setStartAnimation(true);
    }, []);

    useEffect(() => {
        getTrending()
    }, [])

    

    async function getTrending() {
        const url = 'http://localhost:8090/api/trend'
        try {
            const res = await fetch(url)
            let trending = await res.json()
            
            setTrendingCoins(trending.coins.slice(0, -9));
            setTrendingCats(trending.categories.slice(0, -2));
            settrendingNFTs(trending.nfts.slice(0, -1 ));

            console.log(trendingCoins)

        }catch(e) {console.error(e)}
    }

    return (
        <div className="homePageWrapper" style={{ overflow: 'hidden' }}>
            <div className="bigDiv">
                <div className="HomePageDiv">
                    <ScrambleHover
                        text={'Block Vision'}
                        scrambleSpeed={40}
                        sequential={true}
                        revealDirection="start"
                        useOriginalCharsOnly={false}
                        className="text1"
                        characters="abcdefghijklmnopqrstuvwxyz!@#$%^&*()_+-=[]{}|;':\,./<>?"
                        isHovering={startAnimation}
                    />
                    <ScrambleHover
                        text={'La new vision su Blockchain e Crypto'}
                        scrambleSpeed={50}
                        sequential={true}
                        revealDirection="start"
                        useOriginalCharsOnly={false}
                        className="text2"
                        characters="abcdefghijklmnopqrstuvwxyz!@#$%^&*()_+-=[]{}|;':\,./<>?"
                        isHovering={startAnimation}
                    />
                </div>
                <motion.div className="BlackDiv">
                    <motion.div
                        initial={{ opacity: 0, y: 75 }}
                        whileInView={{
                            opacity: 1,
                            y: 0,
                            transition: {
                                delay: 0.2,
                                duration: 1,
                                ease: "easeInOut",
                            },
                        }}
                        viewport={{ once: true, amount: 0.5 }}
                        className="centerText"
                    >
                        <h1>
                            Entra nella nuova era della finanza con{" "}
                            <span style={{ color: "#32CD32" }}>BlockVision</span> <br />
                            Tecnologia all'
                            <span
                                style={{
                                    color: "#32CD32",
                                    textDecoration: "underline",
                                    textUnderlineOffset: "2",
                                }}
                            >
                                avanguardia
                            </span>{" "}
                            per il controllo totale sul tuo futuro crypto.
                        </h1>
                    </motion.div>
                    <motion.div className="buttonDiv">
                        <a href="/crypto">
                            <motion.button
                                className="btn btn-outline-success btnHome"
                                initial={{ opacity: 0, y: 100 }}
                                whileInView={{
                                    opacity: 1,
                                    y: 0,
                                    transition: {
                                        delay: 0.4,
                                        duration: 1,
                                        ease: "easeInOut",
                                    },
                                }}
                                viewport={{ once: true, amount: 1 }}
                            >
                                Crypto
                            </motion.button>
                        </a>

                        <a href="/nft">
                            <motion.button
                                className="btn btn-outline-success btnHome"
                                initial={{ opacity: 0, y: 100 }}
                                whileInView={{
                                    opacity: 1,
                                    y: 0,
                                    transition: {
                                        delay: 0.6,
                                        duration: 1,
                                        ease: "easeInOut",
                                    },
                                }}
                                viewport={{ once: true, amount: 1 }}
                            >
                                NFT
                            </motion.button>
                        </a>

                        <a href="/news">
                            <motion.button
                                className="btn btn-outline-success btnHome"
                                initial={{ opacity: 0, y: 100 }}
                                whileInView={{
                                    opacity: 1,
                                    y: 0,
                                    transition: {
                                        delay: 0.8,
                                        duration: 1,
                                        ease: "easeInOut",
                                    },
                                }}
                                viewport={{ once: true, amount: 1 }}
                            >
                                News
                            </motion.button>
                        </a>
                    </motion.div>
                </motion.div>
                <div className="grid-container maxHeigh">
                    {/* Tabella 1: Categorie */}
                    <div className="table-section">
                        <h2>🔥 Categorie in crescita</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Slug</th>
                                    <th>Variazione 1h</th>
                                    <th>Market Cap</th>
                                    <th>Volume Totale</th>
                                </tr>
                            </thead>
                            <tbody>
                                {trendingCats.map((cat, index) => (
                                    <motion.tr
                                        key={index}
                                        initial={{ opacity: 0, y: 50 }}
                                        whileInView={{
                                            opacity: 1,
                                            y: 0,
                                            transition: {
                                                duration: 0.8,
                                                ease: "easeOut",
                                            },
                                        }}
                                        viewport={{ once: true, amount: 0.5 }}
                                    >
                                        <td>{cat.name}</td>
                                        <td>{cat.slug}</td>
                                        <td>{cat.market_cap_1h_change} $</td>
                                        <td>{cat.data.market_cap} $</td>
                                        <td>{cat.data.total_volume} $</td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Tabella 2: Criptovalute */}
                    <div className="table-section">
                        <h2>🔥 Criptovalute in crescita</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Prezzo</th>
                                    <th>Variazione 24h</th>
                                    <th>Market Cap</th>
                                    <th>Volume Totale</th>
                                </tr>
                            </thead>
                            <tbody>
                                {trendingCoins.map((coin, index) => (
                                    <motion.tr
                                        key={index}
                                        initial={{ opacity: 0, y: 50 }}
                                        whileInView={{
                                            opacity: 1,
                                            y: 0,
                                            transition: {
                                                duration: 0.8,
                                                ease: "easeOut",
                                            },
                                        }}
                                        viewport={{ once: true, amount: 0.5 }}
                                    >
                                        <td><img src={coin.item.small} style={{width : "2.5rem"}} alt="" />{coin.item.name}</td>
                                        <td>{coin.current_price} $</td>
                                        <td>{coin.price_change_percentage_24h} %</td>
                                        <td>{coin.market_cap} $</td>
                                        <td>{coin.total_volume} $</td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Tabella 3: NFT */}
                    <div className="table-section">
                        <h2>🔥 NFT in crescita</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Slug</th>
                                    <th>Prezzo</th>
                                    <th>Volume Totale</th>
                                </tr>
                            </thead>
                            <tbody>
                                {trendingNFTs.map((nft, index) => (
                                    <motion.tr
                                        key={index}
                                        initial={{ opacity: 0, y: 50 }}
                                        whileInView={{
                                            opacity: 1,
                                            y: 0,
                                            transition: {
                                                duration: 0.8,
                                                ease: "easeOut",
                                            },
                                        }}
                                        viewport={{ once: true, amount: 0.5 }}
                                    >
                                        <td><img src={nft.thumb} style={{width:"2.5rem"}} alt="" />{nft.name}</td>
                                        <td>{nft.slug}</td>
                                        <td>{nft.price} $</td>
                                        <td>{nft.total_volume} $</td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>)
}

export default HomePage