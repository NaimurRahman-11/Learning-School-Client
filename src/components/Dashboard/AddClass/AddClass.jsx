import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";



const AddClass = () => {


    const { user } = useContext(AuthContext);
    const [axiosSecure] = useAxiosSecure(); // Get the axios instance from the useAxiosSecure hook




    const handleAddClass = event => {
        event.preventDefault();

        const form = event.target;
        const className = form.className.value;
        const instructorName = user.displayName;
        const classPhotoURL = form.classPhotoURL.value;
        const instructorEmail = user.email;
        const availableSeats = form.availableSeats.value;
        const price = form.price.value;
        

        const newClass = {className, instructorName, classPhotoURL, instructorEmail, availableSeats, price}
        console.log(newClass);

        axiosSecure
            .post("/classes", newClass)
        .then((response) => {
            console.log(response.data);
            form.reset();
          if (response.data.insertedId) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Class Added Successfully!",
              showConfirmButton: false,
              timer: 1500,
            });
            
            
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }

    return (
        <div className="container mb-5 rounded">
            <div className="row justify-content-center">

                <div className="col-md-6 col-sm-8">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title text-center"> Add Your Class! </h3>
                            
                            <form onSubmit={handleAddClass}>
                                <div className="mb-3">
                                    <label htmlFor="className" className="form-label">
                                        Class Name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="className"
                                        placeholder=""



                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="classPhotoURL" className="form-label">
                                        Class Photo URL
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="classPhotoURL"
                                        placeholder=""



                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="instructorName" className="form-label">
                                        Instructor Name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="instructorName"
                                        placeholder=""
                                        defaultValue={user.displayName}



                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="instructorEmail" className="form-label">
                                        Instructor Email
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="instructorEmail"
                                        placeholder=""
                                        defaultValue={user.email}
                                        required



                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="availableSeats" className="form-label">
                                        Available Seats
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="availableSeats"
                                        placeholder=""



                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="price" className="form-label">
                                        Price
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="price"
                                        placeholder="In Dollar $"



                                    />
                                </div>

                               

                                <button type="submit" className="btn btn-warning w-100">
                                    Add
                                </button>
                            </form>



                        </div>

                    </div>
                </div>

                

            </div>

        </div>
    );
};

export default AddClass;