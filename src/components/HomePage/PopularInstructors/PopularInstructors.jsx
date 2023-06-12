import { useState, useEffect } from "react";
import { Fade } from "react-awesome-reveal";

const PopularInstructors = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(
          "https://learning-school-server-beige.vercel.app/users"
        );
        const data = await res.json();
        const filteredUsers = data.filter((user) => user.role === "instructor");
        setUsers(filteredUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="container">
      <Fade>
        <h1 className="text-center p-5">Popular Instructors</h1>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
          {users.slice(0, 6).map((instructor, index) => (
            <div className="col mb-4" key={index}>
              <div className="card">
                <img
                  src={instructor.photo}
                  className="card-img-top img-fluid"
                  alt=""
                  style={{ objectFit: "contain", height: "230px" }}
                />
                <div className="card-body">
                  <h5 className="card-title">
                    <b>Name: {instructor.name}</b>
                  </h5>
                  <p className="card-text">{instructor.email}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Fade>
    </div>
  );
};

export default PopularInstructors;
