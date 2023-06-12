import { useState, useEffect } from "react";

import { Bounce } from "react-awesome-reveal";
import { GrMail} from "react-icons/gr";
import useTitle from "../hooks/useTitle";

const Instructors = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useTitle('Instructors');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(
          "https://learning-school-server-beige.vercel.app/users"
        );
        const data = await res.json();
        const filteredUsers = data.filter((user) => user.role === "instructor");
        setUsers(filteredUsers);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div className="text-center">
    <div className="spinner-border" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>;
  }

  return (
    <Bounce>
      <div className="container mt-5">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
          {users.map((instructor, index) => (
            <div className="col mb-4" key={index}>
              <div className="card shadow">
                <img
                  src={instructor.photo}
                  className="card-img-top img-fluid"
                  alt=""
                  style={{ objectFit: "contain", height: "230px" }}
                />
                <div className="card-body">
                  <h5 className="card-title"><b>Name: {instructor.name}</b></h5>
                  <p className="card-text"><GrMail></GrMail> {instructor.email}</p>
                 <i> <p>&quot; Live in your dream to be an expert with our qualified instructors  - (Learning School) &quot;</p></i>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Bounce>
  );
};

export default Instructors;
