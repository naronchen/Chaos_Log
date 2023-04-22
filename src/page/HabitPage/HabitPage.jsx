
import Navbar from "../../components/Navbar"
import MainContainer from "../../components/MainContainer"
import ScoreBoard from "../../components/Habits/ScoreBoard"


function HabitPage(){
    return (
        <div>
            <Navbar />
            <MainContainer>
                <h1>Habit Page</h1>
                <ScoreBoard />
            </MainContainer>
        </div>
    )
}

export default HabitPage