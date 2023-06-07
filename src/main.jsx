import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Main from './Layout/Main.jsx';
import HomePage from './components/HomePage/HomePage';
import AuthProvider from './Providers/AuthProvider';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Dashboard from './Layout/Dashboard';
import UserDash from './components/Dashboard/UserDash/UserDash';





const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    
    children: [
    
      {
        path: "/",
        element: <HomePage></HomePage>,
        
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      }
    
      
    ]
  },


  {
    path: "dashboard",
    element: <Dashboard></Dashboard>,

    children: [
      {
        path: "user",
        element: <UserDash></UserDash> 
      }
    ]
  },
]);



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);