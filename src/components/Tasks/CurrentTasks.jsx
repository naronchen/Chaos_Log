
import { supabase } from '../../client'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './CurrentTasks.css'
import TaskData from './TaskData'
import NewTasks from './NewTask'

function CurrentTasks() {
    const [tasks, setTasks] = useState([])

    const fetchTasks = async () => {
      const { data, error } = await supabase.from('tasks')
                                              .select()
      if (error) { console.log(error)} 
      else { 
          
          // console.log("data:", data)
          setTasks(data)}
  }

    useEffect(() => {
        fetchTasks()
    }, [])
    
    const subtractDate = (date) => {
        const today = new Date()
        const taskDate = new Date(date)
        const diff = taskDate.getTime() - today.getTime()
        const diffDays = Math.ceil(diff / (1000 * 3600 * 24))
        const formattedDeadline = taskDate.toLocaleDateString(); // Get formatted date string
        if (diffDays === 0) {
            return `🔥`;  
        } else if (diffDays === 1) {
            return `👾`; 
          } else if (diffDays > 1) {
            return `⭐`; 
          } else {
            return `👺`; 
          }
    }

    const renderTasks = (tasks, condition) => {
        return (
          <>
            <div>
              {tasks.map((task) => {
                if (condition(task)) {
                  return (
                    <Link
                      key={task.id}
                      to={`/task/${task.id}`}
                      className="task-card"
                      style={{ borderLeftColor: task.color }}
                    >
                      <span className="task-content">{task.content}</span>
                      <span className="task-deadline">{subtractDate(task.deadline)}</span>
                    </Link>
                  );
                }
                return null; // Render nothing for other cases
              })}
            </div>
          </>
        );
      };

      const handleNewDay = async () => {
        // delete everything finished: true
        // console.log("new day")
        const { data, error } = await supabase.from('tasks')
                                              .delete()
                                              .match({finished: true})
        // console.log("newday finished")
        if (error) { console.log(error)}
        else { 
          fetchTasks()
          // console.log("data:", data)
        }
      }


    return (
        <div> 
            <div className = "first-line">
              <NewTasks onSubmit={fetchTasks}/>
              <TaskData tasks={tasks}/>
              <div className="newday-container">
                <button className="expand-btn" onClick={handleNewDay}> New Day</button>   
              </div>
            </div>
            <div className="task-sections">
                <div className="the-section">
                    <h3>Tasks in Queue</h3>
                    {renderTasks(tasks, (task) => !task.inprogress && !task.finished)}
                </div>

                <div className="the-section-2">
                    <h3>Tasks in Progress</h3>
                    {renderTasks(tasks, (task) => task.inprogress)}
                </div>
                <div className="the-section">
                    <h3>Tasks Completed</h3>
                    {renderTasks(tasks, (task) => task.finished)}
                </div>
            </div>

        </div>
       
    )
}

export default CurrentTasks 