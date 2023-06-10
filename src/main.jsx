import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Main from './Layout/Main.jsx';
import HomePage from './components/HomePage/Home/HomePage';
import AuthProvider from './Providers/AuthProvider';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Dashboard from './Layout/Dashboard';
import UserDash from './components/Dashboard/UserDash/UserDash';
import AllUsers from './components/Dashboard/allUsers/allUsers';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import AddClass from './components/Dashboard/addClass/addClass';
import MyClasses from './components/Dashboard/MyClasses/MyClasses';
import ManageClasses from './components/Dashboard/ManageClasses/ManageClasses';
import ClassPage from './components/ClassPage/ClassPage';
import ViewDetails from './components/ViewDetails/ViewDetails';
import PrivateRoute from './Routes/PrivateRoute';
import Instructors from './components/Instructors/Instructors';
import SelectedClasses from './components/Dashboard/SelectedClasses/SelectedClasses';
import ErrorPage from './components/ErrorPage/error-page';
import Payment from './components/Dashboard/Payment/Payment';




const queryClient = new QueryClient()






const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage></ErrorPage>,

    children: [

      {
        path: "/",
        element: <HomePage></HomePage>,
        errorElement: <ErrorPage></ErrorPage>,

      },
      {
        path: "/login",
        element: <Login></Login>,
        errorElement: <ErrorPage></ErrorPage>,
      },
      {
        path: "/register",
        element: <Register></Register>,
        errorElement: <ErrorPage></ErrorPage>,
      },
      {
        path: "/classes",
        element: <ClassPage></ClassPage>,
        errorElement: <ErrorPage></ErrorPage>,
      },
      {
        path: "/view-details/:id",
        element: <PrivateRoute><ViewDetails></ViewDetails></PrivateRoute>,
        errorElement: <ErrorPage></ErrorPage>,
      },
      
      {
        path: "/instructors",
        element: <Instructors></Instructors>,
        errorElement: <ErrorPage></ErrorPage>,
      }


    ]
  },


  {
    path: "dashboard",
    element: <Dashboard></Dashboard>,
    errorElement: <ErrorPage></ErrorPage>,

    children: [
      {
        path: "user",
        element: <UserDash></UserDash>,
        errorElement: <ErrorPage></ErrorPage>,
      },
      {
        path: "allusers",
        element: <AllUsers></AllUsers>,
        errorElement: <ErrorPage></ErrorPage>,
      },
      {
        path: "addclass",
        element: <AddClass></AddClass>,
        errorElement: <ErrorPage></ErrorPage>,
      },
      {
        path: "myclasses",
        element: <MyClasses></MyClasses>,
        errorElement: <ErrorPage></ErrorPage>,
      },
      {
        path: "manageclasses",
        element: <ManageClasses></ManageClasses>,
        errorElement: <ErrorPage></ErrorPage>,
      },
      {
        path: "selected-classes",
        element: <SelectedClasses></SelectedClasses>,
        errorElement: <ErrorPage></ErrorPage>,
      },
      {
        path: "payment",
        element: <Payment></Payment>,
        errorElement: <ErrorPage></ErrorPage>,
      }

    ]
  },
]);



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>

    </AuthProvider>
  </React.StrictMode>
);