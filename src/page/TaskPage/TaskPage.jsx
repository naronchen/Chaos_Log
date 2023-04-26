import { useParams } from 'react-router-dom'
import {supabase} from '../../client'
import {useEffect, useState, useRef} from 'react'
import './TaskPage.css'
import Navbar from '../../components/Navbar'
import MainContainer from '../../components/MainContainer'

function TaskPage() {
    // here I update the task
    const [task, setTask] = useState({
      content: '',
      deadline: '',
      inprogress: false,
      finished: false,
      description: ''
    })
    
    let id = useParams().taskid

    const handleContentChange = (event) => {
      setTask({...task, content: event.target.value})
    }
    const handleDeadlineChange = (event) => {
      setTask({...task, deadline: event.target.value})
    }
    const handleInProgressChange = (event) => {
      setTask({...task, finished: false, inprogress: event.target.checked})
    }
    const handleCompletedChange = (event) => {
      setTask({...task, inprogress: false, finished: event.target.checked})
    }
    const handleDescriptionChange = (event) => {
      setTask({...task, description: event.target.value})
    }

    useEffect(() => {
      const fetchTask = async () => {
        const {data, error} = await supabase
          .from('tasks')
          .select('*')
          .eq('id', id)
          
        if (error) {
          console.log(error)
        } else {
          setTask(data[0])

        }
      }
      fetchTask()
    }, [id])


    const updateTask = async () => {
      try {
        // Convert deadline value to valid timestamp format
        task.deadline = new Date(task.deadline).toISOString();
    
        const { data, error } = await supabase
          .from('tasks')
          .update( task ) 
          .eq('id', id);
    
        if (error) {
          console.log(error);
        } else {
          console.log('Task updated successfully:', data);
          // alert('🚀 Task updated successfully!'); // Show success message
          window.location.href = '/';
        }
      } catch (error) {
        console.log(error);
      }
    }

    const deleteTask = async () => {
      try {
        const { error } = await supabase
          .from('tasks')
          .delete()
          .eq('id', id)
  
        if (error) {
          console.log(error)
        } else {
          console.log('Task deleted successfully')
          // alert('🗑️ Task deleted successfully!')
          window.location.href = '/'
        }
      } catch (error) {
        console.log(error)
      }
    }
    

    const addHoursToUTC = (dateString, hours) => {
      const parsedDate = Date.parse(dateString);
      if (isNaN(parsedDate)) {
        // Handle invalid date string
        return '';
      }
      const date = new Date(parsedDate);
      date.setUTCHours(date.getUTCHours() - hours);
      return date.toISOString().substring(0, 16);
    };
    

    return (
      <div>
      <Navbar />
      <MainContainer>
      <div className="task-page-container">
        <h2>Task Page 🚀</h2>
        <hr className="divider" />
        <input
          type="text"
          defaultValue={task?.content}
          onChange={handleContentChange}
          className="input-like-h3"
        />
        <br />
        <input
          type="datetime-local"
          value={task.deadline ? addHoursToUTC(task.deadline, 4) : ''}
          onChange={handleDeadlineChange}
          className="input-like-h3"
        />
        <br />


      <div style={{ textAlign: 'center' }}>
        <span >
            <label className="checkbox-label">
              <input 
                type="checkbox"
                checked={task.inprogress} // Bind "in progress" status to the checkbox
                onChange={handleInProgressChange}
              />
              <span className="checkbox-custom"></span>
              <span className="checkbox-label-text">In Progress ✈ </span>
          </label>
          <label className="checkbox-label">
            <input 
              type="checkbox"
              checked={task.finished} // Bind "completed" status to the checkbox
              onChange={handleCompletedChange}
            />
            <span className="checkbox-custom"></span>
            <span className="checkbox-label-text">Completed ! 🍺</span>
          </label>
        </span>
      </div>

      <textarea onChange={handleDescriptionChange} value={task.description}>
      </textarea>
      

        <br />
        <button onClick={updateTask} className="button-update">
          Update Task
        </button>
        <button onClick={deleteTask} className="button-delete">
          Delete Task
        </button>
      </div>
      </MainContainer>
      </div>
    )
  
    
  }
  
  export default TaskPage