import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import {  useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Providers/AuthProvider";
import { Fade } from "react-awesome-reveal";


const TopClasses = () => {


  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState([]);

  const { data: users = [] } = useQuery(['users'], async () => {
    const res = await fetch('http://localhost:5000/users')
    return res.json();
})


  const isAdminOrInstructor = (email) => {
    const user = users.find((user) => user.email === email);
    return user && (user.role === "admin" || user.role === "instructor");
};
  



  const { data: approvedClasses = [], refetch } = useQuery(['top-classes'], async () => {
    const res = await fetch('http://localhost:5000/top-classes')
    return res.json();
  })


  const handleAddToCart = instructor => {
    console.log(instructor);
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
            const { _id, className, classPhotoURL, price, availableSeats, instructorName, enrolledStudents } = instructor;
            const cartItem = {
              classItemId: _id,
              className,
              image: classPhotoURL,
              price,
              email: user.email,
              availableSeats: availableSeats,
              instructorName: instructorName,
              enrolledStudents: enrolledStudents
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
      <div className="container">
      <Fade cascade>
        <h1 className="text-center p-5">Top Classes</h1>  
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
        {approvedClasses.slice(0, 6).map((instructor, index) => (
          <div className="col mb-4" key={index}>
           <div
                                className={`card ${parseInt(instructor.availableSeats) === 0 ? "bg-danger" : ""
                                    }`}
                            >
              <img src={instructor.classPhotoURL} className="card-img-top img-fluid" alt="" style={{ objectFit: "contain", height: "230px" }} />
              <div className="card-body">
              <h5 className="card-title"><b>Class Name: {instructor.className}</b></h5>
                                    <p className="card-text">Instructor Name: {instructor.instructorName}</p>
                                    <p className="card-text">Available Seats: {instructor.availableSeats}</p>
                                    <p className="card-text">Enrolled Students: {instructor.enrolledStudents}</p>
                                    <p className="card-text"><b>Price: ${instructor.price}</b></p>
               
                
                                    <button
                                        onClick={() => handleAddToCart(instructor)}
                                        disabled={
                                            parseInt(instructor.availableSeats) === 0 ||
                                            (user && isAdminOrInstructor(user.email))
                                        }
                                        className="btn primaryBtn"
                                    >
                                        {selectedItems.includes(instructor._id)
                                            ? "Selected"
                                            : "Select"}
                                    </button>
                        
                       
              </div>
            </div>
          </div>
        ))}
      </div>  
          </Fade>
      
    </div>
  );
};

export default TopClasses;
