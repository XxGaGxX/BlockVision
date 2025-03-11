import "./HomePage.css"
import ScrambleHover from "../animations/scramble"

function HomePage(){
    return (
        <div className="HomePageDiv1">
            <ScrambleHover
                text={'il mio nome e diego vagnini'}
                scrambleSpeed={40}
                sequential={true}
                revealDirection="start"
                useOriginalCharsOnly={false}
                className="font-azeretMono"
                characters="abcdefghijklmnopqrstuvwxyz!@#$%^&*()_+-=[]{}|;':\,./<>?"
            />
        </div>
        
    )
   
}

export default HomePage