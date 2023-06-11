import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";


const AllUsers = () => {

    const { data: users = [], refetch } = useQuery(['users'], async () => {
        const res = await fetch('http://localhost:5000/users')
        return res.json();
    })


    const [disabledUsers, setDisabledUsers] = useState([]);
    const [axiosSecure] = useAxiosSecure(); // Get the axios instance from the useAxiosSecure hook


    const handleMakeAdmin = user => {
        fetch(`http://localhost:5000/users/admin/${user._id}`, {
            method: 'PATCH'
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: `${user.name} is an Admin now!`,
                        showConfirmButton: false,
                        timer: 1500
                    });

                    setDisabledUsers((prevDisabledUsers) => [
                        ...prevDisabledUsers,
                        user._id,
                    ]);

                }
            })
    }



    const handleMakeInstructor = user => {
        fetch(`http://localhost:5000/users/instructor/${user._id}`, {
            method: 'PATCH'
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: `${user.name} is an Instructor now!`,
                        showConfirmButton: false,
                        timer: 1500
                    });

                    setDisabledUsers((prevDisabledUsers) => [
                        ...prevDisabledUsers,
                        user._id,
                    ]);
                }
            })
    }


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
                    .delete(`/users/${userId}`)
                    .then((response) => {
                        if (response.data.deletedCount) {
                            refetch();
                            Swal.fire({
                                position: "center",
                                icon: "success",
                                title: "User deleted successfully!",
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
                            title: "An error occurred while deleting the user.",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                    });
            }
        });
    };


    const isDisabled = (userId) => {
        return disabledUsers.includes(userId);
    };


    return (
        <div>
            <h1>Total Users: {users.length}</h1>

            <div className="container">
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">User Name</th>
                                <th scope="col">User Email</th>
                                <th scope="col">Role</th>

                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={user._id}>
                                    <td>
                                        {index + 1}
                                    </td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td className="">{user.role === 'admin' ? 'admin' :
                                        <button onClick={() => handleMakeAdmin(user)} className="p-2 me-2 btn primaryBtn" disabled={isDisabled(user._id)}>make admin</button>}
                                        {user.role === 'instructor' ? 'instructor' :
                                            <button onClick={() => handleMakeInstructor(user)} className="p-2 me-2 btn primaryBtn" disabled={isDisabled(user._id)}>make instructor</button>}
                                    </td>





                                    <td>
                                        <Link to=''>
                                            <button className="btn btn-danger" onClick={() => handleDeleteUser(user._id)}
                                            >delete</button>
                                        </Link>
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

export default AllUsers;