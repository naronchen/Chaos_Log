import NewTasks from "./NewTask";
import CurrentTasks from "./CurrentTasks";
import { useState, useEffect } from "react";
import Navbar from '../Navbar'

import MainContainer from "../MainContainer";


function Tasks() {
    const [currentTasks, setCurrentTasks] = useState([]);

    const handleNewTaskSubmit = (newTask) => {
      setCurrentTasks([...currentTasks, newTask]);
    }
    return (
        <MainContainer>
            <Navbar />
            <CurrentTasks currentTasks = {currentTasks}/>
        </MainContainer>
       
    )
}

export default Tasks 