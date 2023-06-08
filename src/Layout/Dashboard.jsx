import { Link, Outlet } from "react-router-dom";
import logo from '../assets/logo.png';
import useAdmin from "../components/hooks/useAdmin";



const Dashboard = () => {

  // const isAdmin = true;

  const [isAdmin] = useAdmin();

  return (





    <div className="d-flex ">
      {/* Sidebar */}
      <div className="bg-light border-right p-4" id="sidebar">
        <div className="sidebar-heading d-flex align-items-center">
          <img src={logo} alt="" style={{ height: '100px', width: '100px' }} />
          <h2>Learning School</h2>
        </div>
        <ul className="nav flex-column">


          {
            isAdmin ? <>
              <li className="nav-item">
                <Link to="/dashboard" className="nav-link">
                  <i className="bi bi-speedometer2 me-2"></i> Admin Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/dashboard/allusers" className="nav-link">
                  <i className="bi bi-people me-2"></i> Manage Users
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/products" className="nav-link">
                  <i className="bi bi-basket2 me-2"></i> Manage Classes
                </Link>
              </li>
              
            </> : <>
                
              <li className="nav-item">
                <Link to="/dashboard" className="nav-link">
                  <i className="bi bi-speedometer2 me-2"></i> User Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/dashboard/allusers" className="nav-link">
                  <i className="bi bi-people me-2"></i> My Selected Classes
                </Link>
                </li>
                <li className="nav-item">
                <Link to="/dashboard/allusers" className="nav-link">
                  <i className="bi bi-people me-2"></i> My Enrolled Classes
                </Link>
                </li>
                <li className="nav-item">
                <Link to="/dashboard/allusers" className="nav-link">
                  <i className="bi bi-people me-2"></i> Payment
                </Link>
              </li>

            </>
          }


        </ul>
      </div>

      {/* Content */}
      <div className="flex-grow-1 p-3">

        {/* Other content goes here */}
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;