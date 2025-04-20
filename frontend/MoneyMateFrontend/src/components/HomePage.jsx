import React, { useEffect, useState } from 'react'
import "./HomePage.css"
import ScrambleHover from "../animations/scramble"
import { motion } from "framer-motion"

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
            
            await setTrendingCoins(trending.coins)
            await setTrendingCats(trending.categories)
            await settrendingNFTs(trending.nfts)
            
            
        }catch(e) {console.error(e)}
    }

    return (
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
                    whileInView={{ opacity: 1, y: 0, transition: { delay: 0.2, duration: 1 } }}
                    viewport={{ once: true, amount: 1 }}
                    className="centerText"
                >
                    <h1>Entra nella nuova era della finanza con <span style={{ color: "#32CD32", }}>BlockVision</span> <br />Tecnologia all'<span style={{ color: "#32CD32", textDecoration: "underline", textUnderlineOffset: "2" }}>avanguardia</span> per il controllo totale sul tuo futuro crypto.</h1>
                    <div className="buttonDiv">
                        <a href="/crypto">
                            <motion.button
                                className="btn btn-outline-success btnHome"
                                initial={{ opacity: 0, y: 100 }}
                                whileInView={{ opacity: 1, y: 0, transition: { delay: 0.4, duration: 1 } }}
                                viewport={{ once: true, amount: 1 }}
                            >
                                Crypto
                            </motion.button>
                        </a>

                        <a href="/crypto">
                            <motion.button
                                className="btn btn-outline-success btnHome"
                                initial={{ opacity: 0, y: 100 }}
                                whileInView={{ opacity: 1, y: 0, transition: { delay: 0.6, duration: 1 } }}
                                viewport={{ once: true, amount: 1 }}
                            >
                                NFT
                            </motion.button>
                        </a>

                        <a href="/news">
                            <motion.button
                                className="btn btn-outline-success btnHome"
                                initial={{ opacity: 0, y: 100 }}
                                whileInView={{ opacity: 1, y: 0, transition: { delay: 0.8, duration: 1 } }}
                                viewport={{ once: true, amount: 1 }}
                            >
                                News
                            </motion.button>
                        </a>
                    </div>
                </motion.div>
            </motion.div>
            <motion.div className='trending maxHeigh'>
                <div className="titleDiv"><h1>Tendenze Cripto: Monete, Categorie e NFT del Momento</h1></div>
                <div className="trendingDiv">
                    <div className="catTitle flex-horCenter"><h2>Categorie :</h2></div>
                    <div className="trendingCat">
                        
                        <div className="grid-container">
                            {trendingCats.map((cat, index) => (
                                <div className="card" key={index}>
                                    <div className="card-body">
                                        <h5 className="card-title">{cat.name}</h5>
                                        <h6 className="sub">{cat.slug}</h6>
                                        <p className="card-text">
                                            <ul>
                                                <li>Variazione 1h: {cat.market_cap_1h_change}</li>
                                                <li>Market Cap: {cat.data.market_cap}</li>
                                                <li>Volume Totale: {cat.data.total_volume}</li>
                                            </ul>
                                        </p>
                                        <a href="#" className="btn btn-primary">
                                            Scopri di più
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="trendingCoins"></div>
                    <div className="trendingNFT"></div>
                </div>
            </motion.div>
        </div>
    )
}

export default HomePage