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