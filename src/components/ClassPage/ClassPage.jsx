import { useQuery } from "@tanstack/react-query";
import useAdmin from "../hooks/useAdmin";
import useInstructor from "../hooks/useInstructor";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";





const ClassPage = () => {



    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [isAdmin, isAdminLoading] = useAdmin();
    const [isInstructor, isInstructorLoading] = useInstructor();

    const { data: approvedClasses = [] } = useQuery(['approved-classes'], async () => {
        const res = await fetch('http://localhost:5000/approved-classes')
        return res.json();
    })


    if (isAdminLoading || isInstructorLoading) {
        // Display loading state if any of the data is still loading
        return <div>Loading...</div>;
    }


    const handleViewDetails = () => {
        if (!user) {

            Swal.fire({
                title: 'Please log in',
                text: 'You need to be logged in to view the details.',
                icon: 'warning',
                showCancelButton: false,
                confirmButtonText: 'OK',
            });
            navigate('/login');
        } else {
            // User is present, do nothing or perform desired actions
        }
    };


    return (
        <div>
            <h1>Total Classes: {approvedClasses.length}</h1>

            <div className="container">
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr >
                                <th scope="col">#</th>
                                <th scope="col">Image</th>
                                <th scope="col">Class Name</th>
                                <th scope="col">Instructor Name</th>
                                <th scope="col">Available Seats</th>

                                <th scope="col">Price</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {approvedClasses.map((classes, index) => (

                                <tr key={classes._id} >
                                    <td className={parseInt(classes.availableSeats) === 0 ? 'bg-danger' : ''}>
                                        {index + 1}
                                    </td>
                                    <td className={parseInt(classes.availableSeats) === 0 ? 'bg-danger' : ''}>
                                        <img src={classes.classPhotoURL} alt="" className="img-fluid" style={{ objectFit: "contain", height: "130px" }} />
                                    </td>
                                    <td className={parseInt(classes.availableSeats) === 0 ? 'bg-danger' : ''}>{classes.className}</td>
                                    <td className={parseInt(classes.availableSeats) === 0 ? 'bg-danger' : ''}>{classes.instructorName}</td>
                                    <td className={parseInt(classes.availableSeats) === 0 ? 'bg-danger' : ''}>{classes.availableSeats}</td>
                                    <td className={parseInt(classes.availableSeats) === 0 ? 'bg-danger' : ''}>{classes.price}</td>
                                    <td className={parseInt(classes.availableSeats) === 0 ? 'bg-danger' : ''}>




                                        {isAdmin || isInstructor ? (
                                            <button
                                                onClick={() => handleViewDetails(classes._id)}
                                                className="btn btn-warning"
                                                disabled={classes.availableSeats === "0" || isAdmin || isInstructor}
                                            >
                                                View Details
                                            </button>
                                        ) : (
                                            <Link to={`/view-details/${classes._id}`}>
                                                <button
                                                    onClick={() => handleViewDetails(classes._id)}
                                                    className="btn btn-warning"
                                                    disabled={classes.availableSeats === "0" || isAdmin || isInstructor}
                                                >
                                                    View Details
                                                </button>
                                            </Link>
                                        )}


                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ClassPage;