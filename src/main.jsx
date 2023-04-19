import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import { BrowserRouter, Route, Routes } from "react-router-dom";
import TaskPage from './page/TaskPage/TaskPage';


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
        <Route path="/" element={<App />} />
        <Route path="/task/:taskid" element={<TaskPage />} />
    </Routes>
</BrowserRouter>
)
