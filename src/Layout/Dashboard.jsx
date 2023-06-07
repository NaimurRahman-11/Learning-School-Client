import { Link, Outlet } from "react-router-dom";
import logo from '../assets/logo.png';



const Dashboard = () => {
    return (
        <div className="d-flex ">
        {/* Sidebar */}
        <div className="bg-light border-right p-4" id="sidebar">
                <div className="sidebar-heading d-flex align-items-center">
                    <img src={logo} alt="" style={{ height: '100px', width: '100px' }} />
            <h2>Learning School</h2>
          </div>
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                <i className="bi bi-speedometer2 me-2"></i> User Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/users" className="nav-link">
                <i className="bi bi-people me-2"></i> Users
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/products" className="nav-link">
                <i className="bi bi-basket2 me-2"></i> Products
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/orders" className="nav-link">
                <i className="bi bi-file-earmark-text me-2"></i> Orders
              </Link>
            </li>
          </ul>
        </div>
  
        {/* Content */}
        <div className="flex-grow-1 p-3">
          <h1>Welcome to the Admin Dashboard</h1>
          {/* Other content goes here */}
          <Outlet></Outlet>
        </div>
      </div>
    );
};

export default Dashboard;