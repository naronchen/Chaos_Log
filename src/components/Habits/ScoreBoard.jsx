import { useState, useEffect } from "react"
import "./ScoreBoard.css"
import { useUser } from "../../hooks/useUser"
import { supabase } from "../../client"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faStar } from '@fortawesome/free-solid-svg-icons';


function ScoreBoard(){
    const [habits, setHabits] = useState([])

    const userId = useUser()

    const handleOnClick = () => {
        // console.log("clicked")
        const newHabit = {content: "", value: 'neu', strikes: [false, false, false, false, false, false, false]}
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

    async function submitHabits(userId, habits) {
        // Check if the user already has a habit record
        if (!userId) {
            return;
        }
        const { data: habitData, error } = await supabase
            .from("habits")
            .select("*")
            .eq("user_id", userId);
        
        if (error) {
            console.error(error);
            return;
        }
        
        // If the user has a habit record, update it
        if (habitData.length === 1) {
            // console.log("updating habit record");
            const { data, error } = await supabase
            .from("habits")
            .update({ habits })
            .eq("user_id", userId);
        
            if (error) {
            console.error(error);
            return;
            }
        
            // console.log("updated habit record:", data);
        }
        // If the user does not have a habit record, create a new one
        else {
            console.log("creating new habit record");
            const { data, error } = await supabase
            .from("habits")
            .insert({ user_id: userId, habits });
        
            if (error) {
            console.error(error);
            return;
            }
            // console.log("Created new habit record:", data);
        }
        }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(habits);

        await submitHabits(userId, habits);
    };
    
    useEffect(() => {
        const fetchHabits = async () => {
          if (!userId) {
            return;
          }
          const { data, error } = await supabase
            .from("habits")
            .select("*")
            .eq("user_id", userId);
          if (error) {
            console.error(error);
            return;
          }
          if (data.length > 0) {
            setHabits(data[0].habits);
          }
        };
        fetchHabits();

      }, [userId]);
      
      useEffect(() => {

        return () => {
          submitHabits(userId, habits);
        };
      }, [habits]);

      const handleDelete = (e) => {
        const updatedHabits = [...habits];
        // console.log(e.currentTarget.id); // You can access the id attribute now
        updatedHabits.splice(e.currentTarget.id, 1);
        setHabits(updatedHabits);
    }

    const handleLight = (e, index) => {
        const updatedHabits = [...habits];
        // console.log(e.currentTarget.id); // You can access the id attribute now
        // console.log("overall index", index)
        updatedHabits[index].strikes[e.currentTarget.id] = !updatedHabits[index].strikes[e.currentTarget.id];
        // console.log('updatedHabits[index].strikes[e.currentTarget.id]: ', updatedHabits[index].strikes[e.currentTarget.id]);
        setHabits(updatedHabits);

        // console.log("setup done")
    }
    
    return (
        <div className="scoreboard">
            <div className="scoreboard__header">
                <span>
                    <h2>Habits Scoreboard & Tracker</h2>
                </span>
            </div>
            <div className="scoreboard__body">
            {
                habits.map((habit, index) => {
                    return (
                        <div key={index}>
                        <div className="scoreboard-input" key={index + 'scoreboard'}>
                            <input
                                type="text"
                                id={index}
                                value={habit.content}
                                onChange={handleObjectiveChange}
                                style={{
                                    borderBottom:
                                      habit.value === 'neg'
                                        ? '1px solid #fbbf77'
                                        : habit.value === 'pos'
                                        ? '1px solid lightgreen'
                                        : '1px solid #fff',
                                  }}

                                  //ff9e3d
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

                            <FontAwesomeIcon 
                                className="scoreboard-delete"
                                id={index}
                                onClick={(e) => handleDelete(e)} 
                                icon={faTrash} 
                            />

                        </div>
                        {/* probably more generic code here later? */}
                        {habit?.value === 'neg' ? (
                            <div className="checkbox-row">
                                {habit.strikes?.map((strike, starIndex) => {
                                return (
                                    <div key={starIndex + 'checkbox'}>
                                    <FontAwesomeIcon
                                        style={{
                                        color: strike === true ? 'orange' : 'white',
                                        }}
                                        icon={faStar}
                                        id = {starIndex}
                                        onClick={(e) => handleLight(e, index)}
                                    />
                                    </div>
                                );
                                })}
                            </div>
                            ) : null}

                        {habit?.value === 'pos' ? (
                            <div className="checkbox-row">
                                {habit.strikes?.map((strike, starIndex) => {
                                return (
                                    <div key={starIndex + 'checkbox'}>
                                    <FontAwesomeIcon
                                        style={{
                                        color: strike === true ? 'lightgreen' : 'white',
                                        }}
                                        icon={faStar}
                                        id = {starIndex}
                                        onClick={(e) => handleLight(e, index)}
                                    />
                                    </div>
                                );
                                })}
                            </div>
                            ) : null}
                        </div>
                    )
                }
                )
            }
            </div>
            
            <div className="scoreboard-btn">
                <button onClick={handleOnClick}> + </button>
                {/* <button onClick={handleSubmit}> Submit </button> */}
            </div>
        </div>
    )
}

export default ScoreBoard