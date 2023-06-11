// import { useQuery } from "@tanstack/react-query";

// import useAdmin from "../hooks/useAdmin";
// import useInstructor from "../hooks/useInstructor";
// import { Link, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import { useContext } from "react";
// import { AuthContext } from "../../Providers/AuthProvider";





// const ClassPage = () => {



//     const navigate = useNavigate();
//     const { user } = useContext(AuthContext);
//     const [isAdmin] = useAdmin();
//     const [isInstructor] = useInstructor();

//     const { data: approvedClasses = [] } = useQuery(['approved-classes'], async () => {
//         const res = await fetch('http://localhost:5000/approved-classes')
//         return res.json();
//     })


//     // if (isAdminLoading || isInstructorLoading) {
//     //     // Display loading state if any of the data is still loading
//     //     return <div>Loading...</div>;
//     // }


//     const handleViewDetails = () => {
//         if (!user) {

//             Swal.fire({
//                 title: 'Please log in',
//                 text: 'You need to be logged in to view the details.',
//                 icon: 'warning',
//                 showCancelButton: false,
//                 confirmButtonText: 'OK',
//             });
//             navigate('/login');
//         } else {
//             // User is present, do nothing or perform desired actions
//         }
//     };


//     return (
//         <div>
//             <h1>Total Classes: {approvedClasses.length}</h1>

//             <div className="container">
//                 <div className="table-responsive">
//                     <table className="table">
//                         <thead>
//                             <tr >
//                                 <th scope="col">#</th>
//                                 <th scope="col">Image</th>
//                                 <th scope="col">Class Name</th>
//                                 <th scope="col">Instructor Name</th>
//                                 <th scope="col">Available Seats</th>

//                                 <th scope="col">Price</th>
//                                 <th scope="col">Action</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {approvedClasses.map((classes, index) => (

//                                 <tr key={classes._id} >
//                                     <td className={parseInt(classes.availableSeats) === 0 ? 'bg-danger' : ''}>
//                                         {index + 1}
//                                     </td>
//                                     <td className={parseInt(classes.availableSeats) === 0 ? 'bg-danger' : ''}>
//                                         <img src={classes.classPhotoURL} alt="" className="img-fluid" style={{ objectFit: "contain", height: "130px" }} />
//                                     </td>
//                                     <td className={parseInt(classes.availableSeats) === 0 ? 'bg-danger' : ''}>{classes.className}</td>
//                                     <td className={parseInt(classes.availableSeats) === 0 ? 'bg-danger' : ''}>{classes.instructorName}</td>
//                                     <td className={parseInt(classes.availableSeats) === 0 ? 'bg-danger' : ''}>{classes.availableSeats}</td>
//                                     <td className={parseInt(classes.availableSeats) === 0 ? 'bg-danger' : ''}>{classes.price}</td>
//                                     <td className={parseInt(classes.availableSeats) === 0 ? 'bg-danger' : ''}>




//                                         {isAdmin || isInstructor ? (
//                                             <button
//                                                 onClick={() => handleViewDetails(classes._id)}
//                                                 className="btn btn-warning"
//                                                 disabled={classes.availableSeats === "0" || isAdmin || isInstructor}
//                                             >
//                                                 View Details
//                                             </button>
//                                         ) : (
//                                             <Link to={`/view-details/${classes._id}`}>
//                                                 <button
//                                                     onClick={() => handleViewDetails(classes._id)}
//                                                     className="btn btn-warning"
//                                                     disabled={classes.availableSeats === "0" || isAdmin || isInstructor}
//                                                 >
//                                                     View Details
//                                                 </button>
//                                             </Link>
//                                         )}


//                                     </td>

//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ClassPage;


import { useQuery } from "@tanstack/react-query";

import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { Fade } from "react-awesome-reveal";
import { useContext, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";



const ClassPage = () => {


    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [selectedItems, setSelectedItems] = useState([]);


    const location = useLocation();





    const { data: approvedClasses = [], refetch } = useQuery(['approved-classes'], async () => {
        const res = await fetch('http://localhost:5000/approved-classes')
        return res.json();
    })


    const handleAddToCart = instructor => {

        if (user && user.email) {
            fetch(`http://localhost:5000/carts?email=${user.email}`)
                .then(res => res.json())
                .then(data => {
                    const selectedClassIds = data.map(item => item.classItemId);
                    if (selectedClassIds.includes(instructor._id)) {
                        Swal.fire({
                            position: "center",
                            icon: "warning",
                            title: "Item Already Selected",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    } else {
                        const { _id, className, classPhotoURL, price, availableSeats, instructorName } = instructor;
                        const cartItem = {
                            classItemId: _id,
                            className,
                            image: classPhotoURL,
                            price,
                            email: user.email,
                            seats: availableSeats,
                            instructorName: instructorName
                        };
                        fetch("http://localhost:5000/carts", {
                            method: "POST",
                            headers: {
                                "content-type": "application/json"
                            },
                            body: JSON.stringify(cartItem)
                        })
                            .then(res => res.json())
                            .then(data => {
                                if (data.insertedId) {
                                    setSelectedItems(prevSelectedItems => [
                                        ...prevSelectedItems,
                                        instructor._id
                                    ]);
                                    refetch();
                                    Swal.fire({
                                        position: "center",
                                        icon: "success",
                                        title: "Class Selected!",
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                }
                            });
                    }
                });
        } else {
            Swal.fire({
                title: "Please login to select the class!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Login now!"
            }).then(result => {
                if (result.isConfirmed) {
                    navigate("/login", { state: { from: location } });
                }
            });
        }
    };

    return (
        <div className="container mt-5">
            <Fade cascade>

                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
                    {approvedClasses.map((instructor, index) => (
                        <div className="col mb-4" key={index}>
                            <div className="card">
                                <img src={instructor.classPhotoURL} className="card-img-top img-fluid" alt="" style={{ objectFit: "contain", height: "230px" }} />
                                <div className="card-body">
                                    <h5 className="card-title"><b>Class Name: {instructor.className}</b></h5>
                                    <p className="card-text">Instructor Name: {instructor.instructorName}</p>
                                    <p className="card-text">Available Seats: {instructor.availableSeats}</p>
                                    <p className="card-text"><b>Price: ${instructor.price}</b></p>


                                    <button onClick={() => handleAddToCart(instructor)}
                                        disabled={selectedItems.includes(instructor._id)}
                                        className="btn btn-warning"> {selectedItems.includes(instructor._id)
                                            ? "Selected" : "Select"}</button>


                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Fade>

        </div>
    );
};

export default ClassPage;
