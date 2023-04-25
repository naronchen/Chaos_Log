import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TaskPage from './page/TaskPage/TaskPage';
import AIAgent from './page/AIagent/AIAgent';
import HabitPage from './page/HabitPage/HabitPage';
import PrivateRoute from './PrivateRoute';
import CommunityPage from './page/CommunityPage/CommunityPage';
import NewPost from './page/NewPostPage/NewPost';
import MyPost from './page/MyPostPage/MyPost';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route
        path="/task/:taskid"
        element={
          <PrivateRoute>
            <TaskPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/agent"
        element={
          <PrivateRoute>
            <AIAgent />
          </PrivateRoute>
        }
      />
      <Route
        path="/habit"
        element={
          <PrivateRoute>
            <HabitPage />
          </PrivateRoute>
        }
      />

      <Route
        path="/community"
        element={
          <PrivateRoute>
            < CommunityPage/>
          </PrivateRoute>
        }
      />

      <Route
        path="/newpost"
        element={
          <PrivateRoute>
            < NewPost/>
          </PrivateRoute>
        }
      />

      <Route
        path="/mypost"
        element={
          <PrivateRoute>
            < MyPost/>
          </PrivateRoute>
        }
      />

    </Routes>
  </BrowserRouter>
);
