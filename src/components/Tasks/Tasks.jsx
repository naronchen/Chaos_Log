import NewTasks from "./NewTask";
import CurrentTasks from "./CurrentTasks";
import { useState, useEffect } from "react";


function Tasks() {
    const [currentTasks, setCurrentTasks] = useState([]);

    const handleNewTaskSubmit = (newTask) => {
      setCurrentTasks([...currentTasks, newTask]);
    }
    return (
        <div> 
            {/* <NewTasks onSubmit = {handleNewTaskSubmit}/> */}
            <CurrentTasks currentTasks = {currentTasks}/>
        </div>
       
    )
}

export default Tasks 