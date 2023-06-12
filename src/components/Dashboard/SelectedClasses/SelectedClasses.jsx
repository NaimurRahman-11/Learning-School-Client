import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";


const SelectedClasses = () => {

    const { user } = useContext(AuthContext);
    const [axiosSecure] = useAxiosSecure();



    const { data: classes = [], refetch } = useQuery(['classes', { email: user.email }], async () => {
        const res = await fetch(`http://localhost:5000/carts?email=${user.email}`);
        return res.json();
    });

    const total = classes.reduce(
        (sum, item) => parseFloat(item.price) + sum,
        0
    );


    const handleDeleteUser = (userId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure
                    .delete(`/carts/${userId}`)
                    .then((response) => {
                        if (response.data.deletedCount) {
                            refetch();
                            Swal.fire({
                                position: "center",
                                icon: "success",
                                title: "Class deleted successfully!",
                                showConfirmButton: false,
                                timer: 1500,
                            });
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                        Swal.fire({
                            position: "center",
                            icon: "error",
                            title: "An error occurred while deleting the class.",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                    });
            }
        });
    };






    return (
        <div>
            <h1>My Selected Classes: {classes.length}</h1>
            <h3 className="">Total Price: ${total}</h3>

            <div className="container">
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Image</th>
                                <th scope="col">Class Name</th>
                                <th scope="col">Instructor Name</th>
                               
                                <th scope="col">Price</th>
                                <th scope="col">Action</th>


                            </tr>
                        </thead>
                        <tbody>
                            {classes.map((classItem, index) => (
                                <tr key={classItem._id}>
                                    <td>{index + 1}</td>
                                    <td><img src={classItem.image} alt="" className="img-fluid" style={{ objectFit: "contain", height: "130px" }} /></td>
                                    <td>{classItem.className}</td>
                                    <td>{classItem.instructorName}</td>
                                    <td>{classItem.classItemId}</td>

                                   
                                    <td>${classItem.price}</td>
                                    <td><button onClick={() => handleDeleteUser(classItem._id)} className="btn btn-danger">Delete</button></td>



                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="text-center mt-5"> <Link to='/dashboard/payment' > <button className="btn primaryBtn">Ready to Pay?</button> </Link></div>

                </div>
            </div>
        </div>
    );
};

export default SelectedClasses;