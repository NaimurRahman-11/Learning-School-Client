import { Link } from "react-router-dom";
import "./Navbar.css";
import { useContext } from "react";

import { FaUserCircle } from "react-icons/fa";
import { AuthContext } from "../../Providers/AuthProvider";
import logo from '../../assets/logo.png';


const Navbar = () => {


    const { user, logOut } = useContext(AuthContext);
    console.log("navbar", user)
    const handleLogOut = () => {
        logOut()
            .then()
            .catch(error => console.log(error));
    }

    return (
        <div className="container shadow rounded ">
            <div>
                <nav className="navbar navbar-expand-lg">
                    <div className="container-fluid">
                        <Link to="/" className="navbar-brand"><img src={logo} alt="" className='logo' /><b>Learning School</b></Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav p-2 mx-auto mb-2 mb-lg-0">
                                <li className='nav-item me-3'>
                                    <Link to='/' className="nav-link ">Home</Link>
                                </li>
                                <li className='nav-item me-3'>
                                    <Link to='/instructors' className="nav-link ">Instructors</Link>
                                </li>
                                <li className='nav-item me-3'>
                                    <Link to='/classes' className="nav-link ">Classes</Link>
                                </li>

                                {user && (
                                    <>
                                        <li className="nav-item me-3">
                                            <Link to="/dashboard" className="nav-link">
                                                Dashboard
                                            </Link>
                                        </li>
                                       
                                    </>
                                )}

                            </ul>
                            <div>



                            </div>


                            {user ? user.photoURL ?
                                <img src={user.photoURL} alt="" className='photoURL rounded-circle me-3' style={{ width: "40px", height: "40px" }} data-bs-toggle="tooltip" data-bs-placement="bottom" title={user.displayName} />
                                : <FaUserCircle className='me-3 rounded-circle' style={{ width: "40px", height: "40px" }} data-bs-toggle="tooltip" data-bs-placement="bottom" title={user.email}></FaUserCircle> : null}


                            {user ?
                                <Link to=""><button onClick={handleLogOut} className="btn btn-outline-warning" type="submit">Log Out</button></Link> :
                                <Link to="/login"><button className="btn primaryBtn" type="submit">Login</button></Link>}
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default Navbar;