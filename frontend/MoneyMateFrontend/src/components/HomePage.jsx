import "./HomePage.css"
import ScrambleHover from "../animations/scramble"

function HomePage(){
    return (
        <div className="bigDiv">
            <div className="HomePageDiv">
                <ScrambleHover
                    text={'Block Vision'}
                    scrambleSpeed={40}
                    sequential={true}
                    revealDirection="start"
                    useOriginalCharsOnly={false}
                    className="font-azeretMono text1"
                    characters="abcdefghijklmnopqrstuvwxyz!@#$%^&*()_+-=[]{}|;':\,./<>?"
                />
            </div>
            <div className="BlackDiv"></div>
        </div>
        
    )
   
}

export default HomePage