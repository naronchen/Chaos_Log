import React, { useState } from "react";
import { supabase } from '../../client';
import { useUser } from '../../hooks/useUser';
import './NewTask.css';

function NewTasks({ onSubmit }) {
  const userId = useUser();

  const [formData, setFormData] = useState({
    color: "",
    content: "",
    deadline: "",
    user_id: null
  });
  const [expanded, setExpanded] = useState(false); // State to track form expansion
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const deadline = new Date(formData.deadline);
    const updatedDeadline = deadline.toISOString().slice(0, 16);

    const updatedFormData = { ...formData, deadline: updatedDeadline, user_id: userId };
    console.log(updatedFormData)
    await supabase.from('tasks').insert(updatedFormData).select();
    onSubmit(); 
    setExpanded(false); // Reset form expansion state
  };
  

  const toggleForm = () => {
    setExpanded(!expanded); // Toggle form expansion state
  };

  return (
    <div className="new-task-container" >
      {expanded ? ( // Conditionally render form based on expanded state
        
        <form id="new-task-form" onSubmit={handleSubmit}>
            <h2>New Task 🍉 </h2>
          <label>
            Color:
            <select
              name="color"
              value={formData.color}
              onChange={handleInputChange}
            >
              <option value=""></option>
              <option value="red">red - urgent! 🚑 </option>
              <option value="yellow">yellow - better not procrastinate 🌇 </option>
              <option value="blue">Blue - take your time 🏖 </option>
            </select>
          </label>

          <label>
            Deadline:
            <input
              type="datetime-local"
              name="deadline"
              value={formData.deadline}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Content:
            <input
              type="text"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <div className = "btn-class">
            <button className="expand-btn" onClick={toggleForm}>
                Cancel
            </button>
            <button id="submit-btn">Submit</button>
          </div>
          
        </form>
    
      ):
      ( 
        <div>
            <span>
                {/* <h2 style={{ display: 'inline', margin: '0' }}>Task Manager 🚀</h2> */}
                <button className="expand-btn" onClick={toggleForm}>
                New Task
                </button>

            </span>
            <br />

         </div>


    
    
          
  )}
    </div>
  );
}

export default NewTasks;
