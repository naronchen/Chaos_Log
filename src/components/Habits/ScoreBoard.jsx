import { useState } from "react"
import "./ScoreBoard.css"
import { useUser } from "../../hooks/useUser"
import { supabase } from "../../client"

function ScoreBoard(){
    const [habits, setHabits] = useState([])

    const userId = useUser()

    const handleOnClick = () => {
        // console.log("clicked")
        const newHabit = {content: "", value: 'neu'}
        //create an empty card for user input
        setHabits([...habits, newHabit])
    }

    const handleObjectiveChange = (e) => {
        const updatedHabits = [...habits];
        updatedHabits[e.target.id].content = e.target.value;
        setHabits(updatedHabits);
      };
    
    const handleScoreChange = (e) => {
        const updatedHabits = [...habits];
        updatedHabits[e.target.id].value = e.target.value;
        setHabits(updatedHabits);
        };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(habits);

        // Check if the user already has a habit record
        const { data: habitData, error } = await supabase
            .from("habits")
            .select("*")
            .eq("user_id", userId)

        if (error) {
            console.error(error);
            return;
        }
        console.log('habitData: ', habitData);
        // If the user has a habit record, update it
        if (habitData.length === 1) {
            console.log("updating habit record")
            const { data, error } = await supabase
                .from("habits")
                .update({ habits })
                .eq("user_id", userId);

            if (error) {
                console.error(error);
                return;
            }

            console.log("updated habit record:", data);
        }
        // If the user does not have a habit record, create a new one
        else {
            console.log("creating new habit record")
            const { data, error } = await supabase
                .from("habits")
                .insert({ user_id: userId, habits });

            if (error) {
                console.error(error);
                return;
            }

            console.log("Created new habit record:", data);
        }
    };
    

    return (
        <div className="scoreboard">
            <div className="scoreboard__header">
                <span>
                    <h2>Scoreboard</h2>
                </span>
            </div>
            <div className="scoreboard__body">
            {
                habits.map((habit, index) => {
                    return (
                        <div className="scoreboard-input" key={index}>
                            <input
                                type="text"
                                id={index}
                                value={habit.content}
                                onChange={handleObjectiveChange}
                            >
                            </input>
                            <select name="score" 
                                    id={index}
                                    value={habit.value} 
                                    onChange={handleScoreChange}
                                    className="scoreboard-select"
                                    >
                                <option value="pos">+</option>
                                <option value="neg">-</option>
                                <option value="neu">=</option>
                            </select>
                        </div>
                    )
                }
                )
            }
            </div>

            <button onClick={handleOnClick}> + </button>
            <button onClick={handleSubmit}> Submit </button>

        </div>
    )
}

export default ScoreBoard