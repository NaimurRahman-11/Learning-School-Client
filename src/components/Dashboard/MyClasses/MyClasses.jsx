import { useContext} from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";


const MyClasses = () => {

    const { user } = useContext(AuthContext);

    const { data: classes = [], refetch } = useQuery(['classes', { email: user.email }], async () => {
        const res = await fetch(`http://localhost:5000/classes?email=${user.email}`);
        return res.json();
      });





    const handleUpdateClass = async (classId) => {
        try {
            const response = await fetch(
                `http://localhost:5000/classes/${classId}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        status: "pending", // Update the status as desired
                    }),
                }
            );

            if (response.ok) {
                // Class updated successfully, refetch the data
                refetch();
            } else {
                console.error("Failed to update class");
            }
        } catch (error) {
            console.error("Error updating class:", error);
        }
    };




    return (
        <div>
            <h1>Total Classes: {classes.length}</h1>

            <div className="container">
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Image</th>
                                <th scope="col">Class Name</th>
                                <th scope="col">Instructor Name</th>
                                <th scope="col">Status</th>
                                <th scope="col">Total Enrolled Students</th>
                                <th scope="col">Feedback</th>
                                <th scope="col">Update</th>
                            </tr>
                        </thead>
                        <tbody>
                            {classes.map((classItem, index) => (
                                <tr key={classItem._id}>
                                    <td>{index + 1}</td>
                                    <td><img src={ classItem.classPhotoURL} alt="" className="img-fluid" style={{ objectFit: "contain", height: "130px" }}/></td>
                                    <td>{classItem.className}</td>
                                    <td>{classItem.instructorName}</td>
                                    <td>{classItem.status}</td>
                                    <td>{classItem.totalEnrolledStudents || 0}</td>
                                    <td>
                                        {classItem.status === "denied" ? (
                                            classItem.feedback
                                        ) : (
                                            "-"
                                        )}
                                    </td>
                                    <td>
                                        {classItem.status === "denied" && (
                                            <button
                                                onClick={() => handleUpdateClass(classItem._id)}
                                                className="btn btn-primary"
                                            >
                                                Update
                                            </button>
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

export default MyClasses;