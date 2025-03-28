import React from 'react'
import "./HomePage.css"
import ScrambleHover from "../animations/scramble"
import { motion } from "framer-motion"

function HomePage() {
    const [startAnimation, setStartAnimation] = React.useState(false);

    React.useEffect(() => {
        setStartAnimation(true);
    }, []);

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
                    viewport={{ once: false, amount: 1 }}
                    className="centerText"
                >
                    <h1>Entra nella nuova era della finanza con <span style={{ color: "#32CD32", }}>BlockVision</span> <br />Tecnologia all'<span style={{ color: "#32CD32", textDecoration: "underline", textUnderlineOffset: "2" }}>avanguardia</span> per il controllo totale sul tuo futuro crypto.</h1>
                    <div className="buttonDiv">
                        <a href="/crypto">
                            <motion.button
                                className="btn btn-outline-success btnHome"
                                initial={{ opacity: 0, y: 100 }}
                                whileInView={{ opacity: 1, y: 0, transition: { delay: 0.4, duration: 1 } }}
                                viewport={{ once: false, amount: 1 }}
                            >
                                Crypto
                            </motion.button>
                        </a>

                        <a href="/crypto">
                            <motion.button
                                className="btn btn-outline-success btnHome"
                                initial={{ opacity: 0, y: 100 }}
                                whileInView={{ opacity: 1, y: 0, transition: { delay: 0.6, duration: 1 } }}
                                viewport={{ once: false, amount: 1 }}
                            >
                                NFT
                            </motion.button>
                        </a>

                        <a href="/news">
                            <motion.button
                                className="btn btn-outline-success btnHome"
                                initial={{ opacity: 0, y: 100 }}
                                whileInView={{ opacity: 1, y: 0, transition: { delay: 0.8, duration: 1 } }}
                                viewport={{ once: false, amount: 1 }}
                            >
                                News
                            </motion.button>
                        </a>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    )
}

export default HomePage