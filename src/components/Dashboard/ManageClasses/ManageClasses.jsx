import { useQuery } from "@tanstack/react-query";


const ManageClasses = () => {

    const { data: classes = [], refetch } = useQuery(['allclasses'], async () => {
        const res = await fetch('http://localhost:5000/allclasses')
        return res.json();
    })
    


    const handleApproveClass = async (classId) => {
        try {
            const response = await fetch(
                `http://localhost:5000/allclasses/${classId}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        status: "approved",
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



    const handleDenyClass = async (classId) => {
        try {
          const response = await fetch(
            `http://localhost:5000/allclasses/${classId}`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                status: "denied",
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
        <div className="container mt-5">
            

            <div className="container">
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Image</th>
                                <th scope="col">Class Name</th>
                                <th scope="col">Instructor Name</th>
                                <th scope="col">Instructor Email</th>
                                <th scope="col">Available Seats</th>
                                <th scope="col">Price</th>
                                <th scope="col">Status</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {classes.map((classItem, index) => (
                                <tr key={classItem._id}>
                                    <td>{index + 1}</td>
                                    <td><img src={classItem.classPhotoURL} alt="" className="img-fluid" style={{ objectFit: "contain", height: "130px" }} /></td>
                                    <td>{classItem.className}</td>
                                    <td>{classItem.instructorName}</td>
                                    <td>{classItem.instructorEmail}</td>
                                    <td>{classItem.availableSeats}</td>
                                    <td>{classItem.price}</td>
                                    <td>{classItem.status}</td>
                                    <td>
                                        {classItem.status === "pending" && (
                                            <div>
                                                <button
                                                    onClick={() => handleApproveClass(classItem._id)}
                                                    className="btn btn-success"
                                                    disabled={classItem.status !== "pending"}
                                                >
                                                    Approve
                                                </button>
                                                <button
                                                    onClick={() => handleDenyClass(classItem._id)}
                                                    className="btn btn-danger ml-2"
                                                    disabled={classItem.status !== "pending"}>Deny </button>
                                            </div>)}




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

export default ManageClasses;