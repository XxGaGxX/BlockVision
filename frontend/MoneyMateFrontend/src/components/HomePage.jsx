import "./HomePage.css"
import ScrambleHover from "../animations/scramble"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import backgroundImage from "../assets/backgroundSito2.jpg"

function HomePage() {
    const [startAnimation, setStartAnimation] = useState(false);

    useEffect(() => {
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
            <motion.div
                className="BlackDiv"
            >
                <motion.div
                    initial={{ opacity: 0, y: 75 }}
                    whileInView={{ opacity: 1, y: 0, transition: { delay: 0.2, duration: 1 } }}
                    viewport={{ once: false, amount: 1 }}
                    className="centerText"
                >
                    <h1>Entra nella nuova era della finanza con BlockVision <br />Tecnologia all'avanguardia per il controllo totale sul tuo futuro crypto.</h1>
                    <div className="buttonDiv">
                        <motion.button
                            className="btn btn-outline-success btnHome"
                            whileHover={{ scale : 1.1}}
                            initial={{ opacity: 0, y: 100 }}
                            whileInView={{ opacity: 1, y: 0, transition: { delay: 0.4, duration: 1 } }}
                            viewport={{ once: true, amount: 1 }}
                        >
                            Crypto
                        </motion.button>
                        <motion.button
                            className="btn btn-outline-success btnHome"
                            whileHover={{ scale: 1.1 }}
                            initial={{ opacity: 0, y: 100 }}
                            whileInView={{ opacity: 1, y: 0, transition: { delay: 0.4, duration: 1 } }}
                            viewport={{ once: true, amount: 1 }}
                        >
                            News
                        </motion.button>
                    </div>

                </motion.div>
            </motion.div>
        </div>
    )
}

export default HomePage