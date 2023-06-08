import { Link, Outlet } from "react-router-dom";
import logo from '../assets/logo.png';
import useAdmin from "../components/hooks/useAdmin";
import useInstructor from "../components/hooks/useInstructor";




const Dashboard = () => {

  // const isAdmin = true;

  const [isAdmin] = useAdmin();
  const [isInstructor] = useInstructor();




  const renderAdminMenu = () => (
    <>
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
        <Link to="/dashboard/manageclasses" className="nav-link">
          <i className="bi bi-basket2 me-2"></i> Manage Classes
        </Link>
      </li>
    </>
  );



  const renderInstructorMenu = () => (
    <>
      <li className="nav-item">
        <Link to="/dashboard" className="nav-link">
          <i className="bi bi-speedometer2 me-2"></i> Instructor Home
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/dashboard/myclasses" className="nav-link">
          <i className="bi bi-people me-2"></i> My Classes
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/dashboard/addclass" className="nav-link">
          <i className="bi bi-people me-2"></i> Add a Class
        </Link>
      </li>
    </>
  );



  const renderStudentMenu = () => (
    <>
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
  );


  return (





    <div className="d-flex ">
      {/* Sidebar */}
      <div className="bg-light border-right p-4" id="sidebar">
        <div className="sidebar-heading d-flex align-items-center">
          <img src={logo} alt="" style={{ height: '100px', width: '100px' }} />
          <h2>Learning School</h2>
        </div>
        <ul className="nav flex-column">

          {isAdmin ? renderAdminMenu() : isInstructor ? renderInstructorMenu() : renderStudentMenu()}

          <hr />

          <li className="nav-item">
        <Link to="/" className="nav-link">
          <i className="bi bi-people me-2"></i> Home
        </Link>
      </li>



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