import { Link, Outlet } from "react-router-dom";
import logo from '../assets/logo.png';
import useAdmin from "../components/hooks/useAdmin";
import useInstructor from "../components/hooks/useInstructor";
import { FaBookmark, FaEdit, FaHistory, FaHouseUser, FaUsers } from "react-icons/fa";
import { AiFillFileAdd, AiFillHome } from "react-icons/ai";
import { GiMoneyStack, GiNotebook } from "react-icons/gi";





const Dashboard = () => {

  // const isAdmin = true;

  const [isAdmin] = useAdmin();
  const [isInstructor] = useInstructor();




  const renderAdminMenu = () => (
    <>
      <li className="nav-item">
        <Link to="/dashboard/user" className="nav-link">
        <FaHouseUser className="me-2"></FaHouseUser> Admin Home
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/dashboard/allusers" className="nav-link">
         <FaUsers className="me-2"></FaUsers> Manage Users
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/dashboard/manageclasses" className="nav-link">
         <FaEdit className="me-2"></FaEdit> Manage Classes
        </Link>
      </li>
    </>
  );



  const renderInstructorMenu = () => (
    <>
      <li className="nav-item">
        <Link to="/dashboard/user" className="nav-link">
        <FaHouseUser className="me-2"></FaHouseUser> Instructor Home
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/dashboard/myclasses" className="nav-link">
        <GiNotebook className="me-2"></GiNotebook>  My Classes
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/dashboard/addclass" className="nav-link">
         <AiFillFileAdd className="me-2"></AiFillFileAdd> Add a Class
        </Link>
      </li>
    </>
  );



  const renderStudentMenu = () => (
    <>
      <li className="nav-item">
        <Link to="/dashboard/user" className="nav-link">
          <FaHouseUser className="me-2"></FaHouseUser> User Home
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/dashboard/selected-classes" className="nav-link">
          <GiNotebook className="me-2"></GiNotebook> My Selected Classes
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/dashboard/enrolled-classes" className="nav-link">
          <FaBookmark className="me-2"></FaBookmark> My Enrolled Classes
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/dashboard/payment" className="nav-link">
          <GiMoneyStack className="me-2"></GiMoneyStack> Payment
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/dashboard/payment-history" className="nav-link">
          <FaHistory className="me-2"></FaHistory> Payment History
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
              <AiFillHome className="me-2"></AiFillHome> Home
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